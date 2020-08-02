const express = require('express')
const app = express();
const cors = require('cors')
const pool = require('./db')
//middleware
app.use(cors())
app.use(express.json())

//Routes

//create a todo
app.post('/todos',async(req,res)=>{
    try{
        const {description} = req.body;
        const newtodo = await pool.query('INSERT INTO todo (description) values ($1) RETURNING *',[description]);
        res.json(newtodo.rows[0]);
    }
    catch(err)
    {
        console.log(err);
    }
})
//get all todos
app.get('/todos',async(req,res)=>{
    const alltodos = await pool.query('select * from todo');
    res.json(alltodos.rows);
})
//get a todo
app.get('/todos/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        console.log(id);
        const todo = await pool.query('select * from todo where todo_id = $1',[id]);
        res.json(todo.rows[0]);
    }
    catch(err)
    {
        console.log(err);
    }
})
//update a todo
app.put('/todos/:id',async(req,res)=>{
    try{
        const {id} = req.params; 
        const {description} = req.body;
        const updatetodo = await pool.query('update todo set description = $1 where todo_id =$2',[description,id]);
        res.json('todo updated successfully');
    }
    catch(err)
    {
        console.log(err);
    }
})

//delete a todo
app.delete('/todos/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const deletetodo = await pool.query('delete from todo where todo_id = $1',[id]);
        res.json('deleted todo successfully'); 
    } 
    catch(err)
    {
        console.log(err);
    }
})


app.listen(5000,()=>{
    console.log('app got started');
})