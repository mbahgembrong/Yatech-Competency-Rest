'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetailLaporanBarang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    static associate(models) {
      // define association here
      DetailLaporanBarang.belongsTo(models.Barang, {
        foreignKey: 'id_barang',
        onDelete: 'CASCADE'
      });
    }
  }
  DetailLaporanBarang.init({
    id_barang: DataTypes.INTEGER,
    status: DataTypes.ENUM('add', 'sub'),
    jumlah: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DetailLaporanBarang',
  });
  return DetailLaporanBarang;
};