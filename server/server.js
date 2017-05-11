/**
 * Created by nirmal on 5/11/17.
 */
const path= require('path');
const publicPath= path.join(__dirname,'../public');

const express=require('express');

var app=express();

//heroku port confgurations
const port=process.env.PORT || 3000;

//middleware
app.use(express.static(publicPath));

app.listen(port,()=>{
    console.log(`Started on port ${port}`);
});
