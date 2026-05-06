import Paragraph from '~/components/ui/Paragraph'
import Chart from 'react-apexcharts/core'
import 'apexcharts/bar'
import 'apexcharts/features/legend'
import { ApexNonAxisChartSeries } from 'apexcharts/bar'

type MonitoringProps = {
  title: string
  options: object
  series: ApexNonAxisChartSeries
}
export default function MonitoringChart({ title, options, series }: MonitoringProps) {
  return (
    <div className="flex flex-col gap-4 bg-white shadow-md px-5 py-5 rounded-md flex-1">
      <div className="flex flex-row items-center gap-4 ">
        <Paragraph size="md" color="dark_slate_grey">
          {title}
        </Paragraph>
      </div>
      <div className="flex-1">
        <Chart options={options} series={series} type="bar" height={500} />
      </div>
    </div>
  )
}
