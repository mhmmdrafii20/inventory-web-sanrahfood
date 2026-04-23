import Button from "~/components/ui/Button/Button";
import Heading from "~/components/ui/Heading";
import Paragraph from "~/components/ui/Paragraph";
import { useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import axios from "axios";
export default function IntegrasiWhatsapp() {
    const { post, processing } = useForm({});
    const { whatsappSession } = usePage<{ whatsappSession: { id_zawa: string, session_id: string, status: string, created_at: string, updated_at: string } }>().props;
    const [qrCode, setQrCode] = useState(null);

    useEffect(() => {
        if (whatsappSession.status !== "QR_READY") return

        const interval = setInterval(async () => {
            try {
                const res = await axios.get('/integrasi-whatsapp/get-qr');
                setQrCode(res.data.qrcode);

                if (res.data.isConnected) {
                    clearInterval(interval);
                }
            } catch (err) {
                console.error(err.response.data || err.message);
                clearInterval(interval);
            }
        }, 10000);
        return () => clearInterval(interval)
    }, [whatsappSession.status])

    const handleConnect = async () => {
        post('/integrasi-whatsapp/connect');
    }
    return (
        <>
            <Heading level={1} color="dark_slate_grey" className="font-bold">
                Integrasi Whatsapp
            </Heading>
            <div className="flex flex-col bg-white shadow-md rounded-md mt-5 p-6 gap-6">
                <div className="flex items-center gap-2">
                    <Paragraph size="lg" color="dark_slate_grey">Status :</Paragraph>
                    <span
                        className={`w-3 h-3 rounded-full ${whatsappSession.status === "CONNECTED"
                            ? "bg-green-500"
                            : whatsappSession.status === "QR_READY"
                                ? "bg-yellow-400"
                                : "bg-red-500"
                            }`}
                    />
                    <Paragraph size="lg" color="dark_slate_grey">
                        {whatsappSession.status === "CONNECTED"
                            ? "Connected"
                            : whatsappSession.status === "QR_READY"
                                ? "Scan QR"
                                : "Disconnected"}
                    </Paragraph>
                </div>
                {whatsappSession.status === "NOT_CONNECTED" && (
                    <Button
                        onClick={handleConnect}
                        variant={1}
                        size="md"
                        className="w-fit"
                        disabled={processing}
                    >
                        {processing ? "Connecting..." : "Connect Whatsapp"}
                    </Button>
                )}
                {whatsappSession.status === "QR_READY" && (
                    <div className="flex flex-col items-center gap-4">
                        {qrCode ? (
                            <>
                                <img
                                    src={`data:image/png;base64,${qrCode}`}
                                    className="w-64 h-64"
                                />
                                <p className="text-sm text-gray-500">
                                    Scan QR dengan WhatsApp
                                </p>
                            </>
                        ) : (
                            <p className="text-sm text-gray-500">
                                Generating QR...
                            </p>
                        )}
                    </div>
                )}
                {whatsappSession.status === "CONNECTED" && (
                    <Button variant={1} size="md" className="w-fit">
                        Disconnect Whatsapp
                    </Button>
                )}
            </div>
        </>
    )
}