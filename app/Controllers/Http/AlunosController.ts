import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator'

import Aluno from 'App/Models/usuarios'

export default class AlunosController {
    public async read({ params }: HttpContextContract) {
        const id = params.id
        const aluno = await Aluno.findOrFail(id)

        if(aluno.professor){
            return "não foi possivel atualizar este usuario ele um professor"
        }


        if (aluno) {
            let aluno_dto = {
                nome: aluno.nome,
                email: aluno.email,
                matricula: aluno.matricula,
                data_nascimento: aluno.data_nascimento
            }

            return aluno_dto
        }
        else {
            return 'aluno não cadastrado'
        }
    }

    public async create({ request }: HttpContextContract) {
        const data = request.only(['nome', 'email', 'matricula', 'data_nascimento'])

        await request.validate({
            schema: schema.create({

                nome: schema.string({}, [
                    rules.required(),
                    rules.maxLength(100)
                ]),

                email: schema.string({}, [
                    rules.email(),
                    rules.required()
                ]),

                matricula: schema.string({}, [
                    rules.required()
                ]),
                data_nascimento: schema.date({}, [
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
            nome: schema.string(),
            email: schema.string({}, [
                rules.email(),
            ]),
            data_nascimento: schema.date(),
        })

        const data = await request.validate({ schema: validationSchema })

        let alunoModel = {
            nome: data.nome,
            email: data.email,
            data_nascimento: data.data_nascimento.toSQLDate()
        }


        await Aluno
            .query()
            .where('id', id)
            .update(alunoModel)

        return "aluno atualizado com sucesso"
    }

    public async delete({ params }: HttpContextContract) {
        const id = params.id
        const aluno = await Aluno.findOrFail(id)
        await aluno.delete()
        return "dados do aluno excluido com sucesso"

    }
}