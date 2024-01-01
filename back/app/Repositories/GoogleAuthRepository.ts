import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "../Models/User";
import AuthRepository from "../Domain/Interface/AuthRepository";
import { AllyUserContract, GoogleToken } from "@ioc:Adonis/Addons/Ally";

export default class GoogleAuthRepository implements AuthRepository {
  public async findOrCreateUser(
    { auth, response, logger }: HttpContextContract,
    user: AllyUserContract<GoogleToken>
  ) {
    if (!user.email) {
      throw new Error("No email");
    }
    try {
      const dbUser = await User.query().where("email", user.email).where("id", user.id).first();

      if (dbUser === null) {
        logger.warn(`No user found with email ${user.email}`);
      } else {
        logger.info(`existingUser: ${dbUser.email}`);

        await auth.login(dbUser);

        return response.redirect().toPath("/dashboard");
      }

      const newUser = await User.create({
        id: user.id,
        email: user.email,
      });

      logger.info(`New user created with email ${newUser.email}`);

      await auth.login(newUser);

      return response.redirect().toPath("/dashboard");
    } catch (e) {
      logger.error(e);
    }
  }
}
