const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config();

const userRoute = require('./routes/userRoutes')
const incomeRoutes = require('./routes/incomeRoutes')
const expenseRoutes = require('./routes/expenseRoutes')

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json({ extended: false }));

app.options('*', cors());

const corsOptions = {
  origin: 'https://income-expense-tacker-frontend.onrender.com', // Update to frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  };
  
  // Apply CORS middleware
  app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('API is running...');
});


app.use('/user', userRoute);
app.use('/api', incomeRoutes);
app.use('/api', expenseRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB connected successfully"))
    .catch((err) => console.log("Failed to connect database ", err))

app.listen(port, () => {
    console.log("server is running.. 5000");
    
})