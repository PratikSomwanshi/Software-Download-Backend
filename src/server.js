const express = require("express");
const morgan = require("morgan");

const { ServerConfig, DBConnect } = require("./config");
const apiRoutes = require("./routes");

const app = express();

app.use(morgan(":method :url :status :response-time ms :date[web]"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/upload/images", express.static("upload/images"));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    console.log(`server running on port ${ServerConfig.PORT}`);
    console.log("connecting to database");
    await DBConnect();
    console.log("successfully connected to db");
});
