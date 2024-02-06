import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default interface AuthService {
  redirect(ctx: HttpContextContract): Promise<void>;
  callback(ctx: HttpContextContract): Promise<void>;
}
