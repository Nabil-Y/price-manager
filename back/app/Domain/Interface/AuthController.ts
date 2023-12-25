import { AllyUserContract, GoogleToken } from "@ioc:Adonis/Addons/Ally";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default interface AuthController {
  login(ctx: HttpContextContract): void;
  callback(ctx: HttpContextContract): Promise<AllyUserContract<GoogleToken> | string>;
}
