import NotifikasiWhatsapp from "#models/notifikasi_whatsapp";
import axios from "axios";

export class NotifikasiWhatsappServices {
    static async createSession(id_zawa: string, session_id: string, id_pengguna: string, status: string) {
        const data = await NotifikasiWhatsapp.updateOrCreate({ id_pengguna: id_pengguna }, {
            id_zawa: id_zawa,
            session_id: session_id,
            id_pengguna: id_pengguna,
            status
        });
        return data;
    }
    static async getQr(id_pengguna: string) {
        const whatsappSession = await NotifikasiWhatsapp.query().where('id_pengguna', id_pengguna).first();

        if (!whatsappSession) {
            throw new Error("Session tidak ada.");
        }
        const res = await axios.get(`https://api-zawa.azickri.com/session`, {
            headers: {
                id: String(whatsappSession?.id_zawa),
                'session-id': String(whatsappSession?.session_id),
            }
        });
        const isConnected = res.data.isConnected;
        const newStatus = isConnected ? "CONNECTED" : "NOT_CONNECTED";

        if (whatsappSession?.status !== newStatus) {
            await NotifikasiWhatsapp.query().where('id_pengguna', id_pengguna).update({
                status: newStatus,
                session_id: whatsappSession.session_id,
                id_zawa: whatsappSession.id_zawa,
            })
        }
        return res.data;
    }
    static async deleteSession(id_pengguna: string) {
        const whatsappSession = await NotifikasiWhatsapp.query().where('id_pengguna', id_pengguna).first();

        if (!whatsappSession) {
            throw new Error("Session tidak ada.");
        }
        console.log({
            id: whatsappSession?.id_zawa,
            session_id: whatsappSession?.session_id
        })
        const res = await axios.delete(`https://api-zawa.azickri.com/session`, {
            headers: {
                id: String(whatsappSession?.id_zawa),
                'session-id': String(whatsappSession?.session_id),
            }
        })
        await NotifikasiWhatsapp.query().where('id_pengguna', id_pengguna).update({
            status: "NOT_CONNECTED",
            session_id: null,
            id_zawa: null,
        })
        return res.data;
    }
}