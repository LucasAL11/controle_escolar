import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Enrollment from 'App/Models/Enrollment'
import Room from 'App/Models/Room'
import User from 'App/Models/User'

export default class RoomController {
    public async IndexByRoomId({params,  response }: HttpContextContract){

        const room = await Room.findByOrFail("user_id", params.user_id)
        const enrollments = await Enrollment.findByOrFail("room_id", room.room_number)

        if(enrollments.room_id !== params.room_id){
            return response.status(403).send("usuario não tem permissão para visualizar esta sala")
        }

        return response.status(200).send(enrollments)
        
    }

    public async indexClasseByid({params,  response }: HttpContextContract){

        const room = await Room.findByOrFail("user_id", params.user_id)
        const enrollments = await Enrollment.findByOrFail("room_id", room.room_number)

        if(enrollments.room_id !== params.room_id){
            return response.status(403).send("usuario não tem permissão para visualizar esta sala")
        }

        return response.status(200).send(enrollments)
        
    }


    public async show({ params, response }: HttpContextContract) {

        const user = await User.findBy('id', params.user_id)

        if (user?.role !== 'professor') {
            return response.status(403).send({ message: "usuario sem privilegios" })
        }

        const enrollments = await Enrollment.findByOrFail("user_id", params.user_id)

        return response.status(200).send(enrollments)

    }


    public async store({ request, params, response }: HttpContextContract) {
        const data = request.only(['user_id'])

        const room = await Room.findByOrFail('room_number', params.room_number)

        const teacher = await User.findByOrFail('id', params.user_id)

        if (teacher?.role !== 'professor') {
            return response.status(403).send({ message: "usuario sem privilegios" })
        }

        const enrollments = await Enrollment.findBy("room_id", params.room_number)

        const student = await User.query().where('id', data.user_id)

        if (!student) {
            return response.status(404).send("usuario não encontrado")
        }

        let EnrollmentDTO = {
            room_id: parseInt(params.room_number),
            user_id: data.user_id
        }

        if (enrollments === data.user_id) {
            return response.status(409).send("operação invalida, usuario ja existente")
        }

        if (room.user_id !== teacher.id) {
            return response.status(409).send("operação invalida, esta sala não pertence a este usuario")
        }

        if (room.user_id !== teacher.id) {
            return response.status(403).send({ message: "esta sala não pertence a este usuario" })
        }

        let totalEnrollment = await Enrollment.query().where('room_id', params.room_number).count('* as total')[0]

        if (totalEnrollment == room.capacity) {
            return response.status(409).send('não foi possivel cadastar aluno sala com maxima capacidade')
        }

        await Enrollment.create(EnrollmentDTO)
        return EnrollmentDTO
    }

    public async destroy({ params, response, request }: HttpContextContract) {

        const data = request.only(['user_id'])

        const room = await Room.findByOrFail('room_number', params.room_number)

        const user = await User.findByOrFail('id', params.user_id)

        if (user?.role !== 'professor') {
            return response.status(403).send({ message: "usuario sem privilegios" })
        }

        if (room.user_id !== user.id && room.user_id !== null) {
            return response.status(403).send({ message: "sala não pertece a este professor" })
        }

        const student = await User.findByOrFail('id', data.user_id)

        await Room.query().where('user_id', student.id).delete()

        return response.status(200).send({ message: 'aluno desalocado com sucesso' })
    }
}
