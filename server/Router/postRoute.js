const router = require("express").Router();
const postControllers = require("../Controllers/postControllers")
const multer = require('../Config/multer')

router.post("/upload", multer.array('uploadfile', 10), postControllers.upload);

module.exports = router;