import Route from '@ioc:Adonis/Core/Route'

Route.post('/v1/login', 'AuthController.login')
Route.post('/v1/logout', 'AuthController.logout')
