import { AllyUserContract, GoogleToken } from "@ioc:Adonis/Addons/Ally";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default interface AuthRepository {
  findOrCreateUser(ctx: HttpContextContract, user: AllyUserContract<GoogleToken>): void;
}
