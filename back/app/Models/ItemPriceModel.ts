import { DateTime } from "luxon";
import { BaseModel, beforeCreate, column } from "@ioc:Adonis/Lucid/Orm";
import { v4 as uuid } from "uuid";

export default class ItemPriceModel extends BaseModel {
  public static table = "price_manager.item_price";

  @beforeCreate()
  public static async addUuidHook(itemPrice: ItemPriceModel) {
    itemPrice.id = uuid();
  }

  @column({ isPrimary: true })
  public id: string;

  @column({ columnName: "id_user" })
  public idUser: string;

  @column()
  public name: string;

  @column()
  public price: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
