"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable("Preferences", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        autoIncrement: false,
        defaultValue: Sequelize.UUIDV4,
      },
      userName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      accountNo: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      apiKey: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      insurance: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      service: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      costCenterCityName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      costCenterCode: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      costCenterName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      fragile: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      locationId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      originCity: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      consigneeName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      consigneeAddress: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      consigneeMobNo: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      consigneeEmail: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      consigneeLandLine: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      storeId: {
        type: Sequelize.STRING,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "store",
          key: "id",
          as: "storeId",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable("ShipmentOrder", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        autoIncrement: false,
        defaultValue: Sequelize.UUIDV4,
      },
      shopifyOrderNbr: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      shopifyOrderId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userName: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      costCenterCode: {
        type: Sequelize.STRING,
      },
      consigneeName: {
        type: Sequelize.STRING,
      },
      consigneeAddress: {
        type: Sequelize.STRING,
      },
      consigneeMobNo: {
        type: Sequelize.STRING,
      },
      consigneeEmail: {
        type: Sequelize.STRING,
      },
      originCityName: {
        type: Sequelize.STRING,
      },
      destinationCityName: {
        type: Sequelize.STRING,
      },
      weight: {
        type: Sequelize.INTEGER,
      },
      pieces: {
        type: Sequelize.INTEGER,
      },
      codAmount: {
        type: Sequelize.STRING,
      },
      customerReferenceNo: {
        type: Sequelize.STRING,
      },
      services: {
        type: Sequelize.STRING,
      },
      productDetails: {
        type: Sequelize.STRING,
      },
      fragile: {
        type: Sequelize.STRING,
      },
      remarks: {
        type: Sequelize.STRING,
      },
      insuranceValue: {
        type: Sequelize.INTEGER,
      },

      isShipingByCN: {
        type: Sequelize.BOOLEAN,
      },
      shipingByCNFields: {
        type: Sequelize.STRING,
      },
      isOrderReverse: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isOrderCancel: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isOrderPlaced: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      generatedCN: {
        type: Sequelize.STRING,
      },
      storeId: {
        type: Sequelize.STRING,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "store",
          key: "id",
          as: "storeId",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable("CostCenter", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        autoIncrement: false,
        defaultValue: Sequelize.UUIDV4,
      },

      userName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      costCenterCityName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      costCenterCode: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      costCenterName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      pickupAddress: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      returnAddress: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      isLabelPrint: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      accountNo: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      storeId: {
        type: Sequelize.STRING,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "store",
          key: "id",
          as: "storeId",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable("FragileProducts", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        autoIncrement: false,
        defaultValue: Sequelize.UUIDV4,
      },
      storeId: {
        type: Sequelize.STRING,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "store",
          key: "id",
          as: "storeId",
        },
      },
      fragileProducts: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      shopifyProduct: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable("Cities", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        autoIncrement: false,
        defaultValue: Sequelize.UUIDV4,
      },
      storeId: {
        type: Sequelize.STRING,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "store",
          key: "id",
          as: "storeId",
        },
      },
      cityName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cityCode: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      area: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('Preferences');
     * await queryInterface.dropTable('ShipmentOrder');
     * await queryInterface.dropTable('CostCenter');
     */


    // await queryInterface.dropAllTables();
    // await queryInterface.dropTable("Preferences");
     await queryInterface.dropTable('ShipmentOrder');
    await queryInterface.dropTable("CostCenter");
    // await queryInterface.dropTable("FragileProducts");
    await queryInterface.dropTable("Cities");
  },
};
