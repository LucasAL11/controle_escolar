import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Room from './Room'

export default class Teacher extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public registration: string

  @column()
  public birthdate: Date

  @hasMany(() => Room)
  public rooms: HasMany<typeof Room>
}
