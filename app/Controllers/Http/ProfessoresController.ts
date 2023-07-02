import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator'

import Professor from 'App/Models/ProfessorModel'



export default class ProfessoresController {
    public async read({ params }: HttpContextContract) {
        const id = params.id
        const professor = await Professor.find(id)
        if (professor) {
            return professor
        }
        else {
            return 'professor não cadastrado'
        }

    }

    public async create({ request }: HttpContextContract) {
        const data = request.only(['name', 'email', 'registration', 'birthdate'])
        await request.validate({
            schema: schema.create({

                name: schema.string({}, [
                    rules.required(),
                    rules.maxLength(100)
                ]),

                email: schema.string({}, [
                    rules.email(),
                    rules.required()
                ]),

                registration: schema.string({}, [
                    rules.required()
                ]),
                birthdate: schema.string({}, [
                    rules.required()
                ])


            }),
            messages: {
                required: 'campo obrigatorio'
            }
        })

        await Professor.create(data)
        return "professor cadastrado com sucesso"
    }

    public async update({ request, params }: HttpContextContract) {
        const id = params.id
        const data = request.only(['name', 'email', 'registration', 'birthdate'])

        await Professor
            .query()
            .where('id', id)
            .update(data)

        return "professor atualizado com sucesso"
    }

    public async delete({ params }: HttpContextContract) {
        const id = params.id
        const professor = await Professor.findOrFail(id)
        await professor.delete()
        return "dados do professor excluido com sucesso"
    }
}


