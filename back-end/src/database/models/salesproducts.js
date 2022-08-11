module.exports = (sequelize, DataTypes) => {
  const salesProducts = sequelize.define('salesProducts', {
    saleId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    productId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    quantity: DataTypes.INTEGER,
  }, 
  {
    timestamps: false,
    tableName: 'salesProducts',
    underscored: true,
  });

  salesProducts.associate = (models) => {
    models.sales.belongsToMany(models.products, {
      through: salesProducts,
      foreignKey: 'saleId',
      otherKey: 'productId',
      as: 'sales',
      onDelete: 'CASCADE',
    });

    models.products.belongsToMany(models.sales, {
      through: salesProducts,
      foreignKey: 'productId',
      otherKey: 'saleId',
      as: 'products',
      onDelete: 'CASCADE',
    });
  }
  return salesProducts;
} 