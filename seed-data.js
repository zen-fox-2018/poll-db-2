const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./pollDB.db');


function findAll (input) {
    db.all(input ,function (err, data) {
        if(err) {
            console.log(err)
        }else{
            console.log(data)
        }
    })
}

let sql21 = `
            SELECT 
                name,
                location,
                grade_current,
                COUNT (PoliticianID) AS "totalVote"
            FROM Politicians
            INNER JOIN Votes ON Votes.politicianID = Politicians.id
            WHERE 
                grade_current < 9
                GROUP BY Politicians.name
                ORDER BY totalVote ASC
`

// findAll(sql21)

let sql22 = `
            SELECT 
                totalVote,
                politicianLimit.name AS "politicianName",
                Voters.first_name ||" "|| Voters.last_name AS "voterName",
                Voters.gender
            FROM (
                SELECT 
                    COUNT (PoliticianID) AS "totalVote",
                    name,
                    Politicians.id
                    FROM Politicians
                    INNER JOIN Votes ON Politicians.id = Votes.PoliticianID
                    GROUP BY Politicians.name
                    ORDER BY totalVote DESC
                    LIMIT 3
            ) AS politicianLimit
            INNER JOIN Votes ON politicianLimit.id = Votes.politicianId
            INNER JOIN Voters ON Voters.id = Votes.voterId
            ORDER BY totalVote DESC, politicianName;          
`

findAll(sql22)

let sql32 = `
            SELECT
                COUNT (politicianId) AS "totalVote",
                Voters.first_name ||" "|| Voters.last_name AS "name",
                Voters.gender,
                Voters.age
            FROM Votes
            INNER JOIN Voters ON Voters.id = Votes.voterId
            Group by Voters.id
                HAVING totalVote > 1
            ORDER BY totalVote DESC;
`

// findAll(sql32)