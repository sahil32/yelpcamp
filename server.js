const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const path = require('path');
const Campground = require('./models/campground');
const methodOverride = require('method-override');

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
app.use(express.urlencoded({extended:true}))
app.get('/makeCampground',async (req, res)=>{
    const camp = new Campground({title:'My backyard', description: 'cheap campaining '});
    await camp.save();
    res.send(camp);

})
app.use(methodOverride('_method'))
app.get('/campgrounds', async (req,res)=>{
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index',{campgrounds});
})

app.get('/', (req, res)=>{
    res.render('home');
})
app.get('/campgrounds/new', (req,res)=>{
    res.render('campgrounds/new');
})

app.post('/campgrounds',async (req,res)=>{
    const newground = new Campground(req.body.campground);
    await newground.save();
    res.redirect(`campgrounds/${newground._id}`)
})
app.get('/campgrounds/:id',async (req,res)=>{
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/show',{ campground })
})

app.get('/campgrounds/:id/edit',async (req,res)=>
{
    const {id} = req.params;
    const campground = await Campground.findById(id)
    res.render('campgrounds/edit',{ campground })
})
app.put('/campgrounds/:id',async (req,res)=>{
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate( id ,{...req.body.campground});
    res.redirect(`${campground._id}`);
    
})

app.delete('/campgrounds/:id',async (req,res)=>{
    const {id}= req.params;
    const campground = await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds')
})
app.listen(3000,()=>{
    console.log("listening to 3000....http://localhost:3000");
})
