const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

function dbAll(query) {
  db.all(query, (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      console.log(rows);
      console.log('\n');
    }
  })
}

db.serialize(() => {
  //1. politicians with grade below 9
  //display name, location, grade_current and totalVote
  function highestVotedPoliticians() {
    dbAll(`SELECT name, location, grade_current, COUNT(Votes.PoliticiansId) AS totalVote
    FROM Politicians
    INNER JOIN Votes
      ON id = Votes.politiciansId
    WHERE grade_current < 9
    GROUP BY Politicians.name
    ORDER BY Politicians.grade_current
    ;`)
  }

  //2. display 3 politions with HIGHEST VOTE and display voters
  //display name, totalVote, fullName and gender voters
  function mostVotedPolAndTheVoters() {
    dbAll(`SELECT 
          totalVote,
          rankedPoliticians.name AS politicianName,
          Voters.first_name || " " || Voters.last_name AS voterName,
          Voters.gender
        FROM (SELECT 
                COUNT(VotersId) AS totalVote, 
                Politicians.name,
                Politicians.id
              FROM Votes
              INNER JOIN Politicians
                ON politiciansId = Politicians.id
              GROUP BY Politicians.name
              ORDER BY totalVote DESC LIMIT 3) AS rankedPoliticians
        INNER JOIN Votes ON rankedPoliticians.id = Votes.politiciansId
        INNER JOIN Voters ON Votes.votersId = Voters.id
        ORDER BY totalVote DESC, politicianName
        ;`)
  }

  function cheatingVoters() {
    dbAll(`SELECT 
            COUNT(Voters.id) AS totalVote,
            Voters.first_name || " " || Voters.last_name AS name,
            Voters.gender,
            Voters.age
          FROM Votes
          INNER JOIN Voters
            ON votersId = Voters.id
          GROUP BY name
          HAVING totalVote > 1
          ORDER BY totalVote DESC
          ;`)
  }

  highestVotedPoliticians();
  mostVotedPolAndTheVoters();
  cheatingVoters();
}) 
