const {DataTypes} = require('sequelize')
const sequelize = require('../config/database')

const Doce = sequelize.define('doce', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement : true,
        allowNull : false
    },

    nome:{
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

module.exports = Doce