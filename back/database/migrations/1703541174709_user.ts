import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class UserSchema extends BaseSchema {
  protected tableName = "user";

  public async up() {
    this.schema.withSchema("price_manager").createTable(this.tableName, (table) => {
      table.string("id").primary().unique().notNullable();
      table.string("email").unique().notNullable();
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.withSchema("price_manager").dropTableIfExists(this.tableName);
  }
}
