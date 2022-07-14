'use strict'
const express = require('express')
const router = express()
const auth = require('./auth-route')
const kategori = require('./kategori-route')
const barang = require('./barang-route')

// router.get(`/api/v1/`, (_req, res) => {
//     res.json({
//         "message": "Welcome to restfullapi"
//     })
// })
router.use(`/api/v1/auth`, auth)
router.use('/api/v1/kategori', kategori)
router.use('/api/v1/barang', barang)

module.exports = router