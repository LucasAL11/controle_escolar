import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator'

import Aluno from 'App/Models/AlunoModel'



export default class AlunosController {
    public async read({ params }: HttpContextContract) {
        const id = params.id
        const aluno = await Aluno.find(id)
        if (aluno) {
            return aluno
        }
        else {
            return 'aluno não cadastrado'
        }

    }

    public async create({ request }: HttpContextContract) {
        const data = request.only(['name', 'email', 'registration', 'birthdate'])
        await Aluno.create(data)
        return "aluno cadastrado com sucesso"
    }

    public async update({ request, params }: HttpContextContract) {
        const id = params.id
        const validationSchema = schema.create({
            name: schema.string(),
            email: schema.string({}, [
                rules.email(),
                rules.unique({ table: 'alunos', column: 'email' }),
            ]),
            birthdate: schema.date(),
        })

        const data = await request.validate({ schema: validationSchema })

        await Aluno.updateOrCreate({ id }, { name: data.name, email: data.email, birthdate: data.birthdate.toString() })

        return "aluno atualizado com sucesso"
    }

    public async delete({ params }: HttpContextContract) {
        const id = params.id
        const aluno = await Aluno.findOrFail(id)
        await aluno.delete()
        return "dados do aluno excluido com sucesso"

    }
}


