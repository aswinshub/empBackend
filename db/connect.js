const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://aswindb:aswin123@company.ck23ks9.mongodb.net/company?retryWrites=true&w=majority')
.then(()=>{
    console.log('Connected to Blog DB')
})
.catch(()=>{

    console.log('Error ! No connection');
})




