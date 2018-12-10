//NO 1
let query1 = `SELECT P.nama, P.location, P.grade_current, COUNT(*) AS TotalVote FROM Politicians P JOIN Votes Vt ON P.id = Vt.politician_id 
GROUP BY P.nama HAVING P.grade_current < 9 ORDER BY P.grade_current ASC`

//NO 2
//TAMPILKAN 3 POLITICIANS YANG MEMILIKI VOTE TERBANYAK DAN SIAPA SAJA YANG MEMILIH DIA
let query2 = `SELECT 
    TotalVote, 
    table_politician.nama,
    table_voter.first_name || " " || table_voter.last_name AS voterName,
    table_voter.gender
    FROM 
        (SELECT * 
        FROM Voters Vr 
        JOIN Votes Vt ON Vr.id = Vt.voter_id) AS table_voter
        JOIN
    (SELECT 
    COUNT(*) AS TotalVote,
    P.nama,
    P.id 
    FROM Politicians P 
    JOIN Votes Vt ON P.id = Vt.politician_id 
    JOIN Voters Vr ON Vt.voter_id = Vr.id
    GROUP BY P.nama ORDER BY TotalVote DESC LIMIT 3) AS table_politician 
ON table_voter.politician_id = table_politician.id 
ORDER BY table_politician.nama DESC, TotalVote DESC`

let query3 = `SELECT COUNT(*) AS totalVote, Vr.first_name || " " || Vr.last_name AS name, Vr.gender, vr.age 
FROM Voters Vr 
JOIN Votes Vt ON Vr.id = Vt.voter_id
GROUP BY Vr.first_name HAVING totalVote > 1
ORDER BY totalVote DESC`

let query4 = `SELECT  COUNT(Votes.politician_id) AS TotalVotes,Voters.first_name||' '||Voters.last_name AS name, gender, age
FROM Voters JOIN Votes ON Voters.Id = Votes.voter_id
GROUP BY Voters.id 
HAVING TotalVotes > 1
ORDER BY TotalVotes DESC`