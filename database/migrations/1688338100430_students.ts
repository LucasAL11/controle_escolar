import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Students extends BaseSchema {
  protected tableName = 'students'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('email').notNullable().unique()
      table.string('registration').notNullable().unique()
      table.date('birthdate').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
