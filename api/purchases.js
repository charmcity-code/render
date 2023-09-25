const express = require('express');
const router = express.Router();

const { getPurchases, getPurchase, createPurchase, updatePurchase, deletePurchase } = require('../db');

// GET - /api/purchases - get all purchases
router.get('/', async (req, res, next) => {
    try {
        const purchases = await getPurchases();
        res.send(purchases);
    } catch (err) {
        next(err);
    }
});

// GET - /api/purchases/:id - get a single purchase
router.get('/:id', async (req, res, next) => {
    try {
        const purchase = await getPurchase(req.params.id);
        res.send(purchase);
    } catch (err) {
        next(err);
    }
});

// POST - /api/purchases - create a new purchase
router.post('/', async (req, res, next) => {
    try {
        // include date, amount, description in req.body
        const purchase = await createPurchase(req.body);

        const existingPurchase = await getPurchase(purchase.id);

        if (existingPurchase) {
            res.send(existingPurchase);
        } else {
            const newPurchase = await createPurchase(purchase);
            if (newPurchase) {
                res.send(newPurchase);
            } else {
                next({
                    name: 'CreatePurchaseError',
                    message: 'There was an error creating the purchase'
                });
            }
        }

    } catch (err) {
        next(err);
    }
});

// PATCH - /api/purchases/:id - update a purchase
router.patch('/:id', async (req, res, next) => {
    try {
        const purchase = await updatePurchase(req.params.id, req.body);
        res.send(purchase);
    } catch (err) {
        next(err);
    }
});

// DELETE - /api/purchases/:id - delete a purchase
router.delete('/:id', async (req, res, next) => {
    try {
        const purchase = await deletePurchase(req.params.id);
        res.send(purchase);
    } catch (err) {
        next(err);
    }
});

module.exports = router;