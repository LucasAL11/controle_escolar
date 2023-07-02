import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Student from './Students'
import Room from './Room'

export default class Enrollment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public studentId: number

  @column()
  public roomId: number

  @belongsTo(() => Student)
  public student: BelongsTo<typeof Student>

  @belongsTo(() => Room)
  public room: BelongsTo<typeof Room>
}
