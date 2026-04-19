import StokBahanBaku from "#models/stok_bahan_baku";
import type { HttpContext } from "@adonisjs/core/http";

export default class StokBahanController {
    async index({ inertia }: HttpContext) {
        const stokBahan = await StokBahanBaku.query().preload('bahan');
        return inertia.render("stokBahan", { stokBahan })
    }
}