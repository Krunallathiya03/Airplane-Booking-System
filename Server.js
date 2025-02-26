const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./Config/db");


const app = express();
dotenv.config();


//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Database connection
connectDB();

//routes
app.use("/auth",require("./Routes/authRoute"));
app.use("/flight",require("./Routes/flightRoute"));
app.use("/booking",require("./Routes/bookingRoute"));







const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))