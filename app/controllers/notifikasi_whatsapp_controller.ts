import { HttpContext } from "@adonisjs/core/http";
import { NotifikasiWhatsappServices } from "#services/NotifikasiWhatsappServices";
import axios from "axios";
import NotifikasiWhatsapp from "#models/notifikasi_whatsapp";
export default class NotifikasiWhatsappController {
    async index({ inertia, user }: HttpContext) {
        const penggunaId = String(user?.id_pengguna);
        const rawWhatsappSession = await NotifikasiWhatsapp.query().where('id_pengguna', penggunaId).first();
        const whatsappSession = rawWhatsappSession?.$attributes;
        return inertia.render('notifikasiWhatsapp', { whatsappSession });
    }
    async createSession({ response, session, user }: HttpContext) {
        try {
            const res = await axios.post("https://api-zawa.azickri.com/session");

            const sessionId = res.data.sessionId;
            const zawaId = res.data.id;
            const penggunaId = String(user?.id_pengguna);
            const status = "QR_READY";

            await NotifikasiWhatsappServices.createSession(
                zawaId, sessionId, penggunaId, status
            )

            session.flash("success", "Session Berhasil Dibuat");
            return response.redirect().toRoute('notifikasiWhatsapp.index');
        } catch (error) {
            session.flash("error", error.message);
            return response.redirect().back();
        }
    }
    async getQr({ user, response, session }: HttpContext) {
        try {
            const penggunaId = String(user?.id_pengguna);
            const res = await NotifikasiWhatsappServices.getQr(penggunaId);
            session.flash('success', "QR Code berhasil tergenerate");
            return response.ok(res)
        } catch (error) {
            session.flash('error', error.message);
            return response.redirect().back();
        }
    }
    async deleteSession({ response, user, session }: HttpContext) {
        try {
            const penggunaId = String(user?.id_pengguna);
            await NotifikasiWhatsappServices.deleteSession(penggunaId);
            session.flash('success', "Berhasil disconnect dari whatsapp");
            return response.redirect().toRoute('notifikasiWhatsapp.index');
        } catch (error) {
            session.flash('error', error.message);
            return response.redirect().back();
        }
    }
}