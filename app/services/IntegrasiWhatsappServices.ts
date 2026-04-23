import IntegrasiWhatsapp from "#models/integrasi_whatsapp";
import axios from "axios";

export class IntegrasiWhatsappServices {
    static async connect(id_zawa: string, session_id: string, id_pengguna: string, status: string) {
        const data = await IntegrasiWhatsapp.updateOrCreate({ id_pengguna: id_pengguna }, {
            id_zawa: id_zawa,
            session_id: session_id,
            id_pengguna: id_pengguna,
            status
        });
        return data;
    }
    static async getQr(id_pengguna: string) {
        try {
            const whatsappSession = await IntegrasiWhatsapp.query().where('id_pengguna', id_pengguna).first();

            if (!whatsappSession) {
                return {
                    message: "Session belum dibuat."
                }
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
                await IntegrasiWhatsapp.query().where('id_pengguna', id_pengguna).update({
                    status: newStatus,
                    session_id: newStatus === "NOT_CONNECTED" ? null : whatsappSession.session_id,
                    id_zawa: newStatus === "NOT_CONNECTED" ? null : whatsappSession.id_zawa,
                })
            }
            return res.data;

        } catch (error) {
            console.error(error);
        }
    }
}