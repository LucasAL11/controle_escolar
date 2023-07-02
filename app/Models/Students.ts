import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Enrollment from './Enrollment'

export default class Student extends BaseModel {
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

  @hasMany(() => Enrollment)
  public enrollments: HasMany<typeof Enrollment>
}
