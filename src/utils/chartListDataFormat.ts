import Decimal from 'decimal.js';
import { getPercent } from '@/schema-component/utils';


export interface ChartListItem {
    name: string; value: number; percent?: number,
    percentFormat?: number,
    percentDisplay?: string
}


export function getTotalNum(chartListData: ChartListItem[]) {
    if (!chartListData || !chartListData.length) {
        return 0
    }
    const totalNum = chartListData.reduce((memo, cur) => {
        memo = memo.add(cur.value || 0)
        return memo;
    }, new Decimal(0))

    return totalNum.toNumber()

}


export const chartListDataFormat = (chartListData: ChartListItem[] = []) => {
    const totalNum = getTotalNum(chartListData)
    const newChartListData = chartListData.map(c => {
        const value = typeof c.value !== 'number' ? new Decimal(c.value || 0).toNumber() : c.value;
        const percent = new Decimal(Decimal.div(value, totalNum).toFixed(2)).toNumber();
        const percentFormat = getPercent(value, totalNum, { fixed: 1 })
        return {
            ...c,
            value,
            percent,
            percentFormat,
            percentDisplay: `${percentFormat}%`


        }
    })
    return {
        totalNum,
        chartListData: newChartListData

    }
}

export function findItemByName(chartListData: ChartListItem[] = [], name: string) {
    const item = chartListData.find(item => item.name === name)
    return {

        ...item,
        value: item.value || 0,
        percent: item.percent || 0,
        percentFormat: item.percentFormat || 0,
        percentDisplay: item.percentDisplay || "0%",


    }

}