'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const kategoris = [];
    for (let i = 0; i < 100; i++) {
      kategoris.push({
        nama: `kategori${i}`,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    return queryInterface.bulkInsert('Kategoris', kategoris, {});
  },
  async down(queryInterface, Sequelize) {
      return queryInterface.bulkDelete('Kategoris', null, {
        truncate: true
      });
    }
  };
