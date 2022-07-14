const db = require("../database/models")
const Kategori = db.Kategori;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const store = async (req, res) => {
    try {
        const save = await Kategori.create(req.body)
        res.json(save).status(200)
    } catch (error) {
        res.json(error).status(422)
    }
}

const index = async (req, res) => {
    try {
        const result = await Kategori.findAndCountAll({
            where: {
                nama: {
                    [Op.like]: `%${req.query.search ? req.query.search : ""}%`
                }
            },
        })
        res.json(result).status(200)
    } catch (error) {
        res.json(error).status(422)
    }
}

const show = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Kategori.findByPk(id)
        const result = data ? data : `${id} not found in db`
        res.json(result).status(200)
    } catch (error) {
        res.json(error).status(422)
    }
}

const update = (req, res) => {
    Kategori.findByPk(req.params.id).then((emp) => {
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
    Kategori.findByPk(req.params.id).then((row) => {
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
    index, show, store,
    update, destroy
}