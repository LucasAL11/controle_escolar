
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
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
    const data = request.only(['name', 'email', 'password', 'registration', 'birth_date', 'role'])
    user.merge(data)
    await user.save()
    return user
  }

  public async destroy({ params, response }: HttpContextContract) {
    const user = await User.find(params.id)
    if (!user) {
        return response.status(404).send('usuario não encontrado')
    }
    await user.delete()
  }
}
