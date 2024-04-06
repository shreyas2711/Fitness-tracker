const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const activityRoutes = require("./routes/activityRoutes");
const authRoutes = require("./routes/authRoutes");
const nutritionRoutes = require("./routes/nutritionRoutes");
const mongoose = require('mongoose');
require("dotenv").config();
const cookieParser = require('cookie-parser');



const cors = require('cors');
app.use(cors({
  origin: 'https://fitness-tracker-vag.netlify.app',
  credentials: true 
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});



app.use(express.json());

mongoose.connect(process.env.DATABASE, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  }).then(() => {
    console.log("DB connected");
  }).catch((err) => console.log(err));

 
  
  // Start the server
 
  app.use(cookieParser());
// app.get('/api/user/signin');


app.use('/api',userRoutes);
app.use('/api',authRoutes);
app.use('/api',activityRoutes);
app.use('/api',nutritionRoutes);


app.use('/', (req, res) => {
  res.send('Hello, this is the root URL!');
});

console.log("hello")


// app.listen(9000);

