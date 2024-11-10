const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config();

const userRoute = require('./routes/userRoutes')
const incomeRoutes = require('./routes/incomeRoutes')
const expenseRoutes = require('./routes/expenseRoutes')

const app = express();
const port = process.env.PORT || 400;
app.use(express.json({ extended: false }));

// CORS options to allow requests from localhost:3000
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from this origin
    credentials: true, // If you need to send cookies with requests
  };
  
  // Apply CORS middleware
  app.use(cors(corsOptions));



app.use('/user', userRoute);
app.use('/api', incomeRoutes);
app.use('/api', expenseRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB connected successfully"))
    .catch((err) => console.log("Failed to connect database ", err))

app.listen(port, () => {
    console.log("server is running.. 5000");
    console.log(__dirname);
})