const router = require("express").Router();

const downloadRoute = require("./download.route");

router.use("/software", downloadRoute);

module.exports = router;
