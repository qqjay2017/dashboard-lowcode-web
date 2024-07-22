

const standard = [

    {
        name: "合同未按期上传",
        value: 150,

    },
    {
        name: "超龄人员",
        value: 230,

    },
    {
        name: "特殊工种证书到期",
        value: 224,

    },
    {
        name: "人员健康状态异常",
        value: 218,

    },
    {
        name: "入场安全教育未完成",
        value: 135,

    },
    {
        name: "黑名单&红色通缉令",
        value: 147,

    },

]

export const chartMockData = {
    standard
}

export interface ChartListItem { name: string; value: number }