const {DataTypes} = require('sequelize')
const sequelize = require('../config/database')

const Sorvete = sequelize.define('sorvete', {
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

    valor:{
        type : DataTypes.FLOAT,
        allowNull : false 
    }

})

module.exports = Sorvete