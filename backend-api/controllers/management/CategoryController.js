import Category from "../../models/Category.js";
import { generatePaginationLinks } from "../../helper/PagingHelper.js";
import { Op } from "sequelize";
export const createCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    const existingCategory = await Category.findOne({ where: { name } });
    if (existingCategory) {
      return res.status(400).json({ error: "Danh mục đã tồn tại" });
    }

    const newCategory = await Category.create({
      name,
      description,
    });

    return res.status(201).json({ data: newCategory });
  } catch (error) {
    return res.status(500).json({ error: "Lỗi máy chủ" });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const category = await Category.findOne({ where: { id } });

    if (!category) {
      return res.status(404).json({ error: "Danh mục không tồn tại" });
    }

    category.name = name || category.name;
    category.description = description || category.description;

    await category.save();

    return res.status(200).json({ data: category });
  } catch (error) {
    return res.status(500).json({ error: "Lỗi máy chủ" });
  }
};

export const getCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findOne({
      where: { id },
    });

    if (!category) {
      return res.status(404).json({ error: "Danh mục không tồn tại" });
    }
    const data = category.toJSON();
    return res.status(200).json({ data: data });
  } catch (error) {
    return res.status(500).json({ error: "Lỗi máy chủ" });
  }
};
export const deleteCategories = async (req, res) => {
  let categoryIds = req.body.ids;
  if (!categoryIds || categoryIds.length === 0) {
    res.status(500).json({ error: "Danh sách ID không hợp lệ" });
  }
  try {
    const deletedCount = await Category.destroy({
      where: {
        id: categoryIds,
      },
    });

    if (deletedCount === 0) {
      return res.status(404).json({ error: "Không tìm thấy danh mục để xóa" });
    }

    res.status(200).json({ error: "Xóa thành công", deletedCount });
  } catch (error) {
    res.status(500).json({ error: "Lỗi máy chủ khi xóa nhân viên" });
  }
};

export const queryCategories = async (req, res) => {
  const perPage = parseInt(req.query.items_per_page) || 20;
  const currentPage = parseInt(req.query.page) || 1;
  const sortColumn = req.query.sort || "id";
  const sortOrder = req.query.orders || "desc";
  const searchQuery = req.query.search || "";

  try {
    const searchConditions = {};
    if (searchQuery) {
      searchQuery.split("|").forEach((condition) => {
        const [key, value] = condition.split("=");
        if (key && value) {
          searchConditions[key] = {
            [Op.like]: `%${value}%`,
          };
        }
      });
    }

    const totalCategory = await Category.count({
      where: searchConditions,
    });

    const categoriesList = await Category.findAll({
      where: searchConditions,
      offset: (currentPage - 1) * perPage,
      limit: perPage,
      orders: [[sortColumn, sortOrder.toUpperCase()]],
    });

    const pagination = {
      current_page: currentPage,
      first_page_url: `${req.protocol}://${req.get("host")}${req.path}?page=1`,
      from: (currentPage - 1) * perPage + 1,
      last_page: Math.ceil(totalCategory / perPage),
      last_page_url: `${req.protocol}://${req.get("host")}${req.path
        }?page=${Math.ceil(totalCategory / perPage)}`,
      links: generatePaginationLinks(
        req,
        currentPage,
        Math.ceil(totalCategory / perPage)
      ),
      next_page_url:
        currentPage < Math.ceil(totalCategory / perPage)
          ? `${req.protocol}://${req.get("host")}${req.path}?page=${currentPage + 1
          }`
          : null,
      path: `${req.protocol}://${req.get("host")}${req.path}`,
      per_page: perPage.toString(),
      prev_page_url:
        currentPage > 1
          ? `${req.protocol}://${req.get("host")}${req.path}?page=${currentPage - 1
          }`
          : null,
      to: currentPage * perPage,
      total: totalCategory,
    };

    res.json({
      payload: {
        pagination: pagination,
      },
      data: categoriesList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error || "Something went wrong" });
  }
};
