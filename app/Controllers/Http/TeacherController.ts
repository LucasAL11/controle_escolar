import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Teacher from 'App/Models/Teacher'
import ExceptionHandler from 'App/Exceptions/Handler'

export default class TeacherController {
  public async index() {
    const teachers = await Teacher.all()
    return teachers
  }

  public async show({ params }: HttpContextContract) {
    const teacher = await Teacher.find(params.id)
    if (!teacher) {
      throw new ExceptionHandler
    }
    return teacher
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['name', 'email', 'registration', 'birthdate'])
    const teacher = await Teacher.create(data)
    return teacher
  }

  public async update({ params, request }: HttpContextContract) {
    const teacher = await Teacher.find(params.id)
    if (!teacher) {
      throw new ExceptionHandler
    }
    const data = request.only(['name', 'email', 'registration', 'birthdate'])
    teacher.merge(data)
    await teacher.save()
    return teacher
  }

  public async destroy({ params }: HttpContextContract) {
    const teacher = await Teacher.find(params.id)
    if (!teacher) {
      throw new ExceptionHandler
    }
    await teacher.delete()
  }
}
