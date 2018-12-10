const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db')

db.serialize(()=>{

    db.all(`SELECT Politicians.name, Politicians.Location, Politicians.grade_current, COUNT(*) AS totalVote
            FROM Politicians
            JOIN 'Politicians-Voters'
            ON Politicians.id = 'Politicians-Voters'.Politicians_id
            WHERE Politicians.grade_current < 9
            GROUP BY Politicians.name
            ORDER BY totalVote ASC;`,
        (err,data)=> {
        if(err) throw err
        else console.log(data);
        
    })

    db.all(`SELECT  Top.totalVote, Top.name , (Voters.first_name || ' ' || Voters.last_name ) AS voterName, Voters.gender
                FROM (SELECT Politicians.name,COUNT(*) AS totalVote, Politicians.id
                        FROM 'Politicians-Voters'
                        JOIN Voters
                        ON Voters.id = 'Politicians-Voters'.Voters_id
                        JOIN Politicians
                        ON Politicians.id = 'Politicians-Voters'.Politicians_id
                        GROUP BY Politicians.name
                        ORDER BY totalVote DESC LIMIT 3) AS Top
                JOIN 'Politicians-Voters' 
                ON 'Politicians-Voters'.Politicians_id = Top.id
                JOIN Voters
                ON Voters.id = 'Politicians-Voters'.Voters_id
                ORDER BY Top.totalVote DESC;`,
        (err,data)=> {
            if(err) throw err
            else console.log(data);
            
        })
    
    db.all(`SELECT COUNT(*) AS totalVote , (Voters.first_name || ' ' || Voters.last_name ) AS name, Voters.gender, Voters.age
                FROM Voters
                JOIN 'Politicians-Voters'
                ON Voters.id = 'Politicians-Voters'.Voters_id 
              
                GROUP BY Voters.id HAVING totalVote > 1 
                ORDER BY totalVote DESC;`, 
        (err,data)=> {
            if(err) throw err
            else console.log(data);
            
        })
})

