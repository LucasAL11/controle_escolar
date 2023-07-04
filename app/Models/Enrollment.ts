import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Room from './Room'

export default class Enrollment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @belongsTo(() => User)
  public user_id: BelongsTo<typeof User>

  @belongsTo(() => Room)
  public room_id: BelongsTo<typeof Room>
}
