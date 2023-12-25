import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LogRequest {
  public async handle(
    { request, response, logger }: HttpContextContract,
    next: () => Promise<void>
  ) {
    logger.info(
      `${new Date().toLocaleString()} -> ${response.getStatus()} ${request.method()}: ${request.url()}`
    )
    await next()
  }
}
