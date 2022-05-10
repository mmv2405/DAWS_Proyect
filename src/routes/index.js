const express = require("express");
const router = express.Router();


router.get('/', (req,res)=>{
    res.render('index.hbs'); //Same as send but with .hbs
});

router.get('/reporte', (req,res)=>{
    res.render('reporte.hbs');
});



module.exports = router;