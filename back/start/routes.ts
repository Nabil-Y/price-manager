/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";
import GoogleAuthController from "../app/Controllers/Http/GoogleAuthController";
import GoogleAuthService from "../app/Services/GoogleAuthService";
import GoogleAuthRepository from "../app/Repositories/GoogleAuthRepository";
import ShopItemPriceRepository from "../app/Repositories/ShopItemPriceRepository";
import ShopItemPriceService from "../app/Services/ShopItemPriceService";
import ShopItemPriceController from "../app/Controllers/Http/ShopItemPriceController";

const googleAuthRepository = new GoogleAuthRepository();
const googleAuthService = new GoogleAuthService(googleAuthRepository);
const googleAuthController = new GoogleAuthController(googleAuthService);

const shopItemPriceRepository = new ShopItemPriceRepository();
const shopItemPriceService = new ShopItemPriceService(shopItemPriceRepository);
const shopItemPriceController = new ShopItemPriceController(shopItemPriceService);

Route.get("/", async () => {
  return { hello: "world" };
});

Route.get("/google/login", async (ctx) => {
  googleAuthController.login(ctx);
});

Route.get("/google/callback", async (ctx) => {
  return googleAuthController.callback(ctx);
});

Route.get("/dashboard", async ({ auth, logger }) => {
  logger.info(`${auth.use("web").user["$attributes"].email} is logged in`);
}).middleware("auth");

Route.get("/logout", async ({ auth, response, logger }) => {
  logger.info(`${auth.use("web").user["$attributes"].email} is logged out`);
  await auth.logout();
  response.redirect().toPath("/");
}).middleware("auth");

Route.get("/item-price/", async (ctx) => {
  return shopItemPriceController.getItemPriceList(ctx);
}).middleware("auth");
