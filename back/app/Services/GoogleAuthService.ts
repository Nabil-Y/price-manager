import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import AuthService from "../Domain/Interface/AuthService";
import GoogleAuthRepository from "../Repositories/GoogleAuthRepository";

export default class GoogleAuthService implements AuthService {
  constructor(private readonly googleAuthRepository: GoogleAuthRepository) {}

  public redirect({ ally }: HttpContextContract) {
    return ally.use("google").redirect();
  }

  public async callback(ctx: HttpContextContract) {
    const { ally } = ctx;
    const google = ally.use("google");

    if (google.accessDenied()) {
      return "Access was denied";
    }

    if (google.stateMisMatch()) {
      return "Request expired. Retry again";
    }

    if (google.hasError()) {
      return google.getError();
    }

    const user = await google.user();

    await this.googleAuthRepository.findOrCreateUser(ctx, user);
  }
}
