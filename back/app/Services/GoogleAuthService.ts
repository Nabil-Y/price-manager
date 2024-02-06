import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import AuthService from "../Domain/Interface/AuthService";
import GoogleAuthRepository from "../Repositories/GoogleAuthRepository";

export default class GoogleAuthService implements AuthService {
  constructor(private readonly googleAuthRepository: GoogleAuthRepository) {}

  public redirect({ ally }: HttpContextContract): Promise<void> {
    return ally.use("google").redirect();
  }

  public async callback(ctx: HttpContextContract): Promise<void> {
    const { ally } = ctx;
    const google = ally.use("google");

    if (google.accessDenied()) {
      throw new Error("Access was denied");
    }

    if (google.stateMisMatch()) {
      throw new Error("Request expired. Retry again");
    }

    if (google.hasError()) {
      throw new Error(google.getError() ?? "google.hasError is null");
    }

    const user = await google.user();

    await this.googleAuthRepository.findOrCreateUser(ctx, user);
  }
}
