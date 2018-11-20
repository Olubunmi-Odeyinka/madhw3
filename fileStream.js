"use strict";

const router = require("express").Router();
const _ = require('lodash');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/:id', (req, res, next)=>{
    var DocumentID = req.params.id;

    db.Fo_Resource.findById(DocumentID)
        .then(function (result) {

            res.writeHead(200, {
                'Content-Type': result.FileType,
                'Content-Disposition': 'attachment; filename='+result.FileName,
                'Content-Length': result.FileSize
            });
            res.end(result.ResDocument);

        }).catch(function (e) {
        debugger;
        res.status(400).send(e);
    })
})

router.post('/', upload.any(), (req, res, next) => {
    debugger;
    //let DocumentID =  req.body['DocumentID'];
    //let DocIdAndName = req.body[key].DocumentID.split('#');

    if(!req.files.length){
        res.send('There is no new Attached file');
        //return;
    }

    let documentIdArray = req.body["DocumentID"];
    let docIdArray = [];
    if(typeof documentIdArray === "string") {
        docIdArray.push(documentIdArray);
    }else{
        _.map(documentIdArray, (val)=> docIdArray.push(val));
    }

    let functionArray = [];
        _.map( docIdArray, (val, key) => {
            let DocIdAndField = val.split('***');
            let docId = DocIdAndField[0];
            let docFieldName = DocIdAndField[1];
            let fileItem = _.filter(req.files, {'fieldname': docFieldName});
            if(docId && docFieldName){
            functionArray.push(
                db.Fo_Resource.update({ ResDocument: fileItem[0].buffer},
                {where:{
                    'DocumentID': docId
                }}));
            }
        });


    Promise.all(functionArray)
        .then((updatedCount)=>{
            res.send(updatedCount);
        }).catch(function (e) {
        debugger;
        res.status(400).send(e);
        });
})

module.exports = router;