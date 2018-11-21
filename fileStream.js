"use strict";

const router = require("express").Router();
const _ = require('lodash');
const fs = require('fs');
const uploadDir = 'uploads/';
const path = require('path');
const multer = require('multer');
const jimp = require('jimp');
var storage = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, uploadDir)
	},
	filename: (req, file, cb) => {
	  cb(null, file.originalname)
	}
});

var formatFile = (fileLocation)=>{
    jimp.read(fileLocation).then((image)=>{
      image.blur(100).write(fileLocation);
    }).catch((err)=>{
       throw console.error("Error Blurring the image");
    })
};

// var upload = multer({ //multer settings
//     storage: storage,
//     fileFilter: function (req, file, callback) {
//         var ext = path.extname(file.originalname);
//         if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
//             return callback(new Error('Only images are allowed'))
//         }
//         callback(null, true)
//     },
//     limits:{
//         fileSize: 1024 * 1024
//     }
// }).single('profilepic');
 
var upload = multer({storage: storage});

router.get('/:id', (req, res, next)=>{
    var filename = req.params.id;

    var fileLocation = path.join('./uploads',filename);
    console.log(fileLocation);
    res.download(fileLocation, file); 
})

router.post('/', upload.single("file"), (req, res, next) => {

    if(!req.file){
        res.send('There is no new Attached file');
    }

    let fileItem = req.file;
    let filename = fileItem.filename

    var fileLocation = path.join('./uploads',filename);

    formatFile(fileLocation)

    res.send(filename);
});



module.exports = router;