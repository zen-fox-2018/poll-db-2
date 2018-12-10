const fs = require('fs')
const db = require('./db.js')

function readFile(path) {
    let data = fs.readFileSync(path, 'utf8')
    return data.split('\n').splice(1)
}

function seedData() {
    db.serialize(function() {
        let politiciansData = readFile('./politicians.csv')
        for(let i = 0; i < politiciansData.length-1; i++) {
            let data = politiciansData[i].split(',')
            let qInsertDataPoliticians = 
            `INSERT INTO Politicians (name, party, location, grade)
            VALUES ("${data[0]}", "${data[1]}", "${data[2]}", ${Number(data[3])})`

            db.run(qInsertDataPoliticians, function(err) {
                if(err) {
                    console.log(err)
                } else {
                    console.log('Success add Politician Data')
                }
            })
        }

        let votersData = readFile('./voters.csv')
        for(let i = 0; i < votersData.length-1; i++) {
            let data = votersData[i].split(',')
            let qInsertDataVoters = 
            `INSERT INTO Voters (first_name, last_name, gender, age)
            VALUES ("${data[0]}", "${data[1]}", "${data[2]}", ${Number(data[3])})`

            db.run(qInsertDataVoters, function(err) {
                if(err) {
                    console.log(err)
                } else {
                    console.log('Success add Voters Data')
                }
            })
        }

        let votesData = readFile('./votes.csv')
        for(let i = 0; i < votersData.length-1; i++) {
            let data = votesData[i].split(',')
            let qInsertDataVotes = 
            `INSERT INTO Votes (voterId, politicianId)
            VALUES (${Number(data[0])}, ${Number(data[1])})`
            
            db.run(qInsertDataVotes, function(err) {
                if(err) {
                    console.log(err)
                } else {
                    console.log('Success add Votes Data')
                }
            })
        }
    })
}

seedData()


    