const express = require("express");
const router = express.Router();
const Note = require('../models/Note.js');
const { isAuthenticated} = require('../auth/usersData')


//Recibe the forms data
router.post('/notes/newNote',isAuthenticated,async (req, res)=>{
    //Save my data as const 
    const {title, description } = req.body;
    const errors = [];
    //Data validation 
    if(!title){
        errors.push({text: 'Title must be provided'});
    }
    if(!description){
        errors.push({text: 'Description must be provided'});

    }
    if(errors.length > 0){
        res.render('notes/newNote',{
          errors,
          title,
         description
        });
    }else{
        //Send to database collection
        const newNote = new Note({title, description});
        newNote.user = req.user.id;
        await newNote.save();
        req.flash('succes', 'Your note created!')
        res.redirect('/notes');
        //res.send('Note created succesfully')
    }

    console.log(req.body);
});




router.get('/notes',isAuthenticated, async (req,res)=>{
   const notes = await Note.find({user: req.user.id}).sort({date:'desc'}).lean();//get only one user note 
   //lean(): to get a json object (instead of a mongoose one)
   res.render('notes/notes.hbs', {notes});
});

router.get('/notes/add', isAuthenticated, (req,res)=>{
    res.render('notes/newNote.hbs');
});

router.get('/notes/edit/:id',isAuthenticated, async (req,res)=>{
    //Getting the notes ids
   const note =  await Note.findById(req.params.id).lean();
    res.render('notes/edit.hbs',{note});
});

//Update data
router.put('/notes/edit/:id',isAuthenticated, async (req,res)=>{
    const {title, description} = req.body;
   await Note.findByIdAndUpdate(req.params.id,{title,description});
   req.flash('succes', 'Your note was changed successfully');
   res.redirect('/notes');
});

//Delete data
router.delete('/notes/delete/:id',isAuthenticated,async (req,res)=>{
   await Note.findByIdAndDelete(req.params.id);
   req.flash('succes', 'Your note was deleted');
   res.redirect('/notes')
});
module.exports = router;