import Route from '@ioc:Adonis/Core/Route'

Route.get('/v1/professores/:id', 'professoresController.read')
Route.post('/v1/professores', 'professoresController.create')
Route.put('/v1/professores/:id', 'professoresController.update')
Route.delete('/v1/professores/:id', 'professoresController.delete')
