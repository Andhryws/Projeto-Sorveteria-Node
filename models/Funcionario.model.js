const {DataTypes} = require('sequelize')
const sequelize = require('../config/database')

const Funcionario = sequelize.define('funcionario', {
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

    cpf:{
        type: DataTypes.STRING,
        unique: true,
        allowNull : false
    },

    cargo:{
        type: DataTypes.STRING,
        allowNull : false
    },

    salario:{
        type : DataTypes.FLOAT,
        allowNull : false 
    }
})

module.exports = Funcionario