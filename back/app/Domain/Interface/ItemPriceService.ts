import { ItemPrice } from "../Types/itemPrice";
import { ItemPriceUpdateRequest } from "../Types/itemPriceUpdateRequest";

export interface ItemPriceService {
  findItemPrice(itemPriceId: string, idUser: string): Promise<ItemPrice>;

  findAllItemPrice(idUser: string): Promise<ItemPrice[]>;

  createItemPrice(idUser: string, name: string, price: string): Promise<ItemPrice>;

  updateItemPrice(
    itemPriceId: string,
    idUser: string,
    itemPriceUpdateRequest: ItemPriceUpdateRequest
  ): Promise<ItemPrice>;

  deleteItemPrice(itemPriceId: string, idUser: string): Promise<void>;
}
