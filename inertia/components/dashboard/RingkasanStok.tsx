import Heading from '~/components/ui/Heading'
type RingkasanStokProps = {
  title: string
  total: number
  status?: number | string
  statusColor?: number | string
}

export default function RingkasanStok({ title, total, status, statusColor }: RingkasanStokProps) {
  return (
    <div className="bg-white shadow-md px-5 py-5 rounded-xl border-l-4 border-l-dark-teal">
      <div className="flex flex-col ">
        <Heading level={3} color="dark_grey">
          {title}
        </Heading>
        <Heading level={1} color="ultra_light_grey" className="font-bold">
          {total}
        </Heading>
        <div className="flex flex-row gap-3">
          <span
            className={`text-sm uppercase ${statusColor ? `${statusColor}` : `${statusColor}`}`}
          >
            {status ? `${status} ` : `${status}`}
          </span>
        </div>
      </div>
    </div>
  )
}
