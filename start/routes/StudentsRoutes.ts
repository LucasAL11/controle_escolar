import Route from '@ioc:Adonis/Core/Route'

Route.get('v1/students', 'StudentsController.index')
Route.get('v1/students/:id', 'StudentsController.show')
Route.post('v1/students', 'StudentsController.store')
Route.put('v1/students/:id', 'StudentsController.update')
Route.delete('v1/students/:id', 'StudentsController.destroy')
