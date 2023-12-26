import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class PriceManagerSchema extends BaseSchema {
  public up() {
    this.schema.createSchemaIfNotExists("price_manager");
  }

  public down() {
    this.schema.dropSchemaIfExists("price_manager", true);
  }
}
