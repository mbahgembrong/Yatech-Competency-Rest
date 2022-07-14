'use strict'
const express = require('express')
const barang = require('../controllers/barang-controller')
const { verifyToken } = require('../middleware/verify')
const { check, validationResult } = require('express-validator')
const router = express.Router()
const kategoriModel = require('../database/models/index').Kategori
const checkValidationInsert = [
    check('nama').not().isEmpty().withMessage('required value').isLength({ min: 5, max: 50 }),
    check('id_kategori').isNumeric().custom((value, { req, loc, path }) => {
        return kategoriModel.findByPk(req.body.id_kategori).then(kategori => {
            if (!kategori) {
                return Promise.reject("Kategori not found");
            }
        });
    }),
    check('jumlah').isNumeric(),
    check('harga').isNumeric(),
];
const checkValidationUpdate = [
    check('nama').not().isEmpty().withMessage('required value').isLength({ min: 5, max: 50 }),
    check('id_kategori').isNumeric().custom((value, { req, loc, path }) => {
        return kategoriModel.findByPk(req.body.id_kategori).then(kategori => {
            if (!kategori) {
                return Promise.reject("Kategori not found");
            }
        });
    }),
    check('jumlah').isNumeric(),
    check('harga').isNumeric(),
];

router.get(``, [verifyToken], barang.index)
router.post(``, [verifyToken, checkValidationInsert], (req, res) => {
    const errors = validationResult(req);
    (!errors.isEmpty() ? res.status(422).json(errors) : barang.store(req, res))
})
router.post(`/add/:id`, [verifyToken, check('jumlah').not().isEmpty().withMessage('required value').isNumeric()], (req, res) => {
    const errors = validationResult(req);
    (!errors.isEmpty() ? res.status(422).json(errors) : barang.add(req, res))
})
router.post(`/sub/:id`, [verifyToken, check('jumlah').not().isEmpty().withMessage('required value').isNumeric()], (req, res) => {
    const errors = validationResult(req);
    (!errors.isEmpty() ? res.status(422).json(errors) : barang.sub(req, res))
})
router.get(`/:id`, verifyToken, barang.show)
router.put(`/:id`, verifyToken, [verifyToken, checkValidationUpdate.map(check => check.optional({ checkFalsy: true }).escape())], (req, res) => {
    const errors = validationResult(req);
    (!errors.isEmpty() ? res.status(422).json(errors) : barang.update(req, res))
})
router.delete(`/:id`, verifyToken, barang.destroy)

module.exports = router;