const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');



const app = express();
const api = process.env.API_URL;

app.use(cors());
app.options('*',cors());

//middleware
app.use(express.json({extended : false }));
app.use(morgan('tiny'));


//routers
const categoriesRouter = require('./routers/categories');
const productsRouter = require('./routers/products');
const usersRouter = require('./routers/users');
const ordersRouter = require('./routers/orders');

app.use(`${api}/categories`,categoriesRouter);
app.use(`${api}/products`,productsRouter);
app.use(`${api}/users`,usersRouter);
app.use(`${api}/orders`,ordersRouter);


//database
mongoose.connect(process.env.CONNECTION_STRINGH,{
    useNewUrlParser : true,
    useUnifiedTopology:true,
    dbName:'esho-database',
})
.then(()=>{
    console.log('Database Connected');
}).catch((err)=>{
    console.log(err+'Database Not Connected');
})


app.listen(3000,()=>{
    console.log(`Server is running on port 3000`);
})