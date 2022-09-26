"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Preferences extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Preferences.init(
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
      accountNo: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      apiKey: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      insurance: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      service: {
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
      fragile: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      locationId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      originCity: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      consigneeName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      consigneeAddress: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      consigneeMobNo: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      consigneeEmail: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      consigneeLandLine: {
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
      modelName: "Preferences",
      tableName: "Preferences",
    }
  );
  return Preferences;
};
