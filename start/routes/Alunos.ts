import Route from '@ioc:Adonis/Core/Route'

Route.get('/v1/alunos/:id', 'AlunosController.read')
Route.post('/v1/alunos', 'AlunosController.create')
Route.put('/v1/alunos/:id', 'AlunosController.update')
Route.delete('/v1/alunos/:id', 'AlunosController.delete')
