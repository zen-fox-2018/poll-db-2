const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

function allQuery(query) {
    db.all(query, function (err, rows) {
        if (err) {
            console.log(err)
            // cb(err)
        }
        else {
            // let msg = `sukses ${untuk}`               
            console.log(rows)
        }
    })
}

function nomor1() {
    let query1 = `
SELECT 
    name, location, grade_current, COUNT(Votes.voterId) AS totalVote
FROM 
    Politicians
INNER JOIN Votes ON Politicians.id = Votes.politicianId
WHERE grade_current < 9
GROUP BY Politicians.name 
ORDER BY grade_current ASC `
    allQuery(query1)
}
// nomor1()

function nomor2(){
    let query = 
    `SELECT
    totalVote, PoliticianName, Voters.first_name || " " || Voters.last_name as voterName, Voters.gender
    FROM(
        SELECT COUNT(Votes.voterId) AS totalVote, Politicians.name as PoliticianName, Politicians.id
        FROM Politicians
        LEFT JOIN Votes ON Politicians.id = Votes.PoliticianId
        GROUP BY Politicians.name
        ORDER BY totalVote DESC
        LIMIT 3
    ) AS BIGTHREE
        
    INNER JOIN Votes ON Votes.politicianId = BIGTHREE.id
    INNER JOIN Voters ON Votes.voterId = Voters.id
    ORDER BY BIGTHREE.totalVote DESC, PoliticianName`
    
    allQuery(query)   
}

// nomor2()

function nomor3(){
    let query = `
    SELECT 
    COUNT(Votes.voterId) as totalVote, Voters.first_name || " " || Voters.last_name as voterName, Voters.gender, Voters.age
    FROM Voters
    INNER JOIN Votes ON Votes.voterId = Voters.id
    GROUP BY voterName
    HAVING totalVote > 1
    ORDER BY totalVote DESC`

    allQuery(query) 
}

nomor3()


