import Heading from '~/components/ui/Heading'
import Paragraph from '~/components/ui/Paragraph'
import { usePage, router } from '@inertiajs/react'
import Input from '~/components/ui/Input'
import TextArea from '~/components/ui/Textarea'
import ActionButton from '~/components/ui/Button/ActionButton'
import { FaSearch, FaCheck, FaTimes, FaEye } from 'react-icons/fa'
import { useState } from 'react'
import Modal from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import { showApproveDialog, showRejectDialog } from '../../../utils/sweetalert'

export default function ApprovalBahanBaku() {
  const { adjustmentBahanBaku, searchRes } = usePage<{
    adjustmentBahanBaku: {
      idStokBahanBakuAdjustment: number
      idBahanBaku: number
      idPengguna: string
      jenisStok: string
      jumlah: number
      statusAdjustment: string
      tanggalAdjustment: string
      catatanTambahan: string
      approvedBy: string | null
      approvedAt: string | null
      bahan: { namaBahanBaku: string; satuan: string }
      pengguna: { namaPengguna: string }
    }[]
    searchRes: {
      idStokBahanBakuAdjustment: number
      idBahanBaku: number
      idPengguna: string
      jenisStok: string
      jumlah: number
      statusAdjustment: string
      tanggalAdjustment: string
      catatanTambahan: string
      approvedBy: string | null
      approvedAt: string | null
      bahan: { namaBahanBaku: string; satuan: string }
      pengguna: { namaPengguna: string }
    }[]
  }>().props

  const [open, setIsOpen] = useState(false)
  const [selectedCatatan, setSelectedCatatan] = useState('')
  const [searchData, setSearchData] = useState('')

  function handleSearch() {
    router.get(
      '/approval-stok-bahan-baku/search',
      { search: searchData },
      {
        preserveState: true,
        replace: true,
      }
    )
  }

  function handleApprove(id: number) {
    showApproveDialog(() => {
      router.post(`/approval-stok-bahan-baku/approve/${id}`)
    })
  }

  function handleReject(id: number) {
    showRejectDialog(() => {
      router.post(`/approval-stok-bahan-baku/reject/${id}`)
    })
  }

  const displayData = searchRes && searchRes.length > 0 ? searchRes : adjustmentBahanBaku

  return (
    <>
      <Heading level={1} color="dark_slate_grey" className="font-bold">
        Approval Stok Bahan Baku
      </Heading>

      <div className="flex flex-col w-full bg-white shadow-md rounded-md p-5">
        <div className="w-full flex flex-row items-center gap-3">
          <Input
            variant={1}
            size="md"
            type="text"
            placeholder="Cari Nama Bahan Baku..."
            className="flex-1"
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
          />
          <ActionButton as="button" type="search" size="lg" onClick={handleSearch}>
            <FaSearch />
          </ActionButton>
        </div>

        <div className="max-h-[500px] overflow-y-auto">
          <table className="w-full border-collapse mt-5 bg-white">
            <thead>
              <tr>
                <th className="border border-gray-300 py-3">Nama Bahan Baku</th>
                <th className="border border-gray-300 py-3">Jenis Stok</th>
                <th className="border border-gray-300 py-3">Jumlah</th>
                <th className="border border-gray-300 py-3">Tanggal Adjustment</th>
                <th className="border border-gray-300 py-3">Status</th>
                <th className="border border-gray-300 py-3">Diajukan Oleh</th>
                <th className="border border-gray-300 py-3">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {displayData?.length > 0 ? (
                displayData.map((items) => (
                  <tr key={items.idStokBahanBakuAdjustment}>
                    <td className="border border-gray-300 py-3 px-5">
                      <Paragraph size="lg">{items.bahan.namaBahanBaku}</Paragraph>
                    </td>

                    <td className="border border-gray-300 py-3 px-5">
                      <Paragraph
                        size="lg"
                        className={`${items.jenisStok === 'MASUK' ? 'text-green-800 font-bold' : 'text-red-500 font-bold'}`}
                      >
                        {items.jenisStok}
                      </Paragraph>
                    </td>

                    <td className="border border-gray-300 py-3 px-5">
                      <Paragraph size="lg">
                        {items.jumlah} {items.bahan.satuan}
                      </Paragraph>
                    </td>

                    <td className="border border-gray-300 py-3 px-5">
                      <Paragraph size="lg">
                        {dayjs(items.tanggalAdjustment).format('DD/MM/YYYY')}
                      </Paragraph>
                    </td>

                    <td className="border border-gray-300 py-3 px-5">
                      <Paragraph size="lg">
                        <span
                          className={`px-2 py-1 rounded-sm text-white text-sm font-semibold ${
                            items.statusAdjustment === 'APPROVED'
                              ? 'bg-green-600'
                              : items.statusAdjustment === 'REJECTED'
                                ? 'bg-red-500'
                                : 'bg-yellow-500'
                          }`}
                        >
                          {items.statusAdjustment}
                        </span>
                      </Paragraph>
                    </td>

                    <td className="border border-gray-300 py-3 px-5">
                      <Paragraph size="lg">{items.pengguna?.namaPengguna}</Paragraph>
                    </td>

                    <td className="border border-gray-300 py-3 px-5">
                      {items.statusAdjustment === 'PENDING' ? (
                        <div className="flex flex-row items-center gap-2 justify-center">
                          <ActionButton
                            as="button"
                            type="restore"
                            size="sm"
                            onClick={() => handleApprove(items.idStokBahanBakuAdjustment)}
                          >
                            <FaCheck />
                          </ActionButton>

                          <ActionButton
                            as="button"
                            type="delete"
                            size="sm"
                            onClick={() => handleReject(items.idStokBahanBakuAdjustment)}
                          >
                            <FaTimes />
                          </ActionButton>

                          <ActionButton
                            as="button"
                            type="view"
                            size="sm"
                            onClick={() => {
                              setSelectedCatatan(items.catatanTambahan)
                              setIsOpen(true)
                            }}
                          >
                            <FaEye />
                          </ActionButton>
                        </div>
                      ) : (
                        <Paragraph size="lg" className="text-center text-gray-400">
                          —
                        </Paragraph>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="border border-gray-300">
                  <td colSpan={7} className="text-center py-4">
                    <Paragraph size="lg">Tidak Ada Data Adjustment</Paragraph>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        open={open}
        onClose={() => setIsOpen(false)}
        center
        styles={{ modal: { width: '1024px' } }}
      >
        <Heading level={1} color="dark_slate_grey" className="font-bold">
          Detail Adjustment Bahan Baku
        </Heading>

        <div className="flex flex-col gap-3">
          <Paragraph size="lg">Catatan Tambahan</Paragraph>
          <TextArea
            variant={1}
            size="md"
            disabled
            value={selectedCatatan}
            className="w-full"
            rows={5}
          />
        </div>
      </Modal>
    </>
  )
}
