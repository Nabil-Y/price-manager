import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ShopItemPriceService from "../../Services/ShopItemPriceService";
import ItemPriceController from "../../Domain/Interface/ItemPriceController";

export default class ShopItemPriceController implements ItemPriceController {
  constructor(private readonly shopItemPriceService: ShopItemPriceService) {}

  public async getItemPrice(ctx: HttpContextContract): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public async getItemPriceList(ctx: HttpContextContract): Promise<void> {
    const idUser = "109336729772356383284";
    const itemPriceList = await this.shopItemPriceService.findAllItemPrice(idUser);
    ctx.response.status(200).send(itemPriceList);
  }
  public async CreateItemPrice(ctx: HttpContextContract): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public async updateItemPrice(ctx: HttpContextContract): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public async deleteItemPrice(ctx: HttpContextContract): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
