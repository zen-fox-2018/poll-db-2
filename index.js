
const db = require("./db");

db.serialize(function() {
    let lowerThanNine = `SELECT name, location, grade_current, COUNT(Votes.voterId) AS totalVotes FROM Politicians
                  JOIN Votes ON Politicians.id = Votes.politicianId
                  WHERE grade_current < 9
                  GROUP BY politicianId
                  ORDER BY totalVotes`

    db.all(lowerThanNine, function(err, data) {
        if(err) {
            console.log(err)
        } else {
            console.log(data)
        }
    });

    // let manyVotes = `SELECT totalVotes, name AS `;

    // db.all(manyVotes, function(err, data) {
    //     if(err) {
    //         console.log(err)
    //     } else {
    //         console.log(data)
    //     }
    // })

    let fraud = `SELECT (first_name ||" "|| last_name) AS name, age, COUNT(Votes.voterId) AS totalVotes 
                 FROM Votes
                 JOIN Voters ON Votes.voterId = Voters.id
                 GROUP BY voterId
                 HAVING totalVotes > 1
                 ORDER BY totalVotes DESC`

    db.all(fraud, function(err,data) {
        if(err) {
            console.log(err)
        } else {
            console.log(data)
        }
    })
})