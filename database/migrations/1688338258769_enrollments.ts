import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Enrollments extends BaseSchema {
  protected tableName = 'enrollments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('student_id').unsigned().references('students.id')
      table.integer('room_id').unsigned().references('rooms.id')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}