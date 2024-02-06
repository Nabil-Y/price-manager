import { ItemPrice } from "../Domain/Types/itemPrice";
import { ItemPriceRepository } from "../Domain/Interface/ItemPriceRepository";
import { ItemPriceUpdateRequest } from "../Domain/Types/itemPriceUpdateRequest";
import ItemPriceModel from "../Models/ItemPriceModel";

export default class ShopItemPriceRepository implements ItemPriceRepository {
  public async findItemPrice(itemPriceId: string, idUser: string): Promise<ItemPrice> {
    try {
      const itemPrice = await ItemPriceModel.query()
        .where("idUser", idUser)
        .where("itemPriceId", itemPriceId)
        .first();

      if (itemPrice === null) {
        throw new Error(`No item price with id ${itemPriceId} found for idUser ${idUser}`);
      }
      return buildEntityFromModel(itemPrice);
    } catch (e) {
      throw new Error(e);
    }
  }
  public async findAllItemPrice(idUser: string): Promise<ItemPrice[]> {
    try {
      const itemPriceList = await ItemPriceModel.query().where("idUser", idUser);

      return itemPriceList.map(buildEntityFromModel);
    } catch (e) {
      throw new Error(e);
    }
  }
  public async createItemPrice(idUser: string, name: string, price: string): Promise<ItemPrice> {
    try {
      const createdItemPrice = await ItemPriceModel.create({
        idUser,
        name,
        price,
      });

      return buildEntityFromModel(createdItemPrice);
    } catch (e) {
      throw new Error(e);
    }
  }
  public async updateItemPrice(
    itemPriceId: string,
    idUser: string,
    itemPriceUpdateRequest: ItemPriceUpdateRequest
  ): Promise<ItemPrice> {
    try {
      const itemPrice = await ItemPriceModel.findOrFail(itemPriceId);

      if (itemPrice.idUser !== idUser) {
        throw new Error("can't update item price not owned by user");
      }

      if (itemPriceUpdateRequest.name) {
        itemPrice.name = itemPriceUpdateRequest.name;
      }
      if (itemPriceUpdateRequest.price) {
        itemPrice.price = itemPriceUpdateRequest.price;
      }

      await itemPrice.save();

      return buildEntityFromModel(itemPrice);
    } catch (e) {
      throw new Error(e);
    }
  }
  public async deleteItemPrice(itemPriceId: string, idUser: string): Promise<void> {
    try {
      const itemPrice = await ItemPriceModel.findOrFail(itemPriceId);

      if (itemPrice.idUser !== idUser) {
        throw new Error("can't update item price not owned by user");
      }

      await itemPrice.delete();
    } catch (e) {
      throw new Error(e);
    }
  }
}

function buildEntityFromModel(itemPriceModel: ItemPriceModel): ItemPrice {
  return {
    id: itemPriceModel.id,
    idUser: itemPriceModel.idUser,
    name: itemPriceModel.name,
    price: itemPriceModel.price,
    createdAt: itemPriceModel.createdAt,
    updatedAt: itemPriceModel.updatedAt,
  };
}
