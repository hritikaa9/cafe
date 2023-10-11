const { query } = require('express');
const {client} = require('../config/db.js');
require('dotenv').config();
// var auth = require('../services/authentication.js');
// var checkRole = require('../services/checkRole.js');



const addProduct = async(req, res) =>{
    try{
        const {name, category_id, description,price} = req.body;
        console.log(req.body)
        const query = "insert into product (name, category_id, description, price, status)values($1,$2,$3,$4, 'true') returning *";
        const value = [name, category_id, description,price];
        console.log(name, category_id, description, price);
        await client.query(query, value, (err,results)=>{
            if(!err){
                console.log(results)
                console.log('kkk')
                return res.status(200).json({message:"product added successfully"});
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

const getProduct = async(req, res) =>{
    try{
        const query = "SELECT p.id, p.name, p.description, p.price, p.status, c.id as category_id, c.name as categoryName FROM product as p INNER JOIN category as c ON p.category_id = c.id ";
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

const productCount = async(req, res)=>{
    try{
        const query = "Select count(id) from product;"
        await client.query(query, (err, result)=>{
            if(!err){
               console.log(result.rows[0]["count"])
                return res.status(200).json(Number(result.rows[0]["count"]));
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


const getProductByCategory = async(req, res) =>{

    try{

        const id = req.params.id;
        const query = "select id, name, price from product where category_id = $1";
        const values = [id];
        await client.query(query, values, (err,result) => {

            if (!err){
               
                return res.status(200).json(result.rows);
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

const getProductById = async(req, res) =>{
    try{
        const id = req.params.id;
        const query = "SELECT p.id, p.name, p.description, p.price, c.id as category_id, c.name AS categoryname FROM product p INNER JOIN category c ON p.category_id = c.id where p.id = $1";
        const values = [id];
        await client.query(query, values, (err,result) => {
            if (!err){
                return res.status(200).json(result.rows);
            }
            else{
                console.log(err);
                return res.status(500).json(err);
            }
        })
    }
    catch{
        console.log(err);
        res.status(500).json({ error: 'error'});
        
    }
}

const updateProduct = async(req, res) =>{
    try{
        const id = req.params.id;
        const {name, category_id, description, price} = req.body;
        console.log(req.body)
        const query = "update product set name = $1, category_id =$2, description = $3, price = $4 where id = $5 returning *";
        const value = [name, category_id, description, price, id];
      
        await client.query(query, value, (err,results)=>{
            if(!err){
                if(results.rowCount ==0){
                    return res.status(404).json({message: "Product id does not found"});
                }
                const updatedProduct = results.rows[0]; 
                console.log(updatedProduct)
                return res.status(200).json(updatedProduct);
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


const deleteProduct = async(req, res) =>{
    try{
        const id = req.params.id;
        const query = "delete from product where id = $1";
        const value =[id]
  
        await client.query(query, value, (err, results) =>{
            if(!err){
                if(results.rowCount ==0){
                    return res.status(404).json({message: "Product id does not found"});
                }
           
                return res.status(200).json({message:"Product deleted successfully"});
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



module.exports = {addProduct, getProduct, getProductByCategory, getProductById, updateProduct, deleteProduct,productCount} 