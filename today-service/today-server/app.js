const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

let credentials = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
let connection = mysql.createConnection(credentials);
connection.connect();

function rowToObject(row){
    return{
        year: row.year,
        month: row.month,
        day: row.day,
        message: row.message
    };
}

app.get('/memories/:month/:day', (req, res) => {
    const query = 'SELECT year, month, day, message, id FROM memory WHERE is_deleted = 0 AND month = ? AND day = ? ORDER BY year DESC, updated_at DESC';
    const params = [req.params.month, req.params.day];
    connection.query(query, params, (error, rows) => {
        res.send({
            ok: true,
            memories: rows.map(rowToObject),
        });
    });
});

app.post('/memories', (req, res) => {
    const query = 'INSERT INTO memory(year, month, day, message) VALUES(?, ?, ?, ?)';
    const params = [req.body.year, req.body.month, req.body.day, req.body.message];
    connection.query(query, params, (error, result) => {
        res.send({
            ok: true,
            id: result.insertId
        });
    });
});

app.patch('/memories/:id', (req, res) => {
    const query = 'UPDATE memory SET year = ?, month = ?, day = ?, message = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
    const params = [req.body.year, req.body.month, req.body.day, req.body.message, req.params.id];
    connection.query(query, params, (error, result) => {
        res.send({
            ok: true,
        });
    });
});

app.delete('/memories/:id', (req, res) => {
    const query = 'UPDATE memory SET is_deleted = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
    const params = [req.params.id];
    connection.query(query, params, (error, result) => {
        res.send({
            ok: true,
        });
    });
});

const port = 3443;
app.listen(port, () => {
    console.log(`We're live on port ${port}!`);
});