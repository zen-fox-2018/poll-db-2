const db = require('./dbConnection.js')

let query1 = `
  SELECT name, location, grade_current, COUNT(votesId) AS totalVote
  FROM Politicians
  INNER JOIN Votes ON Politicians.id = Votes.politicianId
  WHERE grade_current < 9
  GROUP BY name
  ORDER BY grade_current
`
// db.all(query1, (err, rows)=> {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(rows)
//   }
// })

let query2 = `
  SELECT totalVote, candidate.name AS politicianName, first_name || " " || last_name AS voterName, gender
  FROM
    (SELECT id, COUNT(*) AS totalVote, name
    FROM Politicians
    INNER JOIN Votes ON Votes.politicianId = Politicians.id
    GROUP BY name
    ORDER BY totalVote DESC
    LIMIT 3) AS candidate
  INNER JOIN Votes ON candidate.id = Votes.politicianId
  INNER JOIN Voters ON Votes.voterId = Voters.id
  ORDER BY totalVote DESC, candidate.name
`

let query3 = `
  SELECT COUNT(Votes.voterId) AS totalVote, first_name || " " || last_name AS name, gender, age
  FROM Voters
  INNER JOIN Votes ON Voters.id = Votes.voterId
  GROUP BY name HAVING totalVote > 1
  ORDER BY totalVote DESC
`

db.all(query3, (err, rows) => {
  if (err) {
    console.log(err)
  } else {
    console.log(rows)
  }
})