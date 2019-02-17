const db = require('./db.js');
// const Table = require('cli-table');
class Operations {
  static numberOne() {
    const query = `SELECT politicians.name, politicians.location, politicians.grade_current, COUNT(votes.politicianId) AS totalVote FROM politicians, votes WHERE votes.politicianId = politicians.id AND politicians.grade_current < 9 GROUP BY votes.politicianId ORDER BY politicians.grade_current ASC;`;
    db.all(query, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    })
  }

  static numberTwo() {
    // const query = `
    //               WITH countVotes AS (
    //               SELECT politicianId,
    //                 COUNT(politicianId) AS 'totalVote'
    //               FROM votes
    //               GROUP BY politicianId
    //               ORDER BY totalVote DESC
    //               LIMIT 3
    //               )
    //               SELECT countVotes.totalVote, politicians.name AS politicianName, voters.first_name || ' ' || voters.last_name AS voterName, voters.gender
    //               FROM countVotes, voters, votes, politicians
    //               WHERE countVotes.politicianId = votes.politicianId AND countVotes.politicianId = politicians.id AND votes.voterId = voters.id
    //               ORDER BY countVotes.totalVote DESC;
    //               `;
    const query = `
              SELECT top.totalVote, politicians.name AS politicianName, voters.first_name || ' ' || voters.last_name AS voterName, voters.gender
              FROM
                  (SELECT politicianId,
                    COUNT(politicianId) AS 'totalVote'
                  FROM votes
                  GROUP BY politicianId
                  ORDER BY totalVote DESC
                  LIMIT 3) AS top
              JOIN votes
                  ON top.politicianId = votes.politicianId
              JOIN politicians
                  ON top.politicianId = politicians.id
              JOIN voters
                  ON votes.voterId = voters.id
              ORDER BY top.totalVote DESC;
                  `;
    db.all(query, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    })
  }

  static numberThree() {
    const query = `
    SELECT COUNT(votes.voterId) AS totalVote, voters.first_name || ' ' || voters.last_name AS name, voters.gender, voters.age
    FROM votes, voters
    WHERE votes.voterId = voters.id
    GROUP BY votes.voterId HAVING totalVote > 1
    ORDER BY totalVote DESC`;
    db.all(query, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    })
  }
}

module.exports = Operations;
