import multer from "multer";

const storage =multer.diskStorage({

    filename:function(req,file,callback){
        callback(null,file.originalname)
    }
})

const uplode =multer({storage})

export default uplode;