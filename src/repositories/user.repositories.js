import db from '../config/database.js'

db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        avatar TEXT
    )
`);

function createUserRepository(newUser) {
    return new Promise((resolve, reject) => {
        const {username, email, password, avatar } = newUser;
        db.run (
            `
                INSERT INTO users (username, email, password, avatar)
                VALUES (?, ?, ?, ?)
            `,
            [username, email, password, avatar],
            (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve({ id: this.lastID, ...newUser })
                }
            }
        );
    });
}

function findUserByEmailRepository(email) {
    return new Promise((res, rej) => {
        db.get(
            `
            SELECT id, username, email, avatar
            FROM users
            WHERE email = ?
            `,
            [email],
            (err, row) => {
                if (err) {
                    rej(err);
                } else {
                    res(row);
                }
            }
        );
    })
}

function findUserByIdRepository(id) {
    return new Promise((resolve, reject) => {
        db.get(
            `
            SELECT id, username, email, avatar
            FROM users
            WHERE id = ?
            `,
            [id],
            (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            }
        );
    });
}

 function findAllUserRepository() {
    return new Promise((resolve, reject) => {
        db.all(
            `
            SELECT id, username, email, avatar FROM users
            `,
            [],
            (err, rows) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            }
        )
    });
 }

function updateUserRepository(id, user) {
    return new Promise((resolve, reject) => {
        const fields = ["username", "email", "password", "avatar"];
        let query = "UPDATE users SET";
        const values = [];

        fields.forEach((field) => {
            if(user[field] !== undefined) {
                query += ` ${field} = ?,`;
                values.push(user[field]);
            }
        });

        query = query.slice(0, -1);

        query += " WHERE id =?"
        values.push(id);

        db.run(query, values, (err) => {
            if(err) {
                reject(err);
            } else {
                resolve({ ...user, id });
            }
        })
    });
}

async function deleteUserRepository(id) {
    return new Promise((resolve, reject) => {
        db.run(
            `
            DELETE FROM users
            WHERE id = ?
            `, [id], (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve({ message: "User deleted successfully", id })
                }
            }
        );
    });
}

export default {
    createUserRepository,
    findUserByEmailRepository,
    findUserByIdRepository,
    findAllUserRepository,
    updateUserRepository,
    deleteUserRepository
};