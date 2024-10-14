import { DataTypes } from 'sequelize';
import db from '../config/Database.js';
import CarImage from './CarImage.js';
import Brand from './Brand.js';
import CarType from './CarType.js';
import OrderDetails from './OrderDetails.js';
import Orders from './Orders.js';
import TestDriveRequest from './TestDriveRequest.js';


const Car = db.define(
  'car',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    model: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT(1000),
      allowNull: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'cars',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

Car.hasMany(CarImage, {
  foreignKey: 'car_id',
  as: 'images',
});

CarImage.belongsTo(Car, {
  foreignKey: 'car_id',
  as: 'car',
});

Car.hasOne(Brand, {
  foreignKey: 'id',
  sourceKey: 'brand_id',
  as: 'brand',
});

Brand.belongsTo(Car, {
  foreignKey: 'id',
  targetKey: 'brand_id',
  as: 'car',
});

Car.hasOne(CarType, {
  foreignKey: 'id',
  sourceKey: 'type_id',
  as: 'type',
});

CarType.belongsTo(Car, {
  foreignKey: 'id',
  targetKey: 'type_id',
  as: 'car',
});
Car.hasMany(OrderDetails, {
  foreignKey: 'car_id',
  as: 'order_details',
});

OrderDetails.belongsTo(Car, {
  foreignKey: 'car_id',
  as: 'car',
});

Car.hasMany(Orders, {
  foreignKey: 'car_id',
  as: 'orders',
});

Orders.belongsTo(Car, {
  foreignKey: 'car_id',
  as: 'car',
});

Car.hasMany(TestDriveRequest, {
  foreignKey: 'car_id',
  as: 'test_drives_request',
});

TestDriveRequest.belongsTo(Car, {
  foreignKey: 'car_id',
  as: 'car',
});


export default Car;
