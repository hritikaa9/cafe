const { query } = require('express');
const {client} = require('../config/db.js');
require('dotenv').config();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');



const addCategory = async(req, res) =>{
    try{
        const {name} = req.body;
        const query = "insert into category (name) values ($1)";
        const value = [name];
        await client.query(query, value, (err,results)=>{
            if(!err){
                return res.status(200).json({message:"Category added successfully"});
            }
            else{
                console.log("errr: ",err);
                return res.status(500).json(err);
            }
        })

    }
    catch(error){
        console.log(error);
        res.status(500).json({ error: 'error'});

    }
}

const getCategory = async(req, res) =>{
    try{
        const query = "select id, name from category order by name";
        await client.query(query, (err,results)=>{
            if(!err){
                return res.status(200).json(results.rows);
            
            }
            else{
                return res.status(500).json(err);
            }
        })

    }
    catch{
        res.status(500).json({ error: 'error'});

    }
}

const updateCategory = async(req, res) =>{
    try{
        const {name, id} = req.body;
        const query = "update category set name = $1 where id = $2";
        const value = [name, id];
        await client.query(query, value, (err,results)=>{
            if(!err){
                if(resultss.affectedRows ==0){
                    return res.status(404).json({message: "Category id does not found"});
                }

                return res.status(200).json({message:"Category updated successfully"});
            }
            else{
                return res.status(500).json(err);
            }
        })

    }
    catch{
        res.status(500).json({ error: 'error'});

    }
}

const deleteCategory = async(req, res) =>{
    try{
        const id = req.params.id;
        const query = "delete from category where id = $1";
        await client.query(query, [id], (err, results)=>{
            if(!err){
            
                console.log(results.rowCount)
                if (results.rowCount ==0){
                    return res.status(404).json({message: "Category does not found"});
                }
                return res.status(200).json({message:"Category deleted Successfully"});
            }
            else{
             
                return res.status(500).json(err);
            }
        })

    }
    catch{
        console.log('ppp')
        res.status(500).json({ error: 'error'});
    }
    
}


module.exports = {addCategory, getCategory, updateCategory, deleteCategory} 