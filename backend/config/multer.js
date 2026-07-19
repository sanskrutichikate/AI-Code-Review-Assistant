import multer from "multer";
import path from "path";



const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() + "-" + file.originalname;

        cb(null, uniqueName);
    }

});




const fileFilter = (req, file, cb) => {

    const allowedExtensions = [
        ".js",
        ".java",
        ".py",
        ".cpp",
        ".c",
        ".cs",
        ".php",
        ".ts"
    ];

    const extension = path.extname(file.originalname).toLowerCase();

    if (allowedExtensions.includes(extension)) {
        cb(null, true);
    } else {
        cb(new Error("Only source code files are allowed."));
    }

};


// Multer Upload 

const upload = multer({

    storage,

    fileFilter

});

export default upload;