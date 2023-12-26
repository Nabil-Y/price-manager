import AuthController from "../../Domain/Interface/AuthController";
import GoogleAuthService from "../../Services/GoogleAuthService";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class GoogleAuthController implements AuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  public async login(ctx: HttpContextContract) {
    await this.googleAuthService.redirect(ctx);
  }

  public async callback(ctx: HttpContextContract) {
    await this.googleAuthService.callback(ctx);
  }
}
