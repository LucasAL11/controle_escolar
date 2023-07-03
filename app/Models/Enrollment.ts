import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Room from './Room'

export default class Enrollment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public studentId: number

  @column()
  public roomId: number

  @belongsTo(() => User)
  public student: BelongsTo<typeof User>

  @belongsTo(() => Room)
  public room: BelongsTo<typeof Room>
}
