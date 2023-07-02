import Route from '@ioc:Adonis/Core/Route'

Route.get('/teachers', 'TeacherController.index')
Route.get('/teachers/:id', 'TeacherController.show')
Route.post('/teachers', 'TeacherController.store')
Route.put('/teachers/:id', 'TeacherController.update')
Route.delete('/teachers/:id', 'TeacherController.destroy')
