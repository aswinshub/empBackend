const express = require("express");
const morgan = require("morgan");
const cors = require ('cors')
const app = express();
app.use(morgan("dev"));
require("dotenv").config();
const empRoute = require('./routes/addemp')
const loginRoute = require('./routes/login')



app.use(cors());
app.use('/emp',empRoute)
app.use('/login',loginRoute)


const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
