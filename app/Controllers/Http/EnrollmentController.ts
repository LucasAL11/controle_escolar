import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Enrollment from 'App/Models/Enrollment'
import Room from 'App/Models/Room'
import User from 'App/Models/User'

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



        const room = await Enrollment.query().where('room_number', params.id_sala).where('user_id', params.id_usuario)

        if (!room) {
            return response.status(404).send({
                message: "sala não encontrada"
            })
        }


        return response.status(200).send({
            room
        })
    }


    public async store({ request, params, response }: HttpContextContract) {
        const data = request.only(['user_id'])

        const room = await Room.findByOrFail('room_number', params.room_number)

        const user = await User.findByOrFail('id', room.user_id)

        if (user?.role !== 'professor') {
            return response.status(403).send({ message: "usuario sem privilegios" })
        }

        const enrollments = await Enrollment.findByOrFail("user_id", data.user_id)

        let EnrollmentDTO = {
            room_id: params.room_number,
            user_id: data.user_id
        }

        if (enrollments.user_id === data.user_id) {
            return response.status(409).send("operação invalida, usuario ja existente")
        }

        if (room.user_id !== user.id) {
            return response.status(403).send({ message: "professor sem" })
        }

        let totalEnrollment = await Enrollment.query().where('room_id', params.room_number).count('* as total')[0].total

        if (totalEnrollment == room.capacity) {
            return response.status(409).send('não foi possivel cadastar aluno sala com maxima capacidade')
        }

        await Enrollment.create(EnrollmentDTO)
        return EnrollmentDTO
    }

    public async destroy({ params, response, request }: HttpContextContract) {

        const data = request.only(['user_id'])

        const room = await Room.findByOrFail('room_number', params.room_number)

        const user = await User.findByOrFail('id', room.user_id)

        if (user?.role !== 'professor') {
            return response.status(403).send({ message: "usuario sem privilegios" })
        }

        if (room.user_id !== user.id) {
            return response.status(403).send({ message: "professor sem" })
        }

        await Room.query().where('user_id', data.user_id).delete()

        return response.status(200).send({ message: 'aluno desalocado com sucesso' })
    }
}
