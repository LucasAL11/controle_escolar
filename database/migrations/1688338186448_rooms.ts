import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Rooms extends BaseSchema {
  protected tableName = 'rooms'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('room_number').notNullable().unique()
      table.integer('capacity').notNullable()
      table.boolean('availability').notNullable().defaultTo(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}