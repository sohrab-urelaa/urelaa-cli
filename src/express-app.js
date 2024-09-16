const express = require("express");
const path = require("path");

const user = require("./routers/user");

//IMPORT MODULES AREA


module.exports = (app) => {
    app.use(express.json());
    app.use("/files", express.static(path.join(__dirname, "../")));

        user(app),

//INCLUDE ROUTES AREA


    app.get("/", (req, res) => res.status(200).send("Welcome to urelaa api."));
    // error handling
};
