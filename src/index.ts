import express from "express";

const PORT = 8080;

const app = express();

app.use("/", (req, res) => {
    res.send({
        hello: "world",
    });
});

app.listen(PORT, () => console.log("App running on port: " + PORT))