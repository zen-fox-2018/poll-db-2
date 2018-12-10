const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./database.db');

let qR01 =
    `SELECT name, location, grade_current, COUNT(voterID) AS totalVote
     FROM Politicians
     INNER JOIN Votes
     ON Politicians.id = Votes.politicianId
     WHERE grade_current < 9
     GROUP BY name
     ORDER BY totalVote ASC`

let qR02 = 
    `SELECT totalVote, politicianName, first_name ||" "|| last_name AS voterName, gender
     FROM (SELECT Politicians.id AS tableXId, Politicians.name AS politicianName, count(voterId) AS totalVote FROM Politicians
     INNER JOIN votes ON Politicians.id = Votes.politicianId
     GROUP BY politicianId
     ORDER BY totalVote DESC LIMIT 3) AS TableX
     INNER JOIN Votes ON TableX.tableXId = Votes.politicianId 
     INNER JOIN Voters ON Votes.voterId = Voters.id
     ORDER BY totalVote DESC, politicianName;`
    
let qR03 =
    `SELECT COUNT(voterID) AS totalVote, (first_name ||' '|| last_name) as name, gender, age
     From Votes
     INNER JOIN Voters
     ON Votes.voterId = Voters.id
     GROUP BY name
     HAVING totalVote > 1
     ORDER BY totalVote DESC
     `

db.serialize(function(err){
    if(err) {
        console.log(err)
    } else {
        db.all(qR01, function(err, data){
            if(err) {
                console.log(err)
            } else {
                console.log("Release 0 No. 1")
                console.table(data)
                console.log('')
            }
        })

        db.all(qR02, function (err, data) {
            if (err) {
                console.log(err)
            } else {
                console.log("Release 0 No. 2")
                console.table(data)
                console.log('')
            }
        })
        
        db.all(qR03, function (err, data) {
            if (err) {
                console.log(err)
            } else {
                console.log("Release 0 No. 3")
                console.table(data)
                console.log('')
            }
        })
    }
})

