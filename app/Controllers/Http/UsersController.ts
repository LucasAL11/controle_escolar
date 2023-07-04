
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Enrollment from 'App/Models/Enrollment'
import Room from 'App/Models/Room'
import User from 'App/Models/User'

export default class UserController {
  public async index() {
    const users = await User.all()
    return users
  }

  public async show({ params, response }: HttpContextContract) {
    const user = await User.find(params.id)
    if (!user) {
      return response.status(404).send('não encontrado')
    }
    return user
  }

  public async showAllClasses({ params, response }: HttpContextContract) {
    
    const user = await User.findByOrFail("id", params.id_usuario)
    if (!user) {
      return response.status(404).send('não encontrado')
    }

    const enrollments = await Enrollment.findByOrFail("user_id", params.id_usuario)
    const room = await Room.findByOrFail("room_number", enrollments.room_id)

    const professor = await User.findByOrFail("id", room.user_id)


    
    let classesDTO = {
      nome: user.name,
      professor: professor.name,
      sala: enrollments.room_id
    }

    return response.status(200).send({ classesDTO})
  }


  public async store({ request }: HttpContextContract) {
    const data = request.only(['name', 'email', 'password', 'registration', 'birth_date', 'role'])
    const user = await User.create(data)
    return user
  }

  public async update({ params, request, response }: HttpContextContract) {
    const user = await User.find(params.id)
    if (!user) {
      return response.status(404).send('não encontrado')
    }

    if(user.id !== params.id || user.role !== "professor"){
      return response.status(403).send({message : "voce não tem autorização de alterar um outro usuario"})
    }


    const data = request.only(['name', 'email', 'password', 'registration', 'birth_date', 'role'])
    user.merge(data)
    await user.save()
    return user
  }

  public async destroy({ params, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    if(user?.id !== params.id || user?.role !== "professor"){
      return response.status(403).send({message : "voce não tem autorização de alterar um outro usuario"})
    }
    
    if (!user) {
      return response.status(404).send('não encontrado')
    }

    if (!user) {
        return response.status(404).send('usuario não encontrado')
    }
    await user.delete()
  }
}
