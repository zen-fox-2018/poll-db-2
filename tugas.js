const db = require('./datab')
const Table = require('cli-table')
function satu() {
  let table = new Table({
    chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
           , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
           , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
           , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
  });
  db.all(`SELECT name, location, grade_current, COUNT(*) AS totalVotes FROM Politicians
  JOIN Votes ON Politicians.id = Votes.politicianId
  GROUP BY name
  HAVING grade_current < 9
  ORDER BY grade_current asc` , (err, rows) => {
    if(err){
      console.log(err)
    } else {
      let header = Object.keys(rows[0])
      table.push(
          header 
      );
      for (let i in rows) {
        table.push(Object.values(rows[i]))
      }
    }
    console.log(table.toString())
  })
}

function dua() {
  let table = new Table({
    chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
           , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
           , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
           , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
  });
  db.all(`SELECT totalVote, politicianName, first_name || ' '|| last_name AS voterName , gender FROM (SELECT COUNT(*) AS totalVote, name AS politicianName , politicianId FROM Politicians 
  JOIN Votes ON Politicians.id = Votes.politicianId
  GROUP BY politicianName
  ORDER BY totalVote desc
  LIMIT 3) AS table1 
  JOIN (SELECT * FROM Voters
  JOIN Votes ON Voters.id = Votes.voterId) AS table2 ON table1.politicianId = table2.politicianId
  ORDER BY totalVote desc, politicianName` , (err, rows) => {
    if(err){
      console.log(err)
    } else {
      let header = Object.keys(rows[0])
      table.push(
          header 
      );
      for (let i in rows) {
        table.push(Object.values(rows[i]))
      }
    }
    console.log(table.toString())
  })
}


function tiga() {
  let table = new Table({
    chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
           , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
           , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
           , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
  });
  db.all(`SELECT COUNT(*) AS totalVote ,first_name || ' ' || last_name AS name, gender , age FROM Voters
  JOIN Votes ON Voters.id = Votes.voterId
  GROUP BY name
  HAVING totalVote > 1
  ORDER BY totalVote desc` , (err, rows) => {
    if(err){
      console.log(err)
    } else {
      let header = Object.keys(rows[0])
      table.push(
          header 
      );
      for (let i in rows) {
        table.push(Object.values(rows[i]))
      }
    }
    console.log(table.toString())
  })
}

satu()
dua()
tiga()