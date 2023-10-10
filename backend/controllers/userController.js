const { query } = require('express');
const {client} = require('../config/db.js');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();
// var auth = require('../services/authentication');
// var checkRole = require('../services/checkRole');



//signup
const createUser = async (req, res) =>{
    // console.log(req.body)
    try{

        const { name, contact, email, password} = req.body;
        const checkQuery = 'SELECT name FROM users WHERE email = $1';
        const checkValues = [email];
        const checkResult = await client.query(checkQuery, checkValues);
     
        if (checkResult.rowCount>0){
            res.status(400).json({error:'Email already exists. '});
        } else{
            // console.log("check1")
            const insertQuery = 'INSERT INTO users (name, contact, email, password, status, role) VALUES ($1, $2, $3, $4, $5, $6) returning *';
            const insertValues = [name, contact, email, password, "true", "User"];
            // console.log("rrrr")
            await client.query(insertQuery, insertValues, (err, result)=>{
                if (err){
                    return res.status(500).json({ error: 'An error occurred while creating the user.' });
                }
                const response = { email: result.rows[0].email, role: result.rows[0].role,  id: result.rows[0].id, name: result.rows[0].name};
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' });
                res.status(200).json({message: 'User created successfully',accessToken})
                // console.log(result)
                // console.log(result.rows[0])
            })
       
        }
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'An error occurred while creating the user' });
      }
};


//login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        const query = "SELECT * FROM users WHERE email = $1"; 
        const value = [email];

        await client.query(query, value, (err, result) => {
            if (!err) {
                console.log(result.rows[0].password );
                if (result.rows[0].length <= 0 || result.rows[0].password != password) {
                    return res.status(401).json({ message: "Email or Password is incorrect" });
                }  else if (result.rows[0].password == password) {
                    const response = { email: result.rows[0].email, role: result.rows[0].role,  id: result.rows[0].id, name: result.rows[0].name };
                    const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' });
                    res.status(200).json({ token: accessToken });
                } else {
                    return res.status(400).json({ message: "Something went wrong. Try again" });
                }
            } else {
                return res.status(500).json(err);
            }
        });
    } catch (error) {
        console.error('Error login user:', error);
        res.status(500).json({ error: 'An error occurred while logging the user' });
    }
};

const userProduct = async(req, res) =>{
try{
    const token = req.headers.authorization.split(' ')[1]; 
    const data  = req.body;
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN); 
    const userId = decoded.id;
    const jsonData = JSON.stringify(data);
    console.log(jsonData)
    console.log(data)
    const query =   "Insert into orders (user_id, products) values ($1, $2);"
    const value = [userId, jsonData]
    console.log(userId, jsonData)
    await client.query(query, value, (err, value)=>{
        if (err){
            return res.status(500).json({ error: 'An error occurred while placing an order.' });
        }
        res.status(200).json({message: 'Ordered successfully'})
    })
}
catch{
    console.error('error in placing order');
    res.status(500).json({ error: 'An error occurred while placing an order' });
}
}

const getUserOder = async(req, res)=>{
    try{
        const userId = req.params.id;
        const query = 'SELECT products FROM orders WHERE user_id = $1';
        const values = [userId];
    
        await client.query(query, values, (err, result) => {
          if (!err) {
            if (result.rowCount === 0) {
              return res.status(404).json({ error: 'User not found' });
            }
            const userData = result.rows;
            console.log(userData)
            return res.status(200).json(userData);
          } else {
            console.error(err);
            return res.status(500).json({ error: 'An error occurred while fetching user data' });
          }
    })
}
    catch{
        console.error('error in loading order');
    res.status(500).json({ error: 'An error occurred while loading data' });
    }
}


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user :process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})


//forgotpassword
const forgetPassword = async (req, res) => {
   try{
    
    const {email} = req.body;
    const query = "Select * from users where email = $1";
    const value=[email];
    
    await client.query(query, value, (err, result) => {
        if(!err){
            if(result.rowCount <=0){
                return res.status(200).json({message: "no user exist of this email."});
            }
            else{
                var mailOptions = {
                    from :process.env.EMAIL,
                    to : result.rows[0].email,
                    subject :'Password by cafe management system',
                    html:'<p><b>Login details for Cafe Management System</b></br><b>Email: </b>'+ result.rows[0].email + '<br><b>Password: </b>' + result.rows[0].password+ '<br><a href ="http://localhost:4200/shop">Click here to login</p>'
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if (error){
                        console.log(error);
                    }
                    else{
                        console.log('Email sent: ' +info.response);
                    }
                });
                return res.status(200).json({message:"Password sent successfully to your email"});
            }

        }
        else{
            
             return res.status(500).json(err);
        }
    })
   }
   catch (error) {
    console.log(error);
    res.status(500).json({ error: 'error'});
}};


//get user
const getUser = async(req, res) =>{
try{
const query = "select * from users where role ='User'";
await client.query(query, (err, result) => {
if (!err){
    return res.status(200).json(result);
}
else{
    return res.status(500).json(err);
}
})
}
catch{
    res.status(500).json({ error: 'error'});
}
};

//update user role
const updateUser = async(req, res) =>{
try{
const {status, id} = req.body;
const query = "Update users set status = $1 where id = $2";
const values = [status, id]
await client.query(query, values, (err, results)=>{
    if(!err){
        if(results.affectedRows==0){
            return res.status(404).json({message :"User id does not exist"});
        }
        return  res.status(200).json({message:"User updated successfully"});
    }
    else{
        return   res.status(500).json(err);
    }
})
}
catch{
    res.status(500).json({ error: 'error'});
}

}

//change password
const changePassword = async(req, res)=>{
    try{
        const {oldPassword, newPassword} = req.body;
        const email = res.locals.email;
        const query = "select * from users where email = $1 and password = $2";
        const values = [email, oldPassword]
        await client.query(query, values, (err, result)=>{
            if(!err){
                if(results.length <=0){
                    return res.status(400).json({message:"Incorrect Old password"});
                }
                else if (result.rows[0].password == oldPassword){
                   const query2 = "update user set password =$1 where $2";
                    const value2 = [newPassword, email]
                    client.query(query2, value2, (err, result)=>{
                        if(!err){
                            return res.status(200).json({message :"Password updated successfully."})
                        }
                        else{
                            return res.status(500).json(err);
                        }
                    })
                }
                else{
                    return res.status(400).json({message:"Something went wrong.Please try again later"});
                }
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




module.exports = {createUser, loginUser, forgetPassword, updateUser, changePassword, userProduct, getUserOder} 