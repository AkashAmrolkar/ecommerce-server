import multer from "multer";


const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
})

const upload = multer({
    storage: storage    
})

export default upload
