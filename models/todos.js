const sequelize = require('sequelize');
// const Joi = require('Joi');
 

const db = new sequelize({
    dialect: 'sqlite',
    storage: __dirname+'/todos.db'
})

const Todos = db.define('todo',{
    id: {
        type : sequelize.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    title : {
        type: sequelize.STRING(100),
        allowNull : false
    },
    description : {
        type : sequelize.STRING(200),
    },
    due : {
        type : sequelize.DATE,
        allowNull : false,
    },
    status: {
        type: sequelize.STRING(100)
    },
    priority: {
        type : sequelize.STRING(100),
        defaultValue : 'Medium',
        allowNull : false
    }
})

// function validation(user){
//     const schema={
//         title: Joi.string().max(100).required(),
//         description: Joi.string().max(200),
//         due : Joi.date().required()
//     }
 
//     return Joi.validate(user,schema);
// }
    
exports.db=db;
// exports.todoValidation=validation;
exports.Todos=Todos;

