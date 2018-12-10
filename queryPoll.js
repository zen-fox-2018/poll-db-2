const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./politiciansPoll.db', (err) => {
    if (err) throw console.error(err.message)
});

function exposeVoterFraud() {
    const query = `
                  SELECT 
                    Politicians.name,
                    Politicians.location,
                    Politicians.grade_current,
                    COUNT(Votes.politicianId) AS totalVote
                  FROM Politicians
                  INNER JOIN Votes
                    ON Politicians.id = Votes.politicianId
                  WHERE Politicians.grade_current < 9
                  GROUP BY Politicians.name
                  ORDER BY totalVote ASC;
                  `

    db.all(query, (err, rows) => {
        if (err) {
            console.log(err)
        } else {
            console.log(rows)
        }
    })          
}

// exposeVoterFraud()

function exposeFraud2() {
    const query = `
                  SELECT 
                    totalVote, 
                    politicianName,
                    Voters.first_name || " " || Voters.last_name AS voterName,
                    Voters.gender
                  FROM (
                        SELECT COUNT(Votes.voterId) AS totalVote, Politicians.name AS politicianName, Politicians.id
                        FROM Politicians
                        LEFT JOIN Votes
                            ON Votes.politicianId = Politicians.id
                        GROUP BY Politicians.name
                        ORDER BY totalVote DESC 
                        LIMIT 3
                        ) AS Highest_Vote
                  INNER JOIN Votes
                    ON Votes.politicianId = Highest_Vote.id
                  INNER JOIN Voters
                    ON Votes.voterId = Voters.id
                  ORDER BY Highest_Vote.totalVote DESC, politicianName;
                  `

    db.all(query, function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            console.log(rows)
        }
    }) 
}

exposeFraud2()

function exposeFraud3() {
    const query = `
                  SELECT 
                    COUNT(Votes.voterId) AS totalVote,
                    Voters.first_name || " " || Voters.last_name AS name,
                    Voters.gender,
                    Voters.age
                  FROM Voters
                  INNER JOIN Votes
                    ON Votes.voterId = Voters.id
                  GROUP BY name
                  HAVING totalVote > 1
                  ORDER BY totalVote DESC;
                  `

    db.all(query, (err, rows) => {
        if (err) {
            console.log(err)
        } else {
            console.log(rows)
        }
    }) 
}

// exposeFraud3()