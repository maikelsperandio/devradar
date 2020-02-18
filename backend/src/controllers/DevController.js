const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

// index(lista os recursos), show(mostra um recurso específico), store(cria um recurso), update(atualiza um recurso), destroy(exclui um recurso)

module.exports = {

    async index(req, res){
        const devs = await Dev.find()

        return res.json(devs)
    },

    async store (req, res) {
        const {github_username, techs, latitude, longitude} = req.body;

        let dev = await Dev.findOne({ github_username })

        if(!dev){
            const respGit = await axios.get(`https://api.github.com/users/${github_username}`)
            const {name = login, avatar_url, bio} = respGit.data;
            const techsArray = parseStringAsArray(techs)
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })
        }
        return res.json(dev)
    },

    async show(req, res) {
        const dev = await Dev.findOne({github_username: req.params.username})
        if(!dev)
            return res.json({message:'Desenvolvedor não encontrado'})
        else
            return res.json(dev)
    },

    async destroy(req, res){
        const dev = await Dev.deleteOne({github_username: req.params.username})
        return res.json(dev)
    }
}