const { query } = require('express');
const {client} = require('../config/db.js');
require('dotenv').config();
let ejs = require('ejs');
let pdf = require('html-pdf');
let path = require('path');
var fs=require("fs");
var uuid = require('uuid');



const generateReport = async(req, res) =>{
    try{
        console.log("Check2")
       const generatedUuid = uuid.v1();
       console.log("Check3")
       const {name, email, contact,payment} = req.body.user;
       const productDetailsList  = req.body.productDetailsList;
       const total = req.body.total;
       console.log("Check4")
    console.log("Check5")
    var productDetailsReport = productDetailsList
    console.log(productDetailsReport)
    console.log(req.body.user)
    console.log(total)
       const query = "insert into bill(name, uuid, email, contactnumber, paymentmethod, total, productdetails, createdby) values ($1, $2, $3, $4, $5,$6, $7, $8)";
    //    const values = [name, generatedUuid, email, contactNumber,paymentMethod, totalAmount, productDetails, res.locals.email] 
        console.log("check6")
    const values = [name, generatedUuid, email, contact,payment, total, productDetailsList, "Admin"] 
    //    console.log("check4")
    //    console.log(generatedUuid)
    console.log("check7")
       await client.query(query, values, (err, results)=>{
        if(!err){
            console.log("check5")
            console.log(path.join(__dirname, '', "report.ejs"))
            ejs.renderFile(path.join(__dirname, '', "report.ejs"),{
                productDetails: productDetailsReport, name: name, email:email, contactnumber:contactnumber, paymentmethod:paymentmethod, total:total
            },(err, results)=>{
                if(err){
                    console.log("check7")
                    console.log(err)
                    return res.status(500).json(err);
                }
                else{
                    console.log("check8")
                    pdf.create(results).toFile('./generated_pdf/' +generatedUuid+".pdf", function(err, data){
                        if(err){
                            console.log(err);
                            return res.status(500).json(err);
                        }
                        else{
                            return res.status(200).json({uuid: generatedUuid});
                        }
                    })
                }
            })
        }
        else{
            return res.status(500).json(err)
        }
       } )

    }
    catch{
        res.status(500).json({ error: 'error'});
    }
}


const getBills = async(req, res) =>{
try{
    const query = "select * from bill order by id DESC";
    await client.query(query, (err, results)=>{
        if(!err){
            return res.status(200).json(results);
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

const deleteBills = async(req, res) =>{
    try{
        const id = req.params.id;
        const query = "delete from bill where id = $1";
        await client.query(query, [id], (err, results)=>{
            if(!err){
                if (results.affectedRows ==0){
                    return res.status(404).json({message: "Bill id does not found"});
                }
                return res.status(200).json({message:"Bill deleted Successfully"});
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

const getProducts = async(req, res) =>{
    try{
        const query = "select id from productdetails";
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

const addProducts = async(req, res) =>{
    try{
        const details = req.body;
        console.log(details)
        const query = "insert into productdetails (details) values ($1)";
        const value = [details];
        await client.query(query, value, (err,results)=>{
            if(!err){
                return res.status(200).json({message:"Product details added successfully"});
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


const getPdf = async(req, res) =>{
    try{
        const orderDetails = req.body;
        const pdfPath = './generated_pdf/'+orderDetails.uuid+'.pdf';
        if(fs.existsSync(pdfPath)){
            res.contentType("application/pdf");
            fs.createReadStream(pdfPath).pipe(res);
        }
        else{
            var productDetailsReport = JSON.parse(orderDetails.productDeatils);
            ejs.renderFile(path.join(__dirname, '', "report.ejs"),{
                productDetails: productDetailsReport, name: name, email:email, contactNumber:contactNumber, paymentMethod:paymentMethod, totalAmount:totalAmount
            },(err, results)=>{
                if(err){
                    return res.status(500).json(err);
                }
                else{
                    pdf.create(data).toFile('./generated_pdf/' +generatedUuid+".pdf", function(err, data){
                        if(err){
                            console.log(err);
                            return res.status(500).json(err);
                        }
                        else{
                            res.contentType("application/pdf");
                            fs.createReadStream(pdfPath).pipe(res);
                        }
                    })
                }
            })

        }

    }
    catch{
        res.status(500).json({ error: 'error'});
    }
}

module.exports = {generateReport, getPdf, getBills, deleteBills,getProducts, addProducts} 