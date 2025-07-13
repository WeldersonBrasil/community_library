import sqlite from 'sqlite3';

const db = new sqlite.Database('library_db.sqlite', (err) => {
  if (err) {
    console.error('Error ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado com sucesso ao banco de dados SQLite.');
  }
})

export default db;