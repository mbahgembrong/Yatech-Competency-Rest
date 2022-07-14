const db = require("../database/models")
const Barang = db.Barang;
const DetailLaporanBarang = db.DetailLaporanBarang;
const Kategori = db.Kategori;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const store = async (req, res) => {
    try {
        const save = await Barang.create(req.body)
        res.json(save).status(200)
    } catch (error) {
        res.json(error).status(422)
    }
}

const add = async (req, res) => {
    Barang.findByPk(req.params.id, {
        include: [{
            model: Kategori,
        }],
    }).then((emp) => {
        if (emp) {
            emp.update({
                jumlah: emp.jumlah + req.body.jumlah,
            })
            msg = emp
            DetailLaporanBarang.create({
                id_barang: emp.id,
                status: "add",
                jumlah: req.body.jumlah,
            })
        } else {
            msg = `${req.params.id} not found in db`
        }
        res.json({ message: msg })
    }).catch((err) => {
        res.json({ msg: err.message });
    });
}
const sub = async (req, res) => {
    Barang.findByPk(req.params.id, {
        include: [{
            model: Kategori,
        }],
    }).then((emp) => {
        if (emp) {
            emp.update({
                jumlah: emp.jumlah - req.body.jumlah,
            })
            msg = emp
            DetailLaporanBarang.create({
                id_barang: emp.id,
                status: "sub",
                jumlah: req.body.jumlah,
            })
        } else {
            msg = `${req.params.id} not found in db`
        }
        res.json({ message: msg })
    }).catch((err) => {
        res.json({ msg: err.message });
    });
}
const index = async (req, res) => {
    try {
        const result = await Barang.findAndCountAll({
            where: {
                nama: {
                    [Op.like]: `%${req.query.search ? req.query.search : ""}%`
                }
            },
            include: [{
                model: Kategori,
                attributes: ["nama"],
            }],
        })
        res.json(result).status(200)
    } catch (error) {
        res.json(error).status(422)
    }
}

const show = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Barang.findByPk(id, {
            include: [{
                model: Kategori,
                attributes: ["nama"],
            },{
                model: DetailLaporanBarang,
                attributes: [ "status", "jumlah","createdAt"],
            }],
        })
        const result = data ? data : `${id} not found in db`
        res.json(result).status(200)
    } catch (error) {
        res.json(error).status(422)
    }
}

const update = (req, res) => {
    Barang.findByPk(req.params.id, {
        include: [{
            model: Kategori,
        }],
    }).then((emp) => {
        if (emp) {
            emp.update(req.body)
            msg = emp
        } else {
            msg = `${req.params.id} not found in db`
        }
        res.json({ message: msg })
    }).catch((err) => {
        res.json({ msg: err.message });
    });
}

const destroy = (req, res) => {
    let msg
    Barang.findByPk(req.params.id, {
        include: [{
            model: Kategori,
        }],
    }).then((row) => {
        if (row) {
            row.destroy()
            msg = "success deleted"
        } else {
            msg = `${req.params.id} not found in db`
        }
        res.json({ message: msg })
    }).catch((err) => {
        res.json({ message: err.message })
    })
}

module.exports = {
    index, show, store, add, sub,
    update, destroy
}