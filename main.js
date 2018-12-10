const db = require('./db')
const Table = require('cli-table')
function number1() {
    var table = new Table({
        chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
               , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
               , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
               , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
      });
       let q = `SELECT name, location, grade_current, COUNT(votes.politicianId) 
       FROM Politicians 
       LEFT JOIN Votes ON Politicians.id = politicianId
       WHERE grade_current < 9
       GROUP BY name
       ORDER BY grade_current ASC`
      db.all(q,function(err,rows) {
          if (err) {
              console.log(err)
          } else {
              let header = Object.keys(rows[0])
              table.push(
                  header 
              );
              rows.forEach(data => {
                table.push(Object.values(data))
              })
              console.log(table.toString());
            //   console.log(rows)
          }
      })
}

function number2() {
    var table = new Table({
        chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
               , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
               , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
               , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
      });
       let q = `SELECT  * FROM (
        SELECT COUNT(politicianId) AS totalVote , Politicians.name AS politicianName, politicianId 
        FROM Politicians 
        JOIN Votes 
            ON Politicians.id = Votes.politicianId
        GROUP BY Politicians.name
        ORDER BY totalVote DESC
        LIMIT 3) AS list_politician 
        JOIN 
            (SELECT Voters.first_name || " " || Voters.last_name AS VoterName, gender, politicianId 
            FROM Voters
            JOIN Votes 
            ON Voters.id = Votes.voterId
            GROUP BY VoterName
            ) 
        AS list_Voters 
            ON list_politician.politicianId = list_Voters.politicianId
        `
      db.all(q,function(err,rows) {
          if (err) {
              console.log(err)
          } else {
              let header = Object.keys(rows[0])
              table.push(
                  header 
              );
              rows.forEach(data => {
                table.push(Object.values(data))
              })
              console.log(table.toString());
            //   console.log(rows)
          }
      })
}

function number3() {
    var table = new Table({
        chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
               , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
               , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
               , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
      });
       let q = `SELECT * FROM (
        SELECT  COUNT(votes.voterId) As totalVote, Voters.first_name || " " || Voters.last_name AS VoterName, gender, age
        FROM Voters
        JOIN Votes 
            ON Voters.id = Votes.voterId
        GROUP BY VoterName) AS  voters_list
        WHERE voters_list.totalVote > 1
        ORDER BY totalVote DESC`
      db.all(q,function(err,rows) {
          if (err) {
              console.log(err)
          } else {
              let header = Object.keys(rows[0])
              table.push(
                  header 
              );
              rows.forEach(data => {
                table.push(Object.values(data))
              })
              console.log(table.toString());
            //   console.log(rows)
          }
      })
}

db.serialize(function () {
    number1()
    number2()
    number3()
})