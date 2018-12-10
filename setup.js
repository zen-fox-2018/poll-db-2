const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./politiciansPoll.db', (err) => {
    if (err) throw console.error(err.message)
});

db.serialize(function() {
   const qPoliticiansTable = `CREATE TABLE IF NOT EXISTS Politicians (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      party varchar(5),
      location varchar(10),
      grade_current REAL
   );`

   db.run(qPoliticiansTable, (err, politiciansData) => {
       if (err) throw err
       console.log(`Add Politicians Table Succeed`)
   })

   const qVoters = `CREATE TABLE  IF NOT EXISTS Voters (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       first_name TEXT,
       last_name TEXT,
       gender varchar(10),
       age INTEGER
   );`

   db.run(qVoters, (err, votersData) => {
    if (err) throw err
    console.log(`Add votersDataTable Succeed`)
   })

   const qVotes = `CREATE TABLE IF NOT EXISTS Votes (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       voterId INTEGER,
       politicianId INTEGER,
       FOREIGN KEY (voterId) REFERENCES Voters(id),
       FOREIGN KEY (politicianId) REFERENCES Politicians(id)
   );`

   db.run(qVotes, (err, votesData) => {
    if (err) throw err
    console.log(`Adding votesData Table Succeed`)
   })
});

module.exports = db