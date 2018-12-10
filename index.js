const db = require('./db')

let query1 = `
SELECT name, location, grade_current
FROM Politicians
WHERE Politicians.grade_current < 9
ORDER BY Politicians.grade_current`

db.all(query1, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        // console.log(data);
    }
})

let query2 = `
SELECT top3.totalVote, name AS politicianName, (first_name || ' ' || last_name) AS voterName, Voters.gender
FROM (
    SELECT COUNT(*) AS totalVote, name, Politicians.id
    FROM Votes
    JOIN Politicians ON Votes.PoliticianId = Politicians.id
	GROUP BY name
    ORDER BY totalVote DESC
    LIMIT 3) AS top3
JOIN Votes ON top3.id = Votes.PoliticianId
JOIN Voters ON Voters.id = Votes.VoterId
GROUP BY Votes.VoterId
ORDER BY top3.totalVote DESC, politicianName`

db.all(query2, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        // console.log(data);
    }
})

let query3 = `
SELECT COUNT(*) AS totalVote, (first_name || ' ' || last_name) AS name, gender, age
FROM Votes
JOIN Voters ON Votes.VoterId = Voters.id
GROUP BY Voters.id
HAVING totalVote > 1
ORDER BY totalVote DESC`

db.all(query3, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
})