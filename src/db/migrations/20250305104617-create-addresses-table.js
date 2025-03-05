'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("addresses", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      recipientName: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING(30),
        allowNull: false,
        defaultValue: "Iran",
      },
      province: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      postalAddress: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      postalCode: {
        type: Sequelize.STRING(10),
      },
      phoneNumber: {
        type: Sequelize.STRING(11),
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.addIndex("addresses", ["userId"], {
      name: "userId_index",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("addresses");
  },
};
