
const express = require('express');
const path = require('path');
const config = require('config');
const mongoose = require('mongoose');

const app = express();
app.use(express.json({extendet:true}));
app.use('/api/auth', require('./routes/auth.routs'));
app.use('/api/link', require('./routes/link.routs'));
app.use('/t', require('./routes/redirect.routs'));

const PORT = config.get('port') || 5000;
if(process.env.NODE_ENV === 'production'){
  app.use('/', express.static(path.join(__dirname,'client','build')));

  app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  });
}

async function start (){
     try{
       await mongoose.connect(config.get('mongoUrl'),{
        // useNewUrlParser: true,
        // useUnifiedTopologo: true,
        // useCreateIndex:true
       });
       app.listen(PORT, ()=> console.log(`
       App has been started on port ${PORT}...`));
     } catch(e){
         console.log('Server error', e.message);
         process.exit(1);
     }
}
start();

