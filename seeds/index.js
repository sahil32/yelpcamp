
const cities = require('./cities');
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const {descriptors,places} = require('./seedHelpers');
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
const sample = array=> array[Math.floor([Math.random()*array.length])];
const seedDB = async () =>{
    await Campground.deleteMany({});
    for (let i = 0; i< 50; i++)
    {
    const randomThousand = Math.floor(Math.random()*1000);
    const camp = new Campground({
        location: cities[randomThousand].state + " " + cities[randomThousand].city,
        title:`${sample(descriptors)} ${sample(places)}`
    })
    await camp.save();
    }
}
seedDB().then(()=>{
    mongoose.connection.close();
    console.log("updated and closed succesfully");
})