const {DataTypes} = require('sequelize')
const sequelize = require('../config/database')

const Milkshake = sequelize.define('milkshake', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement : true,
        allowNull : false
    },

    sabor:{
        type: DataTypes.STRING,
        allowNull : false
    },

    tamanho:{
        type: DataTypes.STRING,
        allowNull : false
    },

    valor:{
        type : DataTypes.FLOAT,
        allowNull : false 
    }
})

module.exports = Milkshake