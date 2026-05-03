import Button from '~/components/ui/Button/Button'
import Heading from '~/components/ui/Heading'
import Paragraph from '~/components/ui/Paragraph'
import { useForm, usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Modal from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import { Link } from '@adonisjs/inertia/react'

export default function NotifikasiWhatsapp() {
  const { post, processing, delete: destroy } = useForm({})
  const { whatsappSession } = usePage<{
    whatsappSession: {
      id_zawa: string
      session_id: string
      status: string
      created_at: string
      updated_at: string
    }
  }>().props
  const [qrCode, setQrCode] = useState(null)
  const [open, setIsOpen] = useState(false)

  useEffect(() => {
    if (whatsappSession?.status !== 'QR_READY') return

    const interval = setInterval(async () => {
      try {
        const res = await axios.get('/notifikasi-whatsapp/get-qr')
        console.log(res.data.qrcode)
        setQrCode(res.data.qrcode)
        setIsOpen(true)

        if (res.data.isConnected) {
          clearInterval(interval)
          setIsOpen(false)
        }
      } catch (err) {
        clearInterval(interval)
      }
    }, 10000)
    return () => clearInterval(interval)
  }, [whatsappSession?.status])

  const handleConnect = async () => {
    post('/notifikasi-whatsapp/createSession')
  }
  const handleDisconnect = async () => {
    destroy('/notifikasi-whatsapp/deleteSession')
  }
  return (
    <>
      <div className="flex mx-auto justify-center">
        <Heading level={1} color="dark_slate_grey" className="font-bold">
          Notifikasi Whatsapp
        </Heading>
      </div>
      <div className=" flex flex-wrap w-full mx-auto justify-center max-w-4xl gap-5">
        <div className="flex flex-col bg-white shadow-md rounded-md mt-5 p-6 gap-6 w-96">
          <div className="flex items-center gap-2">
            <Paragraph size="lg" color="dark_slate_grey">
              Status :
            </Paragraph>
            <span
              className={`w-3 h-3 rounded-full ${whatsappSession?.status === 'CONNECTED'
                ? 'bg-green-500'
                : whatsappSession?.status === 'QR_READY'
                  ? 'bg-yellow-400'
                  : 'bg-red-500'
                }`}
            />
            <Paragraph size="lg" color="dark_slate_grey">
              {whatsappSession?.status === 'CONNECTED'
                ? 'Connected'
                : whatsappSession?.status === 'QR_READY'
                  ? 'Scan QR'
                  : 'Disconnected'}
            </Paragraph>
          </div>
          {(whatsappSession?.status === 'NOT_CONNECTED' ||
            whatsappSession?.status === undefined) && (
              <>
                <Paragraph size="md" color="dark_grey">
                  Klik tombol di bawah untuk menghubungkan WhatsApp ke sistem.
                </Paragraph>
                <Button
                  onClick={handleConnect}
                  variant={1}
                  size="md"
                  className="w-fit"
                  disabled={processing}
                >
                  {processing ? 'Proses...' : 'Buat Session'}
                </Button>
              </>
            )}
          {whatsappSession?.status === 'QR_READY' && (
            <>
              {!qrCode && (
                <Paragraph size="md" color="dark_grey">
                  Generating QR...
                </Paragraph>
              )}
              <Modal
                open={open}
                onClose={() => setIsOpen(false)}
                closeOnEsc={false}
                closeOnOverlayClick={false}
                center
                styles={{ modal: { width: '1024px' } }}
              >
                <div className="flex flex-col items-center gap-4">
                  <>
                    <img src={`data:image/png;base64,${qrCode}`} className="w-64 h-64" />
                    <Paragraph size="md" color="dark_grey" className="text-sm text-gray-500">
                      Scan QR dengan WhatsApp
                    </Paragraph>
                  </>
                </div>
              </Modal>
            </>
          )}
          {whatsappSession?.status === 'CONNECTED' && (
            <Button variant={1} size="md" className="w-fit" onClick={handleDisconnect}>
              Hapus Session
            </Button>
          )}
        </div>
        <div className="flex flex-col bg-white shadow-md rounded-md mt-5 p-6 gap-6 w-96">
          <Heading level={2} color="dark_slate_grey" className="font-bold">
            Daftar Penerima
          </Heading>
          <Paragraph size="md" color="dark_grey">
            Kelola daftar kontak yang akan menerima notifikasi WhatsApp.
          </Paragraph>
          <Button variant={1} size="md" className="w-fit">
            <Link route="daftarPenerima.index">Daftar Penerima</Link>
          </Button>
        </div>
        <div className="flex flex-col bg-white shadow-md rounded-md mt-5 p-6 gap-6 w-96">
          <Heading level={2} color="dark_slate_grey" className="font-bold">
            Atur Tipe Notifikasi
          </Heading>
          <Paragraph size="md" color="dark_grey">
            Kelola dan konfigurasi tipe/jenis notifikasi yang tersedia.
          </Paragraph>
          <Button variant={1} size="md" className="w-fit">
            <Link route="tipeNotifikasi.index">Atur Tipe Notifikasi</Link>
          </Button>
        </div>
        <div className="flex flex-col bg-white shadow-md rounded-md mt-5 p-6 gap-6 w-96">
          <Heading level={2} color="dark_slate_grey" className="font-bold">
            Atur Template Notifikasi
          </Heading>
          <Paragraph size="md" color="dark_grey">
            Kelola template pesan WhatsApp untuk setiap tipe notifikasi.
          </Paragraph>
          <Button variant={1} size="md" className="w-fit">
            <Link route="templateNotifikasi.index">Atur Template Notifikasi </Link>
          </Button>
        </div>
      </div>
    </>
  )
}
