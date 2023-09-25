const client = require('./client');
const util = require('./util');

// GET - /api/sales - get all sales
async function getSales() {
    try {
        const { rows } = await client.query('SELECT * FROM sales');
        return rows;
    } catch (err) {
        throw err;
    }
}

// GET - /api/sales/:id - get a single sale
async function getSale(id) {
    try {
        const { rows } = await client.query('SELECT * FROM sales WHERE id=$1', [id]);
        return rows[0];
    } catch (err) {
        throw err;
    }
}

// POST - /api/sales - create a new sale
async function createSale(body) {
    try {
        const { rows: [sale] } = await client.query('INSERT INTO sales (date, amount, description) VALUES ($1, $2, $3) RETURNING *', [body.date, body.amount, body.description]);
        return sale;
    } catch (err) {
        throw err;
    }
}


// PUT - /api/sales/:id - update a sale
async function updateSale(id, fields) {
    try {
        const toUpdate = {}
        for (let column in fields) {
            if (fields[column] !== undefined) toUpdate[column] = fields[column];
        }
        let sale;
        console.log("toUpdate", toUpdate);

        if (util.dbFields(toUpdate).insert.length > 0) {
            const { rows } = await client.query(`
            UPDATE sales
            SET ${util.dbFields(toUpdate).insert}
            WHERE id=${id}
            RETURNING *;
            `, Object.values(toUpdate));
            sale = rows[0];
        }

        return sale;
    } catch (error) {
        throw error
    }
}


// DELETE - /api/sales/:id - delete a sale
async function deleteSale(id) {
    try {
        const { rows: [sale] } = await client.query('DELETE FROM sales WHERE id=$1 RETURNING *', [id]);
        return sale;
    } catch (err) {
        throw err;
    }
}
 
module.exports = {
    getSales,
    getSale,
    createSale,
    updateSale,
    deleteSale
};
