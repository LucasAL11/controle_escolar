import { BaseModel, column, beforeSave } from '@ioc:Adonis/Lucid/Orm'
import Logger from '@ioc:Adonis/Core/Logger'
import Hash from '@ioc:Adonis/Core/Hash'
export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public registration: string

  @column()
  public birthDate: Date

  @column()
  public role: string

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      try {
        user.password = await Hash.make(user.password)
      }
      catch (error) {
        Logger.error(error)
      }
    }
  }
}
