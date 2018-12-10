const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

function nomorSatu(){
  db.all(`SELECT
            Politicians.name,
            Politicians.location,
            Politicians.grade_current,
            COUNT(Votes.PoliticianId) AS totalVote
          FROM votes
          LEFT JOIN Politicians ON Votes.politicianId = Politicians.id
          WHERE grade_current < 9
          GROUP BY Politicians.id
          ;`,
    function(errSatu, dataSatu) {
      if (errSatu) {
        console.log('err satu :', errSatu);
      }
      else {
        console.log('nomor 1');
        console.log(dataSatu);
      }
    })
}

function nomorDua() {
  db.all(` SELECT
            countVotes.totalVote,
            politicians.name AS politicianName,
            voters.first_name || ' ' || voters.last_name AS voterName,
            voters.gender
          FROM voters,
               votes,
               politicians,
               (SELECT politicianId,
                       COUNT(politicianId) AS totalVote
                FROM votes
                GROUP BY politicianId
                ORDER BY totalVote DESC LIMIT 3) AS countVotes
          WHERE votes.politicianId = countVotes.politicianId
                AND
                politicians.id = countVotes.politicianId
                AND
                votes.voterId = voters.id
          ORDER BY countVotes.totalVote DESC;`
    ,function(errDua, dataDua) {
      if (errDua) {
        console.log('err dua :', errDua);
      }
      else {
        console.log('nomor 2');
        console.log(dataDua);
      }
    })
}

function nomorTiga(){
  db.all(`SELECT
            COUNT(Votes.VoterId) AS totalVote,
            Voters.first_name || ' ' || Voters.last_name AS name,
            Voters.gender,
            Voters.age
          FROM votes
          LEFT JOIN Voters ON Votes.voterId = Voters.id
          GROUP BY Voters.id
          HAVING totalVote > 1
          ORDER BY totalVote DESC
          ;`,
    function(errTiga, dataTiga) {
      if (errTiga) {
        console.log('err Tiga :', errTiga);
      }
      else {
        console.log('nomor 3');
        console.log(dataTiga);
      }
    })
}

nomorSatu();
nomorDua();
nomorTiga();

db.close();
