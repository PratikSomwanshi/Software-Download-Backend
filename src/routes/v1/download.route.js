const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const { StatusCodes } = require("http-status-codes");
const { SoftwareService } = require("../../services");
const { SoftwareController } = require("../../controller");
const { Authenticator } = require("../../middlewares");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "upload/images");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

// http://localhost:8000/api/v1/software/image/***.png
router.post(
    "/image",
    Authenticator,
    upload.single("image"),
    SoftwareService.createImage
);

// http://localhost:8000/api/v1/software
router.get("/", SoftwareController.getAllSoftware);

// http://localhost:8000/api/v1/software (req.body -> data: software object)
router.post("/", Authenticator, SoftwareController.createSoftware);

// http://localhost:8000/api/v1/software (req.body -> id: string, data: "any data to update")
router.patch("/", Authenticator, SoftwareController.updateSoftware);

// http://localhost:8000/api/v1/software (req.body -> id: string)
router.delete("/", Authenticator, SoftwareController.deleteSoftware);

// http://localhost:8000/api/v1/software/search (req.body -> "any string")
router.post("/search", SoftwareController.getSoftware);

module.exports = router;
