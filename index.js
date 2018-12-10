//const database = require('./database.db')
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const db =  new sqlite3.Database('database.db')

db.serialize(function(){
    const queryGrade = `SELECT nama, location, grade_current, COUNT (*) AS totalVote FROM Politicians
        INNER JOIN Votes
        ON Politicians.id = Votes.Politicians_id      
        WHERE grade_current < 9      
        GROUP BY nama
        ORDER BY totalVote ASC`

        db.all(queryGrade,function(err,data){
            if(err){
                console.log(err)
            }else{
                console.log(data)
            }
        })

    const queryVoter = `SELECT listPoliticians.totalVoter, listPoliticians.nama, (Voters.firstName||' '||Voters.lastName) AS voterName, Voters.gender  FROM
            (SELECT COUNT(nama) AS totalVoter, Politicians.nama, Politicians.id FROM Politicians
            INNER JOIN Votes ON Politicians.id = Votes.Politicians_id
            GROUP BY nama
            ORDER BY totalVoter DESC
            LIMIT 3) AS listPoliticians
            INNER JOIN Votes ON Votes.Politicians_id = listPoliticians.id
            INNER JOIN Voters ON Votes.Voter_id = Voters.id
            ORDER BY listPoliticians.totalVoter DESC`
            

        db.all(queryVoter,function(err,data){
            if(err){
                console.log(err)
            }else{
                console.log(data)
            }
        })

    const queryFraud = `SELECT COUNT (*) AS totalVote, (voters.firstName ||' '||voters.lastName) AS fullname FROM Voters
                INNER JOIN Votes ON Voters.id = Votes.Voter_id
                GROUP BY fullname
                HAVING totalVote > 1 
                ORDER BY totalVote DESC;            
                `
                 db.all(queryFraud,function(err,data){
                    if(err){
                        console.log(err)
                    }else{
                        console.log(data)
                    }
                })
})