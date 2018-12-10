const fs = require("fs")
const sqlite3 = require('sqlite3').verbose()
const db = require('./setup.js')

function readFile(path, cb) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            cb(err, null)
        } else {
            cb(null, data)
        }
    })
}

function parsePoliticians() {
    db.serialize(function () {
        readFile('./politicians.csv', function (err, data) {
            if (err) {
                console.log(err, 'error')
            } else {
                let parsedData = data.split("\n").slice(1)

                for (let i = 0; i < parsedData.length; i++) {
                    let splitData = parsedData[i].split(',')
                    let insertData =
                        `INSERT INTO Politicians (name,party,location,grade_current)
                     VALUES('${splitData[0]}','${splitData[1]}', '${splitData[2]}', ${splitData[3]});`

                    db.run(insertData, function (err) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log("success add data")
                        }
                    })
                }
            }
        })
    })
}

function parseVoters() {
    db.serialize(function () {
        readFile('./voters.csv', function (err, data) {
            if (err) {
                console.log(err, 'error')
            } else {
                let parsedData = data.split("\n").slice(1)

                for (let i = 0; i < parsedData.length; i++) {
                    let splitData = parsedData[i].split(',')
                    let insertData =
                        `INSERT INTO voters (first_name, last_name, gender, age)
                     VALUES('${splitData[0]}','${splitData[1]}', '${splitData[2]}', ${splitData[3]});`

                    db.run(insertData, function (err) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log("success fetching data")
                        }
                    })
                }
            }
        })
    })
}

function parseVotes() {
    db.serialize(function () {
        readFile('./votes.csv', function (err, data) {
            if (err) {
                console.log(err, 'error')
            } else {
                let parsedData = data.split("\n").slice(1)

                for (let i = 0; i < parsedData.length; i++) {
                    let splitData = parsedData[i].split(',')
                    let insertData =
                        `INSERT INTO votes (voterID, politicianID)
                     VALUES(${splitData[0]},${splitData[1]});`

                    db.run(insertData, function (err) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log("success fetching data")
                        }
                    })
                }
            }
        })
    })
}

//nomor 1
function showByGrade(){
    let query = 
    `SElECT
        COUNT (Votes.voterID) AS TotalVote,
        name,
        location,
        grade_current
    FROM Politicians
    INNER JOIN Votes ON Votes.politicianID = Politicians.id
    WHERE grade_current < 9
    GROUP BY Politicians.name
    ORDER BY grade_current ASC`

    db.all(query, function(err, rows){
        if(err){
            console.log(err)
        }   else{
            console.log(rows)
        }
    })
}

//nomor2
function showTopVoters(){
    let query = 
    `SELECT 
        TotalVote,
        politicianName,
        Voters.first_name ||" "||Voters.last_name AS voterName,
        Voters.gender AS gender
    FROM (
        SELECT 
            COUNT (Votes.voterID) AS TotalVote,
            Politicians.name AS politicianName,
            Politicians.id
        FROM Politicians
        LEFT JOIN Votes ON Votes.politicianID = Politicians.id
        GROUP BY Politicians.name
        ORDER BY TotalVote DESC LIMIT 3
    ) AS TopThree
    
    INNER JOIN voters ON Votes.voterID  = voters.id
    INNER JOIN Votes ON Votes.politicianID = TopThree.id
    ORDER BY TopThree.TotalVote DESC, PoliticianName`


    db.all(query, function(err, rows){
        if(err){
            console.log(err)
        }   else{
            console.log(rows)
        }
    })
}

//nomor3
function doubleVote(){
    let query = 
    `SELECT 
        COUNT (Votes.voterID) AS totalVote,
        first_name || " " || last_name AS full_name,
        gender,
        age
    FROM Voters
    INNER JOIN Votes ON Voters.id = Votes.voterID
    GROUP BY full_name
    HAVING totalVote > 1
    ORDER BY totalVote DESC`

    db.all(query, function(err, rows){
        if(err){
            console.log(err)
        }   else{
            console.log(rows)
        }
    })
}

showByGrade()
showTopVoters()
doubleVote()
