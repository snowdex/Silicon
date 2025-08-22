const express =  require('express');
require('dotenv').config();
const cors = require('cors');
const path = require('./routes/route.js');
const db = require('./database/db.js');

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;
db.connectDB();

app.use('/api/', path);


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})