import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import AuthService from "../Domain/Interface/AuthService";
import User from "../Models/User";
import Logger from "@ioc:Adonis/Core/Logger";

export default class GoogleAuthService implements AuthService {
  public redirect({ ally }: HttpContextContract) {
    return ally.use("google").redirect();
  }

  public async callback({ ally, auth, response }: HttpContextContract) {
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

    // To clean after with repo functions

    if (!user.email) {
      throw new Error("No email");
    }

    try {
      const dbUser = await User.query()
        .where("email", user.email)
        .where("id", user.id)
        .firstOrFail();

      Logger.info(`existingUser: ${dbUser.email}`);

      await auth.login(dbUser);

      return response.redirect().toPath("/dashboard");
    } catch (e) {
      Logger.error(e);
    }

    try {
      const newUser = await User.create({
        id: user.id,
        email: user.email,
      });

      Logger.info(`newUser: ${newUser.email}`);

      await auth.login(newUser);

      return response.redirect().toPath("/dashboard");
    } catch (e) {
      Logger.error(e);
    }
  }
}
