module.exports = (sequelize, DataTypes) => {
  const sales = sequelize.define('sales', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL,
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING,
  },
  {
    timestamps: false,
    underscored: true,
  });

  sales.associete = (models) => {
    sales.belongsTo(models.users, 
      { foreignKey: 'userId', as: 'users', onDelete: 'CASCADE' },
      { foreignKey: 'sellerId', as: 'sellers', onDelete: 'CASCADE' })
  }
  return sales;
} 