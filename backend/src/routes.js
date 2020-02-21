const {Router} = require('express')
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')

const routes = Router()

routes.post('/devs', DevController.store)
    .get('/devs', DevController.index)

routes.get('/devs/:username', DevController.show)
    .delete('/devs/:username', DevController.destroy)
    .put('/devs/:username', DevController.update)

routes.get('/search', SearchController.index)

module.exports = routes