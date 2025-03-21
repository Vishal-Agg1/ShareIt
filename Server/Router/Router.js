const express = require('express');
const router = express.Router();

//importing controllers
const {fileupload} = require('../Controllers/fileupload');
const {signup,login} = require('../Controllers/Authentication');
const {fileshare} = require('../Controllers/fileshare');
const {fetchfiles} = require('../Controllers/fetchfiles');
const {recfiles} = require('../Controllers/recfiles');
const {Profile} = require('../Controllers/profile');
//requests
router.post('/upload',fileupload);
router.post('/signup',signup);
router.post('/login',login);
router.post('/share',fileshare);
router.post('/fetch',fetchfiles);
router.post('/recieved',recfiles);
router.get('/profile/:id',Profile);
module.exports = router;