// const { Model } = require("sequelize");
// module.exports =

"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class CostCenter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    // define association here
    }
  }
  CostCenter.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        autoIncrement: false,
      },
      userName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      costCenterCityName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      costCenterCode: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      costCenterName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      pickupAddress: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      returnAddress: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      isLabelPrint: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      accountNo: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      storeId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "store",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "CostCenter",
      tableName: "CostCenter",
    }
  );
  return CostCenter;
};
