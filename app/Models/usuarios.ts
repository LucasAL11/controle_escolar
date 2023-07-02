import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class usuarios extends BaseModel {
  public static table = 'usuarios'
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome : string

  @column()
  public email : string

  @column()
  public matricula : string  

  @column()
  public data_nascimento : DateTime

  @column()
  public professor: boolean

  @column.dateTime({ autoCreate: true })
  public criadoEm: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public atualizadoEm: DateTime
}
