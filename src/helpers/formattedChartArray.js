export function formattedChartArray ( data, titles){

  return data.map((el, index) => { return {...el.chart, title: titles[index] } })
}