const { query } = require('express');
const {client} = require('../config/db.js');
require('dotenv').config();


const getDetails = async (req, res) =>{
    try{
        var categoryCount;
        var productCount;
        var billCount;
        var query = "select count(id) as categoryCount from category";
        await client.query(query, (err, results)=>{
            if(!err){
                categoryCount = results.rows[0].categorycount;
            }
            else{
                return res.status(500).json(err);
            }
        })

        var query = "select count(id) as productCount from product";
        await client.query(query, (err, results)=>{
            if(!err){
                productCount = results.rows[0].productcount;
            }
            else{
                return res.status(500).json(err);
            }
        })

        var query = "select count(id) as billCount from bill";
        await client.query(query, (err, results)=>{
            if(!err){
                billCount = results.rows[0].billcount;
                var data ={
                    category :categoryCount,
                    products:productCount,
                    bill :billCount
                };
        
                return res.status(200).json(data);
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



module.exports = {getDetails} 