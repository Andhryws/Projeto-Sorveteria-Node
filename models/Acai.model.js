const {DataTypes} = require('sequelize')
const sequelize = require('../config/database')

const Acai = sequelize.define('acai', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement : true,
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

module.exports = Acai