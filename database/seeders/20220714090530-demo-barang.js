'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const barangs = [];
    for (let i = 0; i < 100; i++) {
      barangs.push({
        nama: `barang${i}`,
        id_kategori: (i+1),
        jumlah:5*(i+1),
        harga: 1000*(i+1),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    return queryInterface.bulkInsert('Barangs', barangs, {});
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Barangs', null, {
      truncate: true
    });
  }
};
