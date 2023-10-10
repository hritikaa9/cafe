const express = require('express')
const cors = require('cors')

const userRoute = require('./routes/UserRoute');
const categoryRoute = require('./routes/CategoryRoute');
const productRoute = require('./routes/ProductRoute');
const billRoute = require('./routes/BillRoute');
const dashboardRoute = require('./routes/DashboardRoute');


const app = express()

const port = process.env.PORT || 5000

app.use(express.json());

app.use(cors())

app.use(express.urlencoded({extended:true}));

// app.use(dashboardRoute)

app.use('/user', userRoute)
app.use('/category', categoryRoute)
app.use('/product', productRoute)
app.use('/bill', billRoute)
app.use('/dashBoard', dashboardRoute)


app.listen(port, () => {

    console.log("Server running on port", port);

})