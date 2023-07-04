import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Enrollments extends BaseSchema {
  protected tableName = 'enrollments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id')
      table.integer('room_id')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}