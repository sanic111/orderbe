import Showroom from "../../models/Showroom.js";

export const queryShowroom = async (req, res) => {
  const showroom = await Showroom.findAll({});
  res.json({
    data: showroom,
  });
};
