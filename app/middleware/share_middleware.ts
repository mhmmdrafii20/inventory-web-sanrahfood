import { HttpContext } from '@adonisjs/core/http'
import { NextFn } from '@adonisjs/core/types/http'

export default class InitializeInertiaMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Membagikan data ke semua komponen React
     */
    ctx.inertia.share({
      flash: () => ctx.session.flashMessages.all(),
      // Tambahkan user auth jika perlu
      user: () => ctx.auth?.user,
    })

    return next()
  }
}