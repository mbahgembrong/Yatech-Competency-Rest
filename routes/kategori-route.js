'use strict'
const express = require('express')
const kategori = require('../controllers/kategori-controller')
const { check, validationResult } = require('express-validator')
const { verifyToken } = require('../middleware/verify')
const router = express.Router()
const checkValidation = [
    check('nama').isLength({ min: 5, max: 50 }),
];
router.get(``, verifyToken, kategori.index)
router.post(``, [verifyToken, checkValidation], (req, res) => {
    const errors = validationResult(req);
    (!errors.isEmpty() ? res.status(422).json(errors) : kategori.store(req, res))
})
router.get(`/:id`, verifyToken, kategori.show)
router.put(`/:id`, [verifyToken, checkValidation],  (req, res) => {
    const errors = validationResult(req);
    (!errors.isEmpty() ? res.status(422).json(errors) : kategori.store(req, res))
})
router.delete(`/:id`, verifyToken, kategori.destroy)

module.exports = router;