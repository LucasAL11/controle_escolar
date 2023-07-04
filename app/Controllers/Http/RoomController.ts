import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Room from 'App/Models/Room'
import User from 'App/Models/User'
import ExceptionHandler from 'App/Exceptions/Handler'

export default class RoomController {
    public async index() {
        const rooms = await Room.all()
        return rooms
    }

    public async show({ params, response }: HttpContextContract) {
        
        const user = await User.findOrFail(params.id_usuario)
        
        if (user.role !== 'professor') {
            return response.status(403).send({ 
                message: "usuario sem privilegios" 
            })
        }

        const room = await Room.query().where('room_number', params.id_sala).where('user_id', params.id_usuario)

        if (!room) {
            return response.status(404).send({ 
                message: "sala não encontrada" 
            })
        }

    
        return response.status(200).send({ 
            room 
        })
    }


    public async store({ request,params, response }: HttpContextContract) {
        const data = request.only(['room_number', 'capacity', 'availability'])

        const user = await User.findOrFail(params.id_usuario)

        if (user?.role !== 'professor') {
            return response.status(403).send({ message: "usuario sem privilegios" })
        }

        let RoomDTO = {
            room_number : data.room_number,
            capacity : data.capacity,
            availability : data.availability,
            user_id: params.id_usuario
        }

        const room = await Room.create(RoomDTO)
        return room
    }

    public async update({ params, request, response }: HttpContextContract) {

        const data = request.only(['room_number', 'capacity', 'availability'])
        const user = await User.findOrFail(params.id_usuario)

        if (user?.role !== 'professor') {
            return response.status(403).send({ message: "usuario sem privilegios" })
        }

        const room = await Room.find(params.room_number)

        if (!room) {
            return response.status(404).send({message: "sala de {{ room_number }} não encontrada"})
        }


        let RoomDTO = {
            room_number : data.room_number,
            capacity : data.capacity,
            availability : data.availability,
            user_id: params.id_usuario
        }

        room.user_id = params.id_usuario
        room.merge(RoomDTO)
        await room.save()
        return room
    }

    public async destroy({ params, response }: HttpContextContract) {

        const user = await User.findOrFail(params.id_usuario)

        if (user?.role !== 'professor') {
            return response.status(403).send({ message: "usuario sem privilegios" })
        }


        
        const room = await Room.query().where('user_id', params.id_usuario).where('room_number', params.id_sala)
        
        if (!room) {
            throw new ExceptionHandler
        }

        await Room.query().where('user_id', params.id_usuario).where('room_number', params.id_sala).delete()

        return response.status(200).send({message: 'sala excluido com sucesso'})
    }
}
