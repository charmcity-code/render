const express = require('express');
const router = express.Router();

const { getSales, getSale, createSale, updateSale, deleteSale } = require('../db/sales');

// GET - /api/sales - get all sales
router.get('/', async (req, res) => {
    try {
        const sales = await getSales();
        console.log(sales);
        res.send(sales);
    } catch (err) {
        next(err);
    }
});


// GET - /api/sales/:id - get a single sale
router.get('/:id', async (req, res, next) => {
    try {
        const sale = await getSale(req.params.id);
        res.send(sale);
    } catch (err) {
        next(err);
    }
});

// POST - /api/sales - create a new sale
router.post('/', async (req, res, next) => {
    try {
        const sale = await createSale(req.body);
        const existingSale = await getSale(sale.id);
        if (existingSale) {
            res.send(existingSale);
        } else {
            const newSale = await createSale(sale);
            if (newSale) {
                res.send(newSale);
            } else {
                next({
                    name: 'CreateSaleError',
                    message: 'There was an error creating the sale'
                });
            }
        }
    } catch (err) {
        next(err);
    }
});



// PATCH - /api/sales/:id - update a sale
router.patch('/:id', async (req, res, next) => {
    try {
        const sale = await updateSale(req.params.id, req.body);
        res.send(sale);
    } catch (err) {
        next(err);
    }
});

// DELETE - /api/sales/:id - delete a sale
router.delete('/:id', async (req, res, next) => {
    try {
        const sale = await deleteSale(req.params.id);
        res.send(sale);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
