INSERT INTO dashboard.ComponentChart (createdAt,updateAt,published,name,description,template,`type`,coverThumbnail) VALUES
	 ('2024-07-18 13:12:12.581','2024-07-19 12:00:56.809',0,'基础折线图','基础折线图测试','option = {
  xAxis: {
    type: ''category'',
    data: [''Mon'', ''Tue'', ''Wed'', ''Thu'', ''Fri'', ''Sat'', ''Sun'']
  },
  yAxis: {
    type: ''value''
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: ''line''
    }
  ]
};','line','data:image/webp;base64,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'),
	 ('2024-07-19 01:36:51.239','2024-07-19 12:27:17.429',0,'渐变堆叠面积图','Gradient Stacked Area Chart
','option = {
  color: [''#80FFA5'', ''#00DDFF'', ''#37A2FF'', ''#FF0087'', ''#FFBF00''],
  title: {
    text: ''Gradient Stacked Area Chart''
  },
  tooltip: {
    trigger: ''axis'',
    axisPointer: {
      type: ''cross'',
      label: {
        backgroundColor: ''#6a7985''
      }
    }
  },
  legend: {
    data: [''Line 1'', ''Line 2'', ''Line 3'', ''Line 4'', ''Line 5'']
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    left: ''3%'',
    right: ''4%'',
    bottom: ''3%'',
    containLabel: true
  },
  xAxis: [
    {
      type: ''category'',
      boundaryGap: false,
      data: [''Mon'', ''Tue'', ''Wed'', ''Thu'', ''Fri'', ''Sat'', ''Sun'']
    }
  ],
  yAxis: [
    {
      type: ''value''
    }
  ],
  series: [
    {
      name: ''Line 1'',
      type: ''line'',
      stack: ''Total'',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: ''rgb(128, 255, 165)''
          },
          {
            offset: 1,
            color: ''rgb(1, 191, 236)''
          }
        ])
      },
      emphasis: {
        focus: ''series''
      },
      data: [140, 232, 101, 264, 90, 340, 250]
    },
    {
      name: ''Line 2'',
      type: ''line'',
      stack: ''Total'',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: ''rgb(0, 221, 255)''
          },
          {
            offset: 1,
            color: ''rgb(77, 119, 255)''
          }
        ])
      },
      emphasis: {
        focus: ''series''
      },
      data: [120, 282, 111, 234, 220, 340, 310]
    },
    {
      name: ''Line 3'',
      type: ''line'',
      stack: ''Total'',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: ''rgb(55, 162, 255)''
          },
          {
            offset: 1,
            color: ''rgb(116, 21, 219)''
          }
        ])
      },
      emphasis: {
        focus: ''series''
      },
      data: [320, 132, 201, 334, 190, 130, 220]
    },
    {
      name: ''Line 4'',
      type: ''line'',
      stack: ''Total'',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: ''rgb(255, 0, 135)''
          },
          {
            offset: 1,
            color: ''rgb(135, 0, 157)''
          }
        ])
      },
      emphasis: {
        focus: ''series''
      },
      data: [220, 402, 231, 134, 190, 230, 120]
    },
    {
      name: ''Line 5'',
      type: ''line'',
      stack: ''Total'',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      label: {
        show: true,
        position: ''top''
      },
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: ''rgb(255, 191, 0)''
          },
          {
            offset: 1,
            color: ''rgb(224, 62, 76)''
          }
        ])
      },
      emphasis: {
        focus: ''series''
      },
      data: [220, 302, 181, 234, 210, 290, 150]
    }
  ]
};','line','data:image/webp;base64,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'),
	 ('2024-07-19 13:16:00.335','2024-07-21 00:27:31.760',0,'象形柱状图(人员分布)','参建人员分布统计','const { get } = chartHelps;
const constructionTotal = get(busData, "constructionTotal", 0);

option = {
    title: [
        {
            text: ''单位：人'',
            textStyle: {
                lineHeight: 12,
                color: token.colorTextSecondLabel,
                fontSize: 12,

            },
            textAlign: ''left'',
            textVerticalAlign: ''top'',
            padding: 0,
            top: 24,
            left: 12,

        },
        {
            text: `目前在册人数共计 {green|  ${constructionTotal} } 人`,
            textStyle: {
                lineHeight: 12,
                color: token.colorTextSecondLabel,
                fontSize: 12,
                rich: {
                    green: {
                        color: token.textNumGreen,
                        padding: [0, 2],
                    },
                },

            },

            padding: 0,
            top: 24,
            right: 24,

        },
    ],

    tooltip: {
        confine: true,
        borderWidth: 0,
        backgroundColor: ''rgba(0, 0, 0, 0.50)'',
        textStyle: {
            align: ''left'',
            color: ''rgba(255, 255, 255, 1)'',
        },
        trigger: ''axis'',
        axisPointer: {
            type: ''none'',
        },

    },
    grid: {
        containLabel: true,
        left: 24,
        top: 58,

        right: 24,
        bottom: 24,
    },
    xAxis: [
        {

            type: ''category'',
            data: chartListData.map(c => c.name),
            axisLine: {
                show: true,
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: false,

            },
            axisLabel: {
                interval: 0,
                show: true,
                fontSize: 12,
                color: token.colorTextSecondLabel, // X轴文字颜色

            },

        },
    ],
    yAxis: [{
        type: "value",

        splitLine: {
            show: false,

        },
        axisTick: {
            show: false,
        },
        axisLine: {
            show: false,

        },
        axisLabel: {
            show: true,
            fontSize: 12,
            color: token.colorTextSecondLabel,

        },
    }],
    series: [{
        name: "参建人员",
        type: "bar",
        barWidth: 15,
        itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: "rgba(22, 255, 185, 1)",
            }, {
                offset: 1,
                color: "rgba(140, 249, 242, 1)",
            }]),
        },
        data: chartListData.map(c => c.value),
        z: 10,
        zlevel: 0,
    }, {
        // 分隔
        type: "pictorialBar",
        itemStyle: {
            color: token.nodeContentBg,

        },
        tooltip: {
            show: false,
        },
        symbolRepeat: "fixed",
        symbolMargin: 2,
        symbol: "rect",
        symbolClip: true,
        symbolSize: [18, 2],
        symbolPosition: "start",
        symbolOffset: [1, 1],
        data: chartListData.map(c => c.value),

        z: 0,
        zlevel: 1,
    }],
}','bar','data:image/webp;base64,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'),
	 ('2024-07-19 13:44:02.932','2024-07-19 14:20:58.370',0,'南丁格尔玫瑰图','合规风险预警分析使用
','option = {
  tooltip: token.isDarkTheme ? {
    confine: true,
    borderWidth: 0,
    backgroundColor: "rgba(0, 0, 0, 0.50)", // 设置背景图片 rgba格式
    textStyle: {
      align: "left",
      color: "rgba(255, 255, 255, 1)", // 设置文字颜色
    },
    trigger: "item",
    axisPointer: {
      type: "none",
    },
  } : {
    confine: true,
    borderWidth: 0,
    trigger: "item",
    axisPointer: {
      type: "none",
    },
  },
  legend: {
    orient: "vertical",
    right: 30,
    top: "center",

    itemWidth: 6,
    itemHeight: 6,
    textStyle: {
      color: "#C3D4E5",
    },
    data: chartListData.map((d) => d.name),
    formatter(name) {
      return `${name}   `;
    },
  },
  series: [
    {
      name: "合规风险预警分析",
      label: {
        show: true,
        position: "inside",
        color: "#fff",
        formatter: ({ percent }) => {
          return `${percent}%`;
        },
      },
      type: "pie",
      radius: [10, 80],
      center: ["35%", "50%"],
      roseType: "area",
      itemStyle: {
        borderRadius: 0,
      },
      data: chartListData,
    },
  ],

};','pie','data:image/webp;base64,UklGRlonAABXRUJQVlA4WAoAAAAgAAAA8wIAXAEASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggbCUAAFCtAJ0BKvQCXQE+bTaYSSQioqIh8kiIgA2JZ278QTAbEz5514OuF8o72qOzf2v9rehQ5S8E/lT3EZ6eu/+l/dfV/6lv097AH6df6j9aP2E7l/7deoL9hv2q947/Q/sh7sP8p9gHyAf4P/O+t36hvoAfyL/cem5+5nwb/3H/ifuH8B37Hf+D2AP/Z6gHU38V+3X/G9Ed5P9tv7x7ZtebqZfIvtb+N/tH7vet/ej8jv8X1Bfx3+bf6L0tvk+zQ1//I/9D/AewF64/R/9f/gPEi/y/Q76t/6j3AP5t/X/+H9uvzX/pPAi+2/6b2Av5j/Z/91/kPy7+lr+c/8X+c/137le1n9C/y3/o/0X+j+Qb+bf1z/p/4X20P//7hP3W///ujfsR//wyAf1dfPVJaxvfYK8ZXzvl4cP2VrMprqUB6HeUadDIkCGWWnPRUWVHm3K8U09H66tqH8q/SuuWXYNMAa6ruZgN8aQO4bveXragtiU98QE+m9DirnAg1hvx/imSWgdkcKbhmm0XX2B6IOmQHe0/01a623WTdW/Ql+3J7PofU6gJSy/8G8c9uR3WuPOAkYgGSIqVKqe527Hth8Alvy40JiNa5zWE1KtjHMYNfcx7TYDvAoCVeDFpQZWMahPdnHzO+uyC5cDLN35vdwD4LSg3Eu0AHy1XkHwWFk85lwpNO39IVjd4rV6Upx/LhM4FawWRUgEcOF1tjqcHPT3cv8y0/H1vNwlrMgPFcFy5TaE0Yi/UHzpZzyVqXyKCMGFzugvIYj0mF4jSIjuqzcyHENnD2iDO5LZekBlq22jjfeu7LP5XZUxYqDfFF+4azQvV9VicKWAkEFcNR2m4c7ZohdmDo2VYymTQg/IuQRlOzdYDpCJ2O2eTNz2sdcAnOGxx0kGyFafQw+OTN0sSsO8qxFCSNitiFQQt8fDCfsVJLwPyP8aiWPhg/nAwmnDAxGfL5p8C1fFfepwiVFcLT2NL9d3cBdQ7BVInCoqcOhuFWPkfHQPN2IkMSjxfugu6JS1BzjlJFC9OD7I1eSyuaBUakFonJqcxgrQAU4Y6TjA7cJmlX89gFIK7VFgI3GjS7T3/7Plt72Dr5XmrKpsDz99ed50OFxJi1QfeUUqgNCnB4YSvvLBi9qAFGAisKwizgMJHUehb+NHpaETf1nO0LZpoBBkfg6ANHKNPJACYXqYroZf8PL+Q7V3HP3TESWO/BVeD3IGhr1E41oM+yRn6SA3PCGG4u2hSoegQtXVBXEfvQNgJMwSJDEjtWkmozoSZppkBI7YTT2nYgLBFzW+iPGHCKex85iWofmu/C0R4AvsZbAus1RrxNU2Qwt3i+Q7q4AUMiabwWH+Q9oEiABlvC8RTpcG292Txp2VpHOvtW8YyTkRtB9tHKA9zK01YTxajXLoNw3WLLySfJgPP92ChlXjZZjzQyZ5lyPwQwcUP5fUmQ5Bq01cEz/z1n+/vDEPDFIo0Tl2ezqD5FCuB4Ue9p/pq6fS0XXSBcQP2gp7NelOCMHBKo42CObpYao2WEYNaQZptDdicwEfn1vQ0n3irCkKYdSTwUriSGaQyELlz5mWiqhXvKDUIKJ3jD78hnvsUC97Q9WbFbQPzp+K31koztEjIObuTTyh5pp006eR7eKZf3E14u2B75dg0vMtidJuX5xfH0SetCWtNW+7qUzX9XxycfdQP08ZOKud9EnFi/yfFKud9kacAq02LUeRsCBNGDWPlBC9m81l9NFSXrlSgPRjlyWWOhr5k+E+5i9eBzk+64w2o2a512FEZTX8GqYgddqGDvXpwypGQ1TPpE2XpCCKuDCQTc8ImJtV4fBZQu72q0k9iPBH8ZPsC38ikFoYD6JxalK81YAD++g8f/RkZ+jPx/6SyIMPLdh974N2fP4F6/F7agvrMTHwYldfy/FpDERiX3sptW8gTFuuZKcM3dcoLpqqTBHAw59t9jNHb7TcWomcI8Hp/sGqNuENGq2CVVp5l/iaiZjUC+JUSzoF/RWEzuvW6q2avTmxNK9Kmm5jh2YoiquNr2S5hVU19qTdwbnJkYSKxqqwbMvCzwkNEAsXKNdIGHmPOeRFtSi9M4ytaCbzZMlUJi3m6bF1bjG1+uFgGu0fwhT7OkTpxl9KNrCzKjiTv9epsWGVFZfFXHFuIn3A70SVp3NGWZmIODL+G708RjtdcZtm41okMpLElUTe+aWaullWcGpjfuX/FIMIStsL4U2TbGRk8QvdkMR145qnss2wJ89EFZEHTCL09YzKNOmcV7DwNx8LliNC1pEnDdsBiw5KO79AuAW3JdSkW6jPAzzX+KYFZ2ZGbvLanWehZJ3RYtXo+pGghL2lDUnpIcDp2+2rcLbfAzPIz6qnbMiIR1NodUnPWbwsNna49qIukqYvRwxmreySsW94JHlmjB0wydr4Wdz+VUYZqJdC/pAMMJ7uzFUbdNtM5f9i5kMuzA8eDuyX0+6TsyTQQqxRuxdLXclhas3jIAavw9SW3oFeFhkQhMuVH3VvkkKZ5lzaHL6QoUYowLm4QByiorcA7mO380OpI+LmnFcynPR71ro9OQcKMeJvPs0XJUV1axDTMFMGE+Ig4+NFs7dp072QfVu7caAjsMiQsq51LE6rcd9fu/aAEQSlMt65pYM5ZPE/FK+g0I3CX58IJ/vay9i68liKvhCbNQnrSefGduNeyRTBA+4LX/MFuiiQ3Y10mxL4RkSh300y04Y83h3ZoaaURTyfhbEDnhW2x9MO1bzq6kvu+Ia5b9wM8h/VBCzRJZqG4ayvmlqcYvpaD/di3AHpTjvNdcSmHJ6HIPjsozj7YOkDNpr4BwZb7mNZUBU1K5WMohqhPtJ/ukWfWDjAu8u8/MbuIEVXIYRxY1ANtyk4hMmPbNSQ9355RhI1NuyBGoK0uMS1YRdbjcuPAE57k+0hIxcC4SU3VEaGjnMfUtPbLtVqlU47ktkbyCdluAiZtba/LaGXhFllGkW0CUhENlM5PwSBYwPd55daCBY7YcPv+NvSpm9PpiUX3UWvDMo7AAAB5BMK9qh9GDsVJtsPD/Tv8yeN3L1HZcLk3Xo7CW+onqMh+3I7w9/cUC40Px8MAQTzyJFzdmv77cj2PVxbRlHACsr8kmLvluk0xRwf3mjQ8QLCWHwvXfEHp74G7ZnmHr47xtCY2ZRANJiWNkvmTe5SJRTee/ESPtR5YPNlhZiq81YsV6O1S1zb1+ug0Ywflog6t13LuOlCsbwp0ddK7P2TuzuJ5uzHGxp6M0+9aE/sGBAH5Rd7zOUWLvv0QVMw5GB+SqxCUkMWxSpobhn0s0ofU9U65/y3NTS2DQPXG8n5If3ycbkqoeFmKt7Ha5Us5LbDeaw+HNrJuxMGrhKn7cNys4FIsQ+StI7u/SuyRPjeMznzXnSojfK0rsiQWfmt8ByxanOlPkNNqusR5VsynsIlJWYJ5wDdH3bk/YiJBz0UYdw+/QDoDP2/GFxRYRA/IZ8yvDX052zQP6WFy+BSLe5h78eM8klwWfHQX9RSvNxNTgRg63zTSQpx+tJGPTmvUdcH5IlgPw2Z8dh4avX9amMJpa9JxJPXI8TNgR7NDROmyD7LacPJT0yh2Y+dSju6fU8KYqGY/QFgurtJeXadKUBFGdUCwKkiB3GuwDhFUflEYV2ZiqGLYqMuts4Q/z1SgP2JFvC/janVN1Lf0PYse15oTm0h1fSHmU8ELQX39Ku1y23TiOAnh46XOrTmI45vUFiGDp4RlyqJdX2t41093/X5p0/LBYVTlCyqK6od9TZ5+KS+bqLzjDQPldWtpBVoYBonqpCT8q9x/SqhPHYiecTdeYMUzSWW9xL+bLDqL6f9q5lLy8buDeWoZxpW1pS/mvhkVL/FwraFoTrMq9FZgbik0AA9hb0UOH1EJOih5RyyA5hA2XZDcz5sF1OhnmWA8OiL9tuj/fsW37RfoadCbs7OCVlGzsgwr5RdNufKzB5FKvnDNEdKqmQ78yce1BJS6IPhCdGsYM6VLH/8Bk5Uns+djR17+4g1oqAijDk/K2UfMhRIBGsgUWIX1JJROJrxdgRN9Sgln6b9AhF83XyFqTBEAz9kMM2j8Cs29bRwSCvrlfQVPa5symVXEiXm2HQPP/kDgwg2SqxKokO/hy6SSTGiNULj/PGslbgz4hSN8lcpe8rlNtlNepuPf1t6e6ETiv9IyiqZXI+42Dtdzr0HrCcbr3rxiEa+G1kgYtBftEvDAnZEp87PlS1a/pQ9e14HDv+ogC9X2PROtodPOL/19+chZCKsilG0bWkWr8Ksz9te0mzCMbhmiZ079Zumzl2S9ADOu6wIDZOtXxD0ufMh0KxCNsdmcL7H5zb/wUPrnhK4JNLWDGZEWj4HvVrXBkK+mcrsLIcCMjphQHoX2qm5KBSfZ0ZZA3XdGEeeOFcRraOyO9APqIujDC9zDd1hNio99SYr7F2RSEwVUp2bjaOfAvE4WfjBHfSN4oSBUewf6+Q4xaRc3SXrDjJ9k1EXO2AnaKVhi2ZooGRfK5e+k+Z1FRwiOoBrGNMuCUzgWsGgJyo8iLlV2l3nuIOr1yMbJaJvxHF9sDDpRGhGo5flISnWnZ7QdF79tiqNlHmyGukWY/wlgzieusyoGC0SxCWvZwd1kMe3rGRc+8PPL9Rmo34PXpqzjvg1cdkyI8HHQGYo7pfIarco+NJMFO1UE/yyztJo7WWGXwD6+VCtFdDFURK/gRucJCfN5lPhGlU5+HfmzYp+iJ99SM1crERAghebr8C4WrlTNk2sjxT9dbbZ6hwDjX4Y/KdaQiKMQzv+njDiXAHfMNB8XvtIAISxzKAd7Vi6zh9KxZCxD4Mv/XpUg3DpC+MnBMQUPQ6Cc8/Auo7GDdb8eFZnrTA5iZqbOfVzdfHjPpEriGaDSL0H+0wVet5t4La64L+cxSPut/g5sFEAIi5O0Ud/TEzwmtgAaFYfMtfi3P2aBMLtYyAosysxxEG8XhVjtTZH4ujgW12VIBbFeTWO3A3WiNtJQt7L7KnTmYISUz0aZq0kfBBa2Zn1ZeAdPjlfCMIcYL5ns6NAoPIubt7GVuDXmLSW9LgZyBv33Sm4w7H0yfboqObR0Pa+fjuHMNiLD5W1o6WKvMy4YFDAIEc92vF60UiexTwWZ3iFEQW7FpuCB5ROLFkd9XfdLGFHbOMff71togAEhgXTvm7qw9ahwiz+T0Ve6lzf79IC5/BXnRhvRkhI/qUzydTUXW+fKvqqbl62G4+9Gc6VBvNn4Pe/9ucNQG0gtgmU5bxpxnfqJQm352dceBJLOjwENq1KLE3WjNSOtt1cR2rIRCzsxCKRSaj200zra4jEUJaYGNcn3DLCKE7OtBwUTgxuD3Z4xTHcmFo+Y//eu6ID8SNAwGIObkfFfOrfCg2Zz69VUDcCeBcMwe4A7n8UgTuf+peMWbIFo9F090UNtYC/uG57tkuJsseXM4lG5unPcw8Ups7MT+Mg8PnrZyhkth5Hi5gtEpFbgU8ytcprGfgrxGBhWswXRFWpZGMJOM2o9N6kb/0Zd2SsOBxZtNOH6HLc3muarDpTDcG9kc9F+YNSJ5eMl7kAfk6ZuhCrHCNa5E66z5jkci4qKehsk9d5PcbNeUT84XE9TdU07icyZK0fpxqG2+fZ1LbGHUMmb6kCnv48dyzJfJvK5Ns8sq3sHp2KsDM+8NpWLUtypW8+FJK0UPn2h30z3UIupOQtzByTan9D4LTyW6z22gfDaQCMWpu87gIgBT/2EbG9LpkJ0S13etx487T6aBX+3ffxfcLoRpGUUGRFUG5I5O2+xn/vEo7pMqafF/MCNVIs8Nxge9sTsiYnA9OB8NefjotsndJTQTjQ4bAn7UdByXeJLU9+bsSnSIliUInaWvJwAou0hS2n5nm9F+dDx/3uIpDu3CBf12kPV0zd9zCmynpzZEFnIRO8+YeD5mP0krSrCliNfTXOx65fFF6L1f08sOMM8AIU8dkf4UgrCfPfTct67xSmyiR0a+qbyET6g2OWs8gSa8owiQ0U9NeShjtFybB8Q9Ibc8+dXZGaJf2nVkcIepxkZScGVXsCEe4GK+jp5bfWhuqsq5a+JuDqOzRn2l7w/XY/w+k8gjeinXIb3ClpO/U8eNoH49nO9A+Tbp5HrS0DjDtqx7iLZNDp9ZLK71t1PtQUsZwfKTJ96y34gQCPrGh7f9MZ1Loye2Aw6PsUPC0zLXPVHxYJZZ64NNoyV+0rnPQciDmBY3tHNAJcyFTmvG0sKenVVtinjbWa4B3VnSab076x/MfhJJ5cAIJGY3ObO3t8wbLauMaKjIzJeoXf10hqYt+oevlRs9TuVy9oO9GbV6Oe/+J2AWKM4pj3EiFR9pcWJhwLBQ+2+SYZ+PPOe57n6MNwtQyogTDQGqzVLbOJH36Cv/WEdjrbxWc7Ecstc/SBSWQVksPwWfdS7i8IA2GanlyqyMyRQdtetBWBgP14idX8wrfXwWyFUiUFCDAaVI0mPNQIMeLaA8cwKBUe1N8KM6ht/bRDl5+gXAcUA+E/LVQuMAfb3prGu6ztpgIuqqILfOyxCMvvoGH3rnW8c26YlRmUUh1rEw277vn5Et38alD54gcbcsDwfHOcTcjgUlXDTpFKkKq1kdiUlTkr2A4Mo9aNYRJSu9EKmPxM8luVW2ikqyV8Iu9MTHhVKGs3hNAo7YnbEwymCevhxoAcwpwd5vBAi8KAebdPLfKYZ2y2YMIqxmhFs16XJUNptQB5XkLp0QLa0YHcrBjCjxa+wZLKL4C+jvoy1GM9/evvYwi/BbN9M+xofigKLkbP73Qs/kmK6lwrrymEMzK9fEVhUjlvAXMWA+gpMm8in64ZY2utKRgHCDUepbrz9Q1Hl5Y5xYYWIdLxHlkWBwVfCHzPQjkz+49qGXCddaArNFCIvX0VnrPtg7rBkfHBNxHk1JLfj6WQlpf3Kogik+wa90Oc45X/kqcoXGomqZzKeMukcJ1XJiRwswYMqu5QuOgLI24G9Hhk3q03zixySGA0XW6VpzenlEJYOkARC7qFId2O7QQJpd+uxOG/AgwQtcdjsUSw4JVzL7Homyv4s/MjrvfnsfjYDzzIEV2BLWeHi0u5N0N01EXam2DPEv+G3SW8c7/KIJ4u5ddJkF9m0dk567r3Llq+0y7FKmWlLCri2VGSPxpjzo9LaxnWHW7GxEwrR86xn65q7+NU2qNJVffbc3ASQEJOjAsoEOzWwTV9sJAGjfe0fjPYSFgGJGikmrn6qB5dEKlKYGL7DnWKPerdvX+tbXDLO9TiT+xFtmGyhB/E7+eXovRzd4ofBtocGEH7A9vNT8xTQWI42sL4E/vdP3PRvHBugY9Ctw11zdHuPtDy+0cJg8v74NW6ApWjumXe/ANsaDv+aekp4PnCdCWMhhnSXJVO448zT3zQowuCR3M9iPhFnRD7Vqv8YgcZWFQ61WEp+A8kxEIbOnGiRC4KXAdwlZJseqhNYfv11QN9wn8XcRxcVhKau0Uvi3TdxkNK+Ch738N4XfcKoRATTiSIsnpfyN0Lr0ptRantg5qPDzCi9A4UoUFt4oW+zYLDSmuqh6I62+PKwy/AYiXLVxnBXLqxcaYrbmBiyiZhfaqpP2dFQj+nWvz+Q+w7fLDObhWm4ohyJzWNcLlh9w31GaF8miCrqyyjmhSrMcowg+2qHgoUCsMYsUyjHPMzQLYuvNSUKjyJmGYkpNA4Jo1qi1qOwVlIgrEH5wb5yYnYIs9B7Zh2B6ZJhdLMjmFPKMfE3RBo5ynlNPLe1/+4RCYcWtkYrx69qmxlRadMMzuvEhAcQFIxhiK7ovKoqaE7+kKGNZnDzjYMGfgZ2LiMUYP/+YWWve6aYPtezA4rcv4pYQiG1WDK0H1/F3zZN58uk+F2RbauBC+4JSb5E2fDbCesi4xI7Heu1o3/DfmdToKCaFYNTd3Jv59plAoR9tGPWrILuAIBE5zkhu+E9qhsigDGjs1nCIA1r9CBKanykCqqMNrjTPlN4U9HNNOIVCVW6NvMQ556Rs4pc3yRAs7+freqzaJBYsF5KJ7mYxOCqn7A1fA67n3E7jhEFtLGnPowOV93x/DO6XpNJPdH4LMJb7vRgsfu4taWvTDYFEQu1Tw0ekdPetZizdno4aA09ilOBfwzz3Da907cJMciP7q+7wXOO+UzErDaTRsXSr49piEYwx4UhRePgaIsGUFMCwx+5nDsBt5OEqFzpUsrqR+h3KJ/WFT0d7sQlcFv57DZ+h2oG+oAaI722TEafXdpnM2y9nMLXNI/Kg9Tm7slILUKwmqoQ0KVXTNxMVOqx6wg/78XhGN7h/WH+l4orMH9C3oGbd+9WB/q0CYGzU8wRRDVZNnyV+HOo3WaiQ18YvUOPB6Y/nFO/GUEtZhgXeK45B22i7FQnEeJam6i0Y6oHFWwXz8XOcROrP0TZ+MiBq1ZlFQuYt1q/Y2XrKlOc2SKpgUW0DwdLsaOtrfzIfH2vOFs7LX47eNr9+prUcc3NISnA9wzsFE043gchUuxHyuBUUJz1XiQYn8944iqPH3m/RXGusP08kywKJqtipFCrkEZXLyvjnIqSxnGKvkVFHaUkyVrHozfQTilH4PyqscpPlQa8d2HkROw66legoUS+jBcWDgu0WLrQyRoNnCVIPx0gHeXsqzZwpvUXnFtiMHiksxBG4tjKPr6k1QALz+n7lPApH6nQ/z+aE1v0bcpicPt9ob8Ddd+MXtY3QJbVIH8indZBYirBn7VfIoRM54r+2dUCxOgszTf4u85lPyHfcw/HIyspvdZjzWQMDyed5f+8SQ/Oo3kscUT0jr0cp8HLzmY225qcBV1Mu6DtIsSJU5M9dfSQSvwOTT3T5i8Qaq+ry3mHW+qGhZtvHUDbefFBouaSHc08g/Q+1HPZOURGgxoRdX+lCtn6oG0dcvFo6uQvDpCvYRwGavJrgiUfddsqVOmX5rnWMjUniTczdLmGdVPFC1G3/uJTckoxodgoEOy3p4t+/0fimbSKxVFrBNNDZ55koYS9KyiABVX+Uyrq1aerTbs6l0e3kb2Qmuxan76rINJRECQhh4DlOxjbXVUeg5JpV4UZ+xYcKmxhfOU6N5skXaMNI05h0zMd3WiCO0MsQvkZvEtZ7tQeimSSHrpJJ8iyxyH4AvCrwsWqGTUzXQyf81QqCZb0JfH+IGkhzDJrkhll6S1u4s3fh0zIgr5NtxkAtYzlDcuJvCB6cG0iyTfLLY/f1Snf89dbJa04d/QFQe7vINaTvNp3zphIWdSu0pLQnD0XmfBS4w3M418fg1tiVDP87iV+PtW+Lk4wHmEJxlwiSLOeMspMM22OmFOerdx6GmdbwiRULS50WS7CttC+moMeVUKr+lD/bpEQjrw4zyQlf8c+nHDEcxf8lFhwEBjkz6qptcnow99zutuXAKzFziezhJcVqbyDE3WHyiMBVt02DkRkHWj3Q1WmaZ//oEytYGTfuHBxf3yjp2ppYn6bbDKHDd5bKeTwUAZbtplMhURpYANouWSWR21bieO/wDsh9IICp+uhNnyUlWiBOPjze6eHGXtCOeBuh1IIlvyAS4ipf/ufNloKsbQflPOzrJjcp299QWatGzdLKddb1X0sX+XcaiJ3WFruapYKFT7Q4/z9BgVOEB0sTZIEhx7iUzPsUU6UqN8DwUmwURghCXq0L7lGzGfRoZNgPnFN0d6iqQBKweqjJWIbDTIuT0K1gObZDs9xar5uWgj6R9Q84wD/YxxfG6IKZ6fM9ZEimOA9jNn/o0DGutR+5asGgkPH4xJc4PNsyoII5p/q5Lzz6u33uYMgmwvRlp3Ta8QQtqFjymLgERLvftLfaBFcoM+isR9z97s9xrnJZZ8Gsj50+WdOTuSO4cbGLB5+VxzathS18KrAhBNozTI68m+mEd+SpYSudJLcZ+89XyQUlM0WJeuRnkBErWGLK4R8DM/hlw5GeAEviAiTjIiijLDdbbqzkN9bPGb2p30kGsrQz8BF+ZcuT79Da+0kwgJ+5Z7K6eYDKBjMwop7EtIkJPWfGOjLZtmw9201p7UiGI96HY7+9MABJ73cYg1SHia/ldHo14EiUwqcEnAZDrRejTEIdqBWnVVgq10OckhhZES3iCrxUJ97h8h4aOTjQEhKoqaNXDtMhgojnr4TN6CvcP/n9JZ0hUAon8rctxSONpDVcKRkyHLJXlXMjokQlYLdWodmMiYmmgXfDHEKDUnPDbT5S/NZbyo+03enYuZIgWjJ38oPurGtVY/tg5skXPAh5eOo9TtZVYaVF+Z4LLp+u+NhR8f1Cb3tDjkfKlSHdJDMA2JrK3yJBmw/G1ISznyzF6OkmtMFfUlDY3OuRmjcu4odpAYQz7jGC7bQEfSOyO4O9mrTW7SJAXfJj/uKt7VIxb+sGGMl3gojLwIk8yQ35oxu7eUfSu1sjXqLkWGjJPFuNcsxJofi/5sok7G2NI/leohgS0tYX/gWwAYvlYLPmB6G+wL+eS5BJQL8+hXspukEjTfr29RyU1OO2ThRBPvdheFEvD3z7AEaEN4+G3/EPs70F7lbD5F008/lNf8F2lG7wuZskI9bIsuv8CyYrFuM37Gv1Kk3qc9+dUra0UX+vnwjadQSIBolUJdZ8ERjafddy/lonAJsJ1qZowO+GzO5YEzlsSbRxnWGGW5LFb0GU1isRJLxxNVKscxIf83IYn1SrcAJq53eajJfRy0+ZZ1o48gnXG1ybYHfim8NjhmJww91NZ2eu8fj3sZ43UOUXXld6asNxfJJASCbSVAjIrft2JaTIv1id/ZDSFC3GoB7eh6deTOGDfB4eO7Xam+EoyWXnl4uFm+cHKRfUyOcN5tTEGT45t8nlHq06NUme+MJJEnPp5wEGEWAPGJQxoIVXEevds9x/RUNy5PYHU9JrnmwGLT1XB+eACrE2Ff3uj4ObTtQSiWNrntutXbMPK+W82LYMQCAFSU/diQoTwroTbJhz+EnrxbZyLvcKJCos1g+giAao4DL/svkORDP39ts2wogZZc8NaOuhFom/dQiHB6cV4OVlgp8M3wNJ/MEa9po3y+9HxXOkq2c7qGpqzBdFDEGCG2NDff7ihBQNEgApLhP+5hXG1icEaMKVnFcQSO/EARJVoKD/SgcpgOGEK2KOo9qPVVlwJP5XPm3Eb/9OmD04cJk7p4oNiz1i/zYC2iaWhPT+w/fqSGcExfKX2svJIaVssVCK0/yZPM2kSR9fj97IAAr/PJ852aHG557IgsRkeMgoaX9J/LaGv+VcysWHpgKMIN4jkmkD5+s68xVrfSgxXq4INlVVBV4ShTw+dAPVgcdrkAdAtOU9+R5AsE91FfvBweCkjoHSof/ROI50FwbfROONwn5eK93QZYoygK9QO5jJUZyvAI7n++JmukkrPgDeezRZ3jXYCOWTtfBHCwCOMvD7tyKufbD7B5Go6RlN4bZuraEgsjEdjQl3NsfRmDcBwhBAGSzKAXIYScUmmTHQaPIhCJlNdPPYfwWMnZxYu6RUZKlw7qJnkjK9ozst/03xyl1bn/LmednS0sV/AvcVJXqjvW61L233F9J9aBRaETJ1vbysYSdY9s0LEUxUyxl0NqWBJ9NvxJTgrOOY786X5vBhJtSTvoFqxbd9fq2mnChqJONnMHwuIOxS3Gqm/t85HDFYLbADFSIy6aPG2fF/yBeOt3KoqMFXwRtVlEJ+372HLsZ6BBigChqs9nXGQeLEWbasK4fcr/MaMo9+R9+Dn0FNtZDlszL7oNffJyx/oZyh+8w+t7ZOR81WI/xWGQEixajQCAsiltIlvuspxqnRrS2KiDmhBavabfpYAxL+aYdxFdCauoGkL45UM+JwiUKyfopOzX3p+qwXEOT23z1VfSpBxCeG2TvgUDGi+7jzVwiNjiECU29/wXpU4b72D3PyzYC3fQdz/Y3ZEoDhH1JVLY6ZHJi6HrOGZwAGWqT9IucOcM6xHhR+/CurFXDqwi7Q7DKHvzoxQJFF5rxdg7y1IUTxM2ZntphozBsRQF19+5w7qUKlp2hz2DvnPM6/+MfdzNzKV4bbGsc04PGyajc8PcHroA1nznAeQnk3Bazw227qiJTeHeozmSWXi8gbGMNt38qwc4AdjyWYJ/or0iMBvXtiYtVOsyXMZ84F5UbyfiESRhx/ppALTcqzy+sXhplt/g7G7gYh7VqgocyGEGi527oxSMJ+3YOaEir8v+NkNieTRu3oynHBVWGc6m8pmRKH9E5sWr17wVbwtftNHtdZx63TXTbA58GWKgk6RTUn24hUrGL5xEyRytPsGZL4BK1NMZkNepnTxdXDHnMYnL6b9vehaxVQN35E8j+3zMLG+4VxyYgSwIO4Ksiz0Mfj90XancOZVkq5sprcsnZ+fLmLcGi0NjETQHTPQkft4mw6ThI6yUbs7ewB+XcCLAIB8f70ze5kQ1MVHpTo1qS5yrKF1aTSAxCCIYNO2Cbbsq0uBP2kecv0FTMDevzZxGn0tEMC6Mkp5Xc71sTX/ghZpXD7AhwDsfeOLoQ0XqtBpQOJBMTg1fUxf3UxYn5EBKq4O7ouugPS502uf1GAYPX9SMQJZKGjxiDLKVXa+eRZ7xIZ7lCD0/KOZktjrsxiOk3NNGWJ9T0DWVyXimjFbUJXz0CADjySS0G4kUzbKQsPApXkDtbK0ft+zS/2PqcyXErfe7wjm4WtCQE5ovy4+DMR+SJv1irukMW8aB0diVOCdq1GOGnn4TTEUNOO8NyZ/lIDhIcW1aSA69ImyhB9FT3pYNucssnlUGXPQoJJRtiI15TSvGPKiNrhMQasRSSgAA=');
