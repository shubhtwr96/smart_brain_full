const express = require('express');
const res = require('express/lib/response');
const bcrypt=require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./components/register');
const signin = require('./components/signin');
const profile = require('./components/profile');
const image = require('./components/image');

const db=knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'Krpkabp2@',
      database : 'smart_brain'
    }
  });

const app = express();

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send('it is working');
})

app.post('/signin',signin.handlesignin(db,bcrypt))
app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id',(req,res)=>{profile.handleprofile(req,res,db)})
app.put('/image',(req,res)=>{image.handleimage(req,res,db)})

app.listen(process.env.PORT||3000,()=>{
    console.log("app is running on port ${process.env.PORT}");
});