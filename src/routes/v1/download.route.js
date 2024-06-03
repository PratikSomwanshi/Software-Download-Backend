const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const { StatusCodes } = require("http-status-codes");
const { SoftwareService } = require("../../services");
const { SoftwareController } = require("../../controller");
const { Authenticator } = require("../../middlewares");

// const combinedStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         // Determine the appropriate destination based on file type
//         if (file.mimetype.startsWith("image/")) {
//             cb(null, "upload/images/");
//         } else {
//             cb(null, "upload/files/");
//         }
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname)); // Append extension
//     },
// });

// // Create multer middleware instance
// const upload = multer({ storage: combinedStorage });

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "file") {
            cb(null, "upload/files/"); // Specify the destination directory for files
        } else if (file.fieldname === "image") {
            cb(null, "upload/images/"); // Specify the destination directory for images
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique filename
    },
});

const upload = multer({ storage: fileStorage });

// http://localhost:8000/api/v1/software
router.get("/", SoftwareController.getAllSoftware);

// http://localhost:8000/api/v1/software (req.body -> data: software object)
router.post(
    "/",
    Authenticator,
    // upload.array("files", 2),
    upload.fields([{ name: "file" }, { name: "image" }]),
    SoftwareController.createSoftware
);

// http://localhost:8000/api/v1/software (req.body -> id: string, data: "any data to update")
router.patch(
    "/",
    Authenticator,
    upload.fields([{ name: "file" }, { name: "image" }]),
    SoftwareController.updateSoftware
);

// http://localhost:8000/api/v1/software (req.body -> id: string)
router.delete("/", Authenticator, SoftwareController.deleteSoftware);

// http://localhost:8000/api/v1/software/search (req.body -> "any string")
router.post("/search", SoftwareController.getSoftware);

// http://localhost:8000/api/v1/software/download/{id of software}
router.get("/download/:id", SoftwareController.downloadSoftware);

module.exports = router;
