const express = require('express');
const mongoose = require('mongoose');
const Thing = require('./models/thing');
const app = express();


/**
 * @tutorial Connection a la base de données
 */


/**
 * @param User : Twitmund
 * @param passwd : WmfIjlKCNL9ikyle
 *
 * **/


mongoose.connect('mongodb+srv://Twitmund:1234@expressjs.j5akp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(express.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.post('/api/stuff', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body
    });
    thing.save()
        .then(() => res.status(201).json({message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({error}));
});


app.put('/api/stuff/:id', (req, res, next) => {
    Thing.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
        .then(()=> res.status(200).json({message: "objet modifiée"}))
        .catch(error => res.status(400).json({error}))



});



app.get('/api/stuff/:id', (req, res, next) => {
    Thing.findOne({_id: req.params.id})
        .then(thing =>res.status(200).json(thing) )
        .catch(err => res.status(404).json(err));
});

app.get('/api/stuff', (req, res, next) => {
Thing.find()
    .then(things => res.status(200).json(things) )
    .catch(err => res.status(400).json(err) )
});


module.exports = app;