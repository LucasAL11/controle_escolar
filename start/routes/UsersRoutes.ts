import Route from '@ioc:Adonis/Core/Route'

Route.get('v1/users', 'UsersController.index')
Route.get('v1/users/:id', 'UsersController.show')
Route.post('v1/users', 'UsersController.store')
Route.put('v1/users/:id', 'UsersController.update')
Route.delete('v1/users/:id', 'UsersController.destroy')
