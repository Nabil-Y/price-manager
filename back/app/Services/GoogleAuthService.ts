import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import AuthService from "../Domain/Interface/AuthService";
import { AllyUserContract, GoogleToken } from "@ioc:Adonis/Addons/Ally";

export default class GoogleAuthService implements AuthService {
  public redirect({ ally }: HttpContextContract) {
    return ally.use("google").redirect();
  }

  public async callback({
    ally,
  }: HttpContextContract): Promise<AllyUserContract<GoogleToken> | string> {
    const google = ally.use("google");

    if (google.accessDenied()) {
      return "Access was denied";
    }

    if (google.stateMisMatch()) {
      return "Request expired. Retry again";
    }

    if (google.hasError()) {
      return google.getError() ?? "Unknown error from Google";
    }

    const user = await google.user();

    return user;
  }
}
