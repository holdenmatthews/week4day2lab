const houses = require("./db.json")

let globalId = 4

module.exports = {
    getHouses: (req, res) => {
        res.status(200).send(houses)
    },

    deleteHouse: (req, res) => {
        const { id } = req.params
        houses.forEach((house, i) => {
            if (house.id === +id) {
                houses.splice(i, 1)
            }
        })
        res.status(200).send(houses)
    },

    createHouse: (req, res) => {
        const { address } = req.body
        for (let i = 0; i < houses.length; i++) {
            if (houses[i].address === address) {
                res.status(409).send("That house is already listed.")
                return;
            }
        }
        houses.push({id: globalId, ...req.body})
        globalId++
        res.status(200).send(houses)
    },

    updateHouse: (req, res) => {
        const { id } = req.params
        const { type } = req.body
        houses.forEach((house, i) => {
            if (house.id === +id) {
                if (type === "plus") {
                    houses[i].price += 10000
                } else {
                    houses[i].price -= 10000
                }
            }
        })
        res.status(200).send(houses)
    }
}