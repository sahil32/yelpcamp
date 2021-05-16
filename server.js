const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const path = require('path');
const Campground = require('./models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex: true
})
const db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection error'));
db.once('open',()=>{
    console.log('database Connected succesfully');
})

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/makeCampground',async (req, res)=>{
    const camp = new Campground({title:'My backyard', description: 'cheap campaining '});
    await camp.save();
    res.send(camp);

})

app.get('/campgrounds', async (req,res)=>{
    const campgrounds = await new Campground.find({});
    res.render('campgrounds/index',{campgrounds})
})

app.get('/', (req, res)=>{
    res.render('home');
})
app.listen(3000,()=>{
    console.log("listening to 3000....http://localhost:3000");
})
