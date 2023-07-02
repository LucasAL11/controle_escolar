import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student from 'App/Models/Students'
import ExceptionHandler from 'App/Exceptions/Handler'

export default class StudentController {
  public async index() {
    const students = await Student.all()
    return students
  }

  public async show({ params }: HttpContextContract) {
    const student = await Student.find(params.id)
    if (!student) {
      throw new ExceptionHandler()
    }
    return student
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['name', 'email', 'registration', 'birthdate'])
    const student = await Student.create(data)
    return student
  }

  public async update({ params, request }: HttpContextContract) {
    const student = await Student.find(params.id)
    if (!student) {
      throw new ExceptionHandler()
    }
    const data = request.only(['name', 'email', 'registration', 'birthdate'])
    student.merge(data)
    await student.save()
    return student
  }

  public async destroy({ params }: HttpContextContract) {
    const student = await Student.find(params.id)
    if (!student) {
      throw new ExceptionHandler()
    }
    await student.delete()
  }
}
