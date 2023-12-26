import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default interface AuthController {
  login(ctx: HttpContextContract): void;
  callback(ctx: HttpContextContract): void;
}
