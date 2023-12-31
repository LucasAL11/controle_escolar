import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Enrollment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public room_id: number
}
