const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(function() {
  // 1. Menampilkan nama, lokasi, grade dan jumlah vote dari politician yang memiliki grade di bawah 9
  let query1 =
  `
  SELECT name, location, grade_current, count(voterId) AS totalVote FROM Politicians
  JOIN votes ON Politicians.id = Votes.politicianId WHERE grade_current < 9 GROUP BY politicianId
  ORDER BY totalVote;
  `
  db.all(query1, function(err, rows) {
    if (err) {
      console.log(err);
    }
    else {
      console.log(rows);
    }
  })


  // 2. Menampilkan 3 Politicians yang memiliki vote terbanyak dan siapa saja yang memilih Politicians tersebut
  let query2 =
  `
  SELECT totalVote, politicianName, first_name ||" "|| last_name
  AS voterName, gender

  FROM (SELECT Politicians.id AS bestId, Politicians.name AS politicianName, count(voterId) AS totalVote FROM Politicians
  JOIN votes ON Politicians.id = Votes.politicianId GROUP BY politicianId
  ORDER BY totalVote DESC LIMIT 3) AS BEST

  JOIN Votes ON BEST.bestId = Votes.politicianId JOIN Voters
  ON Votes.voterId = Voters.id ORDER BY totalVote DESC;
  `
  db.all(query2, function(err, rows) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('\n');
      console.log(rows);
    }
  })


  // 3. Menampilkan nama orang orang yang melakukan kecurangan
  let query3 =
  `
  SELECT count(voterId) AS totalVote, first_name ||" "|| last_name AS name, gender, age
  FROM Voters JOIN Votes ON Voters.id = Votes.voterId GROUP BY voterId
  HAVING totalVote > 1 ORDER BY totalVote DESC
  `
  db.all(query3, function(err, rows) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('\n');
      console.log(rows);
    }
  })

})


