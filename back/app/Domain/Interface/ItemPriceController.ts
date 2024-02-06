import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default interface ItemPriceController {
  getItemPrice(ctx: HttpContextContract): Promise<void>;
  getItemPriceList(ctx: HttpContextContract): Promise<void>;
  CreateItemPrice(ctx: HttpContextContract): Promise<void>;
  updateItemPrice(ctx: HttpContextContract): Promise<void>;
  deleteItemPrice(ctx: HttpContextContract): Promise<void>;
}
