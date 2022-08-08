module.exports = (sequelize, DataTypes) => {
  const salesProducts = sequelize.define('salesProducts', {
    salesId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    productsId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    quantity: DataTypes.INTEGER,
  }, 
  {
    timestamps: false,
    underscored: true,
  });

  salesProducts.associate = (models) => {
    models.sales.belongsToMany(models.products, {
      through: salesProducts,
      foreignKey: 'salesId',
      otherKey: 'productsId',
      as: 'sales',
      onDelete: 'CASCADE',
    });

    models.products.belongsToMany(models.sales, {
      through: salesProducts,
      foreignKey: 'productsId',
      otherKey: 'salesId',
      as: 'products',
      onDelete: 'CASCADE',
    });
  }
  return salesProducts;
} 