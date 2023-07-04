import Route from '@ioc:Adonis/Core/Route'

Route.get('v1/users', 'UsersController.index')
Route.get('v1/users/:id', 'UsersController.show')
Route.post('v1/users', 'UsersController.store')
Route.put('v1/users/:id', 'UsersController.update')
Route.delete('v1/users/:id', 'UsersController.destroy')


Route.get('/v1/users/:id_usuario/rooms', 'RoomController.index')
Route.get('/v1/users/:id_usuario/rooms/:id_sala', 'RoomController.show')
Route.post('/v1/users/:id_usuario/rooms', 'RoomController.store')
Route.put('/v1/users/:id_usuario/rooms/:id_sala', 'RoomController.update')
Route.delete('/v1/users/:id_usuario/rooms/:id_sala', 'RoomController.destroy')


