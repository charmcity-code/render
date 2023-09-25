const client = require('./client');
const util = require('./util');

// GET - /api/purchases - get all purchases
async function getPurchases() {
    try {
        const { rows } = await client.query('SELECT * FROM purchases');
        return rows;
    } catch (err) {
        throw err;
    }
}

// GET - /api/purchases/:id - get a single purchase
async function getPurchase(id) {
    try {
        const { rows } = await client.query('SELECT * FROM purchases WHERE id=$1', [id]);
        return rows[0];
    } catch (err) {
        throw err;
    }
}


// POST - /api/purchases - create a new purchase
async function createPurchase(body) {
    try {
        const { rows: [purchase] } = await client.query('INSERT INTO purchases (date, amount, description) VALUES ($1, $2, $3) RETURNING *', [body.date, body.amount, body.description]);
        return purchase;
    } catch (err) {
        throw err;
    }
}

// PUT - /api/purchases/:id - update a purchase
async function updatePurchase(id, fields) {
    try {
        const toUpdate = {}
        for (let column in fields) {
            if (fields[column] !== undefined) toUpdate[column] = fields[column];
        }
        let purchase;
        console.log("toUpdate", toUpdate);

        if (util.dbFields(toUpdate).insert.length > 0) {
            const { rows } = await client.query(`
            UPDATE purchases
            SET ${util.dbFields(toUpdate).insert}
            WHERE id=${id}
            RETURNING *;
          `, Object.values(toUpdate));
            purchase = rows[0];
        }

        return purchase;
    } catch (error) {
        throw error
    }
}


// DELETE - /api/purchases/:id - delete a purchase
async function deletePurchase(id) {
    try {
        const { rows } = await client.query('DELETE FROM purchases WHERE id=$1 RETURNING *', [id]);
        return rows[0];
    } catch (err) {
        throw err
    }
}

module.exports = {
    getPurchases,
    getPurchase,
    createPurchase,
    updatePurchase,
    deletePurchase
};
