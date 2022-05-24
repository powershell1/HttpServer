const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/test.html");
});

app.post("/request.php", (req, res) => {
    var requestbody = req.body;
    var shirtnumber = requestbody["shirt-number"];
    var digitnumber = requestbody["last-four-id-card-number"];
    setTimeout(() => {
        if (shirtnumber === "40628" && digitnumber === "9081") {
            res.send("success");
        } else {
            res.send("fail");
        };
    }, 5000);
});

app.listen(80, () => {
    console.log('Server is running on port 80');
});