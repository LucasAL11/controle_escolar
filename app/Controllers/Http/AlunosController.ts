import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator'

import Aluno from 'App/Models/AlunoModel'



export default class AlunosController {
    public async read({ params }: HttpContextContract) {
        const id = params.id
        const aluno = await Aluno.findOrFail(id)
        if (aluno) 
        {
            return aluno
        }
        else 
        {
            return 'aluno não cadastrado'
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
                required: 'o campo {{ field }} obrigatorio'
            }
        })

        await Aluno.create(data)
        return "aluno cadastrado com sucesso"
    }

    public async update({ request, params }: HttpContextContract) {
        const id = params.id
        const validationSchema = schema.create({
            name: schema.string(),
            email: schema.string({}, [
                rules.email(),
            ]),
            birthdate: schema.date(),
        })

        const data = await request.validate({ schema: validationSchema })

        await Aluno
            .query()
            .where('id', id)
            .update(data)

        return "aluno atualizado com sucesso"
    }

    public async delete({ params }: HttpContextContract) {
        const id = params.id
        const aluno = await Aluno.findOrFail(id)
        await aluno.delete()
        return "dados do aluno excluido com sucesso"

    }
}


