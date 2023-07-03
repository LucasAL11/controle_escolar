import Route from '@ioc:Adonis/Core/Route'

Route.get('v1/rooms', 'RoomController.index')
Route.get('v1/rooms/:id', 'RoomController.show')
Route.post('v1/rooms', 'RoomController.store')
Route.put('v1/rooms/:id', 'RoomController.update')
Route.delete('v1/rooms/:id', 'RoomController.destroy')
