'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Barang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Barang.belongsTo(models.Kategori, {
        foreignKey: 'id_kategori',
        onDelete: 'CASCADE'
      });
      Barang.hasMany(models.DetailLaporanBarang, {
        foreignKey: 'id_barang',
        onDelete: 'CASCADE'
      });
    }
  }
  Barang.init({
    nama: DataTypes.STRING,
    id_kategori: DataTypes.STRING,
    jumlah: DataTypes.INTEGER,
    harga: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Barang',
  });
  return Barang;
};