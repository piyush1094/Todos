//Required Packages
const express = require('express')
const path = require('path')

//Require Models and its related functions
const { Todos } = require('../models/todos')

//Require Middleware
const router = express.Router()

//All API's
router.get('/', async(req,res)=>{
    const todos=await Todos.findAll();
    res.render('index',{todos:todos})
});

router.route('/todos')
    .get((req,res)=>{
       res.render('todosRegister')
    })
    .post(async(req,res)=>{
        console.log("before error")
        console.log("äfter error")
        let todo= new Todos({
            title: req.body.title,
            description: req.body.description,
            due : req.body.due,
            priority : req.body.priority,
            status: req.body.status
        });
       
        await todo.save();
        res.redirect('/')
    });

    router.get('/:id', async (req, res) => {
         const todo = await Todos.findByPk(req.params.id)
         res.render('todo', { todo })
    })
    router.patch('/:id', async (req, res) => {
        let todo = await Todos.findByPk(req.params.id)
            todo.title = req.body.title
            todo.description= req.body.description
            todo.due = req.body.due
            todo.priority = req.body.priority
            todo.status = req.body.status
         await todo.save()
         res.redirect('/')
    })

    module.exports = router