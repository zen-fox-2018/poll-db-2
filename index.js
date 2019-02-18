var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.db');
function showResult(query) {
    db.all(query, function(err, rows) {
        if (err) {
            console.log(err)
        } else {
            console.log(rows)
        }
    })
}
function findVote() {
    let query = `
        SELECT 
            Politicians.name,
            Politicians.location,
            Politicians.grade_current,
            COUNT(Votes.politicianId) AS totalVote
        FROM Politicians
        INNER JOIN Votes
        ON Votes.politicianId = Politicians.id
        WHERE Politicians.grade_current < 9
        GROUP BY Politicians.name
        ORDER BY Politicians.grade_current`
    showResult(query)
}
findVote()

function whoVotesTheMostVoted() {
    let query = `
        SELECT 
            topPolitician.totalVote,
            topPolitician.politicianName,
            Voters.first_name||" "||Voters.last_name AS voterName,
            Voters.gender
        FROM 
            (
            SELECT 
                COUNT(Votes.politicianId) AS totalVote,
                Politicians.name AS politicianName,
                Politicians.id 
            FROM Votes
            JOIN Politicians
            ON Votes.politicianId = Politicians.id
            GROUP BY Votes.politicianId
            ORDER BY totalVote DESC
            LIMIT 3
            ) AS topPolitician
        JOIN Votes
        JOIN Voters
        ON Votes.politicianId = topPolitician.id
            AND Voters.id = Votes.voterId
        GROUP BY voterName
        ORDER BY topPolitician.totalVote DESC, topPolitician.politicianName
        `    
    showResult(query)
}
whoVotesTheMostVoted();


function whoCheated() {
    let query = `
        SELECT 
            COUNT(Votes.voterId) AS totalVote,
            Voters.first_name||" "||Voters.last_name AS name,
            Voters.gender,
            Voters.age
        FROM Voters
        JOIN Votes
            ON Votes.voterId = Voters.id
        GROUP BY name
        HAVING totalVote > 1
        ORDER BY totalVote DESC
        `
    showResult(query)
}
whoCheated()