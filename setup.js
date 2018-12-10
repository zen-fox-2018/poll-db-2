const db = require('./db.js')

db.serialize(function() {
    let qCreateVoterTable = ` 
    CREATE TABLE IF NOT EXISTS Voters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        gender VARCHAR(10),
        age INTEGER
    )`

    db.run(qCreateVoterTable, function(err) {
        if(err) {
            console.log('err: ', err);
        } else {
            console.log('Success Create Voters Table!')
        }
    })

    let qCreatePoliticianTable = `
    CREATE TABLE IF NOT EXISTS Politicians (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50),
        party VARCHAR(4),
        location VARCHAR(4),
        grade INTEGER
    )`

    db.run(qCreatePoliticianTable, function(err) {
        if(err) {
            console.log('err: ', err)
        } else {
            console.log('Success Create Politicians Table!')
        }
    })

    let qCreateTotalVoteTable = `
    CREATE TABLE IF NOT EXISTS votes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        voterId INTEGER,
        politicianId INTEGER,
        FOREIGN KEY (voterId) REFERENCES Voters(id),
        FOREIGN KEY (politicianId) REFERENCES Politicians(id)
    )`

    db.run(qCreateTotalVoteTable, function(err) {
        if(err) {
            console.log('err: ', err)
        } else {
            console.log('List Vote Table success!')
        }
    })
})

module.exports = db
