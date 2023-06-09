require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./modeles/User');
const app = express()
const port = 4000;
//connexion a la base de donné
const url = process.env.MONGO_URL;
function connect (){
    try{
        mongoose.connect(url,{
            userNewUrlParser: true,
            userUnifiedTopology: true
        });
        console.log('connexion a la base donné reuissi')
    }
    catch(err){
        console.log(err)
    }
}
connect()
app.use(express.json());
//reuperer les user
app.get('/users', (req, res)=>{
    User.find()
    .then((users) =>{
        res.json(users)
    })
    .catch((error)=>{
      res.status(500).json({error: 'erreur lors du get '})
    });
});
//ajouter un utilisateur
app.post('/user', (req, res) =>{
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        passworld: req.body.passworld
    });
    user.save()
    .then((user)=>{
        res.json(user)
    })
    .catch((error)=>{
        res.status(500).json({error: 'erreur lors du ajout '})
    });
});
//update 
app.put('/users/:id', (req, res)=>{
    User.findOneAndUpdate(req.params.id, req.body)
    .then((user) =>{
        if (user){
            res.json(user)
        }else{
            res.status(404).json({error: 'user not found'})
        }
    })
    .catch((error)=>{
        res.status(500).json({error: 'erreur lors du ajout '})
    });
});
//suprimer
app.delete('/users/:id', (req, res)=>{
    User.findByIdAndDelete(req.params.id)
    .then((user)=>{
        if(user){
            res.json(user)
        }else{
            res.status(404).json({error: 'error sur l\'utilisateur'});
        }
    })
    .catch((error)=>{
        res.status(500).json({error: 'erreur lors du ajout '})
    });
});
//lancer le serveur
app.listen(port,
    console.log('serveur est lancer ')
    )