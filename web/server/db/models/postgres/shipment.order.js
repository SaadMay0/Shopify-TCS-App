"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class ShipmentOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       // define association here
    //   Store.belongsTo(models.Preferences, {
    //     foreignKey: { name: "storeId", allowNull: true },
    //     onDelete: "CASCADE",
    }
  }
  ShipmentOrder.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        autoIncrement: false,
      },
      shopifyOrderNbr: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shopifyOrderId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      costCenterCode: {
        type: DataTypes.STRING,
      },
      consigneeName: {
        type: DataTypes.STRING,
      },
      consigneeAddress: {
        type: DataTypes.STRING,
      },
      consigneeMobNo: {
        type: DataTypes.STRING,
      },
      consigneeEmail: {
        type: DataTypes.STRING,
      },
      originCityName: {
        type: DataTypes.STRING,
      },
      destinationCityName: {
        type: DataTypes.STRING,
      },
      weight: {
        type: DataTypes.INTEGER,
      },
      pieces: {
        type: DataTypes.INTEGER,
      },
      codAmount: {
        type: DataTypes.STRING,
      },
      customerReferenceNo: {
        type: DataTypes.STRING,
      },
      services: {
        type: DataTypes.STRING,
      },
      productDetails: {
        type: DataTypes.STRING,
      },
      fragile: {
        type: DataTypes.STRING,
      },

      remarks: {
        type: DataTypes.STRING,
      },
      insuranceValue: {
        type: DataTypes.INTEGER,
      },

      isShipingByCN: {
        type: DataTypes.BOOLEAN,
      },
      shipingByCNFields: {
        type: DataTypes.STRING,
        get: function () {
          return JSON.parse(this.getDataValue("shipingByCNFields"));
        },
        set: function (val) {
          return this.setDataValue("shipingByCNFields", JSON.stringify(val));
        },
      },
      isOrderReverse: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isOrderCancel: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isOrderPlaced: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      generatedCN: {
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
      modelName: "ShipmentOrder",
      tableName: "ShipmentOrder",
    }
  );
  return ShipmentOrder;
};
