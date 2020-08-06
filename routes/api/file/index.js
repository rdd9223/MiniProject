const router = require('express').Router();
const modFile = require('../../../models/file');
const multer = require('multer');
const upload = multer({dest: 'files/'});
const GridFsStorage = require('multer-gridfs-storage');
const url = 'mongodb://localhost:27017/app';
const jwt = require("../../../middlewares/jwt");
const modfile = require("../../../models/file");
const fs = require('fs');
const gridfs = require('gridfs-stream');
const StreamZip = require('node-stream-zip');


// 스토리지 만들기
const storage = new GridFsStorage({url});
// const upload = multer({storage});

router.post('/', jwt.checkLogin, upload.single('zip'), async(req, res) => {
	const fileId = req.file.filename;
	const fileName = req.file.originalname;
	const userName = req.decoded.userId;
	const stream = fs.createReadStream(file.path);
	
	storage.fromStream(stream, req, file)
		.then(() => console.log('File uploaded'))
		.catch(() => res.status(500).send('error'));
	
	const newFileInfo = new modFile({userId: userName, fileName: fileName, fileId: fileId});
	await newFileInfo.save();
	
	res.status(201).send(newFileInfo);
})

router.get('/', jwt.checkLogin, async(req, res) => {
	const {userId} = req.decoded
	const fileName = req.query.filename;
	
	
	return;
})
module.exports = router;