import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public room_number: number

  @column()
  public capacity: number

  @column()
  public availability: boolean

  @column()
  public user_id: number
}
