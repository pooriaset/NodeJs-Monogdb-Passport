const multer = require("multer");
const mkdir = require("mkdirp");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        mkdir('./public/images/users/').then(made => {
            cb(null, './public/images/users/');
        });
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

var upload = multer({ storage: storage });

module.exports = upload;