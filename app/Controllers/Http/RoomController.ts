import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Room from 'App/Models/Room'
import ExceptionHandler from 'App/Exceptions/Handler'

export default class RoomController {
    public async index() {
        const rooms = await Room.all()
        return rooms
    }

    public async show({ params, auth, response }: HttpContextContract) {
        const room = await Room.find(params.id)
        if (!auth.isLoggedIn) {
            return response.status(401).send({ message: "usuario não autorizado" })
        }

        if (auth.user?.role !== 'professor') {
            return response.status(403).send({ message: "usuario sem privilegios" })
        }

        if (!room) {
            return response.status(404).send({ message: "sala não encontrada" })
        }

        return response.status(200).send({ message : room })
    }

    public async store({ request, auth, response }: HttpContextContract) {
        const data = request.only(['room_number', 'capacity', 'availability'])

        if (!auth.isLoggedIn) {
            return response.status(401).send({ message: "usuario não autorizado" })
        }

        if (auth.user?.role !== 'professor') {
            return response.status(403).send({ message: "usuario sem privilegios" })
        }

        const room = await Room.create(data)
        return room
    }

    public async update({ params, request, auth, response }: HttpContextContract) {

        if (!auth.isLoggedIn) {
            return response.status(401).send({ message: "usuario não autorizado" })
        }

        if (auth.user?.role !== 'professor') {
            return response.status(403).send({ message: "usuario sem privilegios" })
        }

        const room = await Room.find(params.id)

        if (!room) {
            throw new ExceptionHandler
        }
        const data = request.only(['room_number', 'capacity', 'availability'])
        room.merge(data)
        await room.save()
        return room
    }

    public async destroy({ params, auth, response }: HttpContextContract) {

        if (!auth.isLoggedIn) {
            return response.status(401).send({ message: "usuario não autorizado" })
        }

        if (auth.user?.role !== 'professor') {
            return response.status(403).send({ message: "usuario sem privilegios" })
        }

        const room = await Room.find(params.id)
        if (!room) {
            throw new ExceptionHandler
        }

        await room.delete()
    }
}
