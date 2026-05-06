export const options = (chartId: string, width?: string, categories?: string[]) => {
  return {
    chart: {
      id: chartId,
      width: width ?? undefined,
    },
    xaxis: {
      categories: categories ?? [],
    },
  }
}
