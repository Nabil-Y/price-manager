import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "item_price";

  public async up() {
    this.schema.withSchema("price_manager").createTable(this.tableName, (table) => {
      table.string("id").primary().unique().notNullable();
      table.string("id_user").unique().notNullable();
      table.string("name").notNullable();
      table.string("price").notNullable();
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
    this.schema.withSchema("price_manager").alterTable(this.tableName, (table) => {
      table.foreign("id_user").references("id").inTable("price_manager.user").onDelete("CASCADE");
    });
  }

  public async down() {
    this.schema.withSchema("price_manager").dropTableIfExists(this.tableName);
  }
}
