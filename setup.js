const sqlite3 = require ('sqlite3').verbose()
const db = new sqlite3.Database('database.db')

db.serialize(function (err, data) {
    if (err) {
        console.log(err)
    } else {

        let createPoliticians =
            `CREATE TABLE Politicians(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            party TEXT,
            location TEXT,
            grade_current REAL
            )`
        
            // db.run(createPoliticians, function (err) {
            //     if (err) {
            //         console.log(err)
            //     }
            // })

        let createVoters = 
            `CREATE TABLE Voters(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                first_name TEXT,
                last_name TEXT,
                gender TEXT,
                age REAL
                )`

        // db.run(createVoters, function (err) {
        //     if (err) {
        //         console.log(err)
        //     }
        // })

        let createVotes = 
        `CREATE TABLE Votes(
            voterID INTEGER,
            politicianID INTEGER
            )`

        // db.run(createVotes, function (err) {
        //      if (err) {
        //         console.log(err)
        //      }
        // })

    }
})

// db.close()

module.exports = db