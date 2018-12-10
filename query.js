const db = require('./db.js')
const Table = require('cli-table')

const table = new Table({
    chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
    , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
    , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
    , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
});

function challenge1() {
    let query = 
    `
    SELECT Politicians.name, Politicians.location, Politicians.grade, count(Votes.voterId) 
    AS totalVote from Politicians
    JOIN votes
    ON Politicians.id = votes.politicianId
    GROUP BY Politicians.name
    HAVING grade < 9
    ORDER BY totalVote ASC
    `
    db.all(query, function(err, rows) {
        if(err) {
            console.log(err)
        } else {
            let header = Object.keys(rows[0])
            table.push(header)
            for(let i in rows) {
                table.push(Object.values(rows[i]))
            }
        }
    console.log(table.toString())
    })
}

function challenge2() {
    let query = 
    `
    SELECT totalVote, politicianName, first_name || ' '|| last_name AS voterName ,gender 
    FROM
        (SELECT COUNT(*) AS totalVote, name AS politicianName , politicianId 
         FROM Politicians 
         JOIN Votes ON Politicians.id = Votes.politicianId
         GROUP BY politicianName
         ORDER BY totalVote desc
         LIMIT 3) 
         AS infoCandidates
    JOIN 
        (SELECT * FROM Voters
         JOIN Votes ON Voters.id = Votes.voterId) AS infoVoters 
         ON infoCandidates.politicianId = infoVoters.politicianId
    ORDER BY 
        totalVote desc, 
        politicianName
    `
    db.all(query, function(err, rows) {
        if(err) {
            console.log(err)
        } else {
            let header = Object.keys(rows[0])
            table.push(header)
            for(let i in rows) {
                table.push(Object.values(rows[i]))
            }
        }
    console.log(table.toString())
    })
}

function challenge3() {
    let query = 
    `
    select 
	COUNT(*) AS totalVote, 
	Voters.first_name || ' ' || Voters.last_name AS name,
	Voters.gender, Voters.age
from Voters 
join votes
on Voters.id = votes.voterId
GROUP BY Voters.first_name
HAVING totalVote > 1
ORDER BY totalVote DESC
    `
    db.all(query, function(err, rows) {
        if(err) {
            console.log(err)
        } else {
            let header = Object.keys(rows[0])
            table.push(header)
            for(let i in rows) {
                table.push(Object.values(rows[i]))
            }
        }
    console.log(table.toString())
    })
}

challenge1()
challenge2()
challenge3()
