import { HttpContext } from "@adonisjs/core/http";
import { IntegrasiWhatsappServices } from "#services/IntegrasiWhatsappServices";
import axios from "axios";
import IntegrasiWhatsapp from "#models/integrasi_whatsapp";
export default class IntegrasiWhatsappController {
    async index({ inertia, user }: HttpContext) {
        const penggunaId = String(user?.id_pengguna);
        const rawWhatsappSession = await IntegrasiWhatsapp.query().where('id_pengguna', penggunaId).first();
        const whatsappSession = rawWhatsappSession?.$attributes;
        return inertia.render('integrasiWhatsapp', { whatsappSession });
    }
    async connect({ response, session, user }: HttpContext) {
        try {
            const res = await axios.post("https://api-zawa.azickri.com/session");

            const sessionId = res.data.sessionId;
            const zawaId = res.data.id;
            const penggunaId = String(user?.id_pengguna);
            const status = "QR_READY";

            await IntegrasiWhatsappServices.connect(
                zawaId, sessionId, penggunaId, status
            )

            session.flash("success", "Session Berhasil Dibuat");
            return response.redirect().toRoute('integrasiWhatsapp.index');
        } catch (error) {
            session.flash("error", "Gagal membuat Session");
            return response.redirect().back();
        }
    }
    async getQr({ user, response }: HttpContext) {
        const penggunaId = String(user?.id_pengguna);
        const res = await IntegrasiWhatsappServices.getQr(penggunaId)
        return response.ok(res)
    }
}