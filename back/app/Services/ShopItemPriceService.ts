import { ItemPriceService } from "../Domain/Interface/ItemPriceService";
import { ItemPrice } from "../Domain/Types/itemPrice";
import { ItemPriceRepository } from "../Domain/Interface/ItemPriceRepository";
import { ItemPriceUpdateRequest } from "../Domain/Types/itemPriceUpdateRequest";

export default class ShopItemPriceService implements ItemPriceService {
  constructor(private readonly itemPriceRepository: ItemPriceRepository) {}

  public async findItemPrice(itemPriceId: string, idUser: string): Promise<ItemPrice> {
    return this.itemPriceRepository.findItemPrice(itemPriceId, idUser);
  }
  public async findAllItemPrice(idUser: string): Promise<ItemPrice[]> {
    return this.itemPriceRepository.findAllItemPrice(idUser);
  }
  public async createItemPrice(idUser: string, name: string, price: string): Promise<ItemPrice> {
    return this.itemPriceRepository.createItemPrice(idUser, name, price);
  }
  public async updateItemPrice(
    itemPriceId: string,
    idUser: string,
    itemPriceUpdateRequest: ItemPriceUpdateRequest
  ): Promise<ItemPrice> {
    return this.itemPriceRepository.updateItemPrice(itemPriceId, idUser, itemPriceUpdateRequest);
  }
  public async deleteItemPrice(itemPriceId: string, idUser: string): Promise<void> {
    await this.itemPriceRepository.deleteItemPrice(itemPriceId, idUser);
  }
}
