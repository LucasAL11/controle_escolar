import Route from '@ioc:Adonis/Core/Route'

Route.post('/v1/alunos', 'AlunosController.create')
Route.put('/v1/alunos/:id', 'AlunosController.update')
