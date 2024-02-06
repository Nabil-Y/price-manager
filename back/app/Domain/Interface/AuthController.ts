import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default interface AuthController {
  login(ctx: HttpContextContract): Promise<void>;
  callback(ctx: HttpContextContract): Promise<void>;
}
