import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import HakAkses from '#models/auth/hakAkses'
import Pengguna from '#models/auth/pengguna'
export default class EnsureRoleAccessMiddleware {
  async handle(ctx: HttpContext, next: NextFn, role: string[]) {
    const user = ctx.user

    if (!user) return ctx.response.unauthorized({ message: 'Silahkan login terlebih dahulu.' })

    const userRole = await HakAkses.find(user.id_hak_akses)

    if (!userRole) return ctx.response.notFound({ message: 'Pengguna tidak memiliki hak akses.' })

    const formattedRole = role.map((formatted) => formatted.toLowerCase())

    if (!formattedRole.includes(userRole.nama_hak_akses.toLowerCase())) {
      return ctx.response.forbidden({ message: 'Anda tidak memiliki akses ke halaman ini.' })
    }

    await next()
  }
}
