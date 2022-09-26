// const { Model } = require("sequelize");
// module.exports =

"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class FragileProducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    //    define association here
    }
  }
  FragileProducts.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        autoIncrement: false,
      },
      fragileProducts: {
        type: DataTypes.TEXT,
        get: function () {
          return JSON.parse(this.getDataValue("fragileProducts"));
        },
        set: function (val) {
          return this.setDataValue("fragileProducts", JSON.stringify(val));
        },
      },
      shopifyProduct: {
        type: DataTypes.TEXT,
        get: function () {
          return JSON.parse(this.getDataValue("shopifyProduct"));
        },
        set: function (val) {
          return this.setDataValue("shopifyProduct", JSON.stringify(val));
        },
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
      modelName: "FragileProducts",
      tableName: "FragileProducts",
    }
  );
  return FragileProducts;
};
