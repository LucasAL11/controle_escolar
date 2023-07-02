import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SalaAula extends BaseModel {
  public static tableName = 'salas'
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_sala: number

  @column()
  public capacidade_sala: number

  @column()
  public disponibilidade: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
