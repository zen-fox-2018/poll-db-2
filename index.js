const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        return console.log(err.message);
    } else {
        console.log('Setup database ...')
    }
});


let num1 =
`SELECT Politicians.name, Politicians.location, Politicians.grade_current, COUNT(*) as totalVote
FROM Politicians
INNER JOIN Votes ON Politicians.politicianId = Votes.politicianId
WHERE Politicians.grade_current < 9
GROUP BY Politicians.name
ORDER BY totalVote ASC;`;

db.all(num1, (err, data) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log(data);
    }
});


let num2 =
`SELECT
totalVote, PoliticianName, Voters.first_name ||' '|| Voters.last_name as VotersName, Voters.gender
FROM
(SELECT COUNT(*) as totalVote, Politicians.name as PoliticianName, Politicians.politicianId
FROM Politicians
LEFT JOIN Votes ON Politicians.politicianId = Votes.politicianId
GROUP BY Politicians.name
ORDER BY totalVote DESC
LIMIT 3) as filter
INNER JOIN Votes ON Votes.politicianId = filter.politicianId
INNER JOIN Voters ON Votes.voterId = Voters.voterId
ORDER BY filter.totalVote DESC, PoliticianName`

db.all(num2, (err, data) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log(data);
    }
});



let num3 =
`SELECT COUNT(*) as totalVote, Voters.first_name ||' '|| Voters.last_name as Voters.name, Voters.gender, Voters.age
FROM Voters
INNER JOIN Votes ON Voters.voterId = Votes.voterId
GROUP BY name
HAVING totalVote > 1
ORDER BY totalVote DESC;
`;

db.all(num3, (err, data) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log(data);
    }
});

