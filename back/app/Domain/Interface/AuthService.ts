import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default interface AuthService {
  redirect(ctx: HttpContextContract): void;
  callback(ctx: HttpContextContract): void;
}
