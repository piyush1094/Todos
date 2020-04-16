//Required Packages
const express = require('express')
const path = require('path')    
const { Op } = require('sequelize')



//Require Models and its related functions
const { Todos, Notes } = require('../models/todos')

//Require Middleware
const router = express.Router()

    //All API's
    router.get('/', async(req,res)=>{
     let todos;
 
    // filter by date in ascending
    if(req.body.filters=="dateAsc"){
    todos = await Todos.findAll({  
     order: [
               ['due','ASC'],
        ]
    })
     return res.render('index',{todos:todos});
        }
 
     // filter by date in descending
     if(req.body.filters=="dateDesc"){
     todos = await Todos.findAll({
     order: [
                   ['due','DESC'],
               ]
           })
      return res.render('index',{todos:todos});
        }
 
      // filter by priority high to low
      if(req.body.filters=="priority"){
      todos = await Todos.findAll({
      order: [
                    ['priority','ASC'],
                ]
            })
      return res.render('index',{todos:todos});
        }
 
     // filter status wise 
      if(req.body.filters=="status"){
      todos = await Todos.findAll({
      order: [
                   ['status','ASC'],
               ]
           })
     return res.render('index',{todos:todos});
        }
 
     todos=await Todos.findAll();
     res.render('index',{todos:todos});
    });

router.route('/form')
    .get((req,res)=>{
       res.render('todosRegister')
    })
    .post(async(req,res)=>{
        let todo= new Todos({
            title: req.body.title,
            description: req.body.description,
            due : req.body.due,
            priority : req.body.priority,
            status: req.body.status
        });
       
        await todo.save();
        res.redirect('/todos')
    });

    router.get('/:id', async (req, res) => {
         const todo = await Todos.findByPk(req.params.id)
         if (isNaN(parseInt(req.params.id))) {
            return res.status(400).send({error: 'todo id must be an integer'});
        }
     
        if (!todo) {
            return res.status(404).send({error:'No todo found with id = ' + req.params.id})
        }
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
         res.redirect('/todos')
    })

    router.route('/:id/notes')
    .get(async (req, res) => {
        const todo = await Todos.findByPk(req.params.id);
        if (isNaN(parseInt(req.params.id))) {
            return res.status(400).send({error: 'todo id must be an integer'});
        }
 
        if (!todo) {
            return res.status(404).send({error:'No todo found with id = ' + req.params.id});
        }
        
        // Get All notes related to this todo
        const notes = await Notes.findAll({
            attributes : ['description'],
            where : {taskId : { [Op.eq] : req.params.id}}
        });


 
        res.render('notes',{todo:todo, notes:notes});
    })
    .post(async (req, res) => {
        let todo = await Todos.findByPk(req.params.id);
        if (!todo) {
            return res.status(404).send({error:'No todo found'});
        }
        let note=new Notes({
            description:req.body.description,
            taskId:req.params.id
        })
 
        await note.save();
        res.redirect('/todos');
    });

    module.exports = router