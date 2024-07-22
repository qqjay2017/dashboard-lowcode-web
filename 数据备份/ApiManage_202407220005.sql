INSERT INTO dashboard.ApiManage (id,createdAt,updateAt,name,description,url,`method`,groupId,baseNameId,originId,headers,isMock,mockJson) VALUES
	 ('11ccf73e-36f4-431f-a755-8be78f25607e','2024-07-19 02:12:07.191','2024-07-19 02:12:07.191','质量安全检查统计','','/bg/v1/safety/check','GET',NULL,'b0aed06b-0d16-424c-a7c8-ecd1e66a3e6c',NULL,'[{"id":"xrKcrAgawZ3fLRHHMwsSq","headerKey":"system-id","headerValue":"167096554103328853"}]',0,'{}'),
	 ('122782c6-7446-46d1-9441-096973ce10ef','2024-07-19 02:12:07.191','2024-07-19 02:12:07.191','项目状态统计','','/bg/v1/trace/project','GET',NULL,'b0aed06b-0d16-424c-a7c8-ecd1e66a3e6c',NULL,'[]',0,'{}'),
	 ('29bdd449-9cca-4169-a9e7-9575b89b66a6','2024-07-19 02:12:07.191','2024-07-19 02:12:07.191','项目数量区域统计','','/bg/v1/project/map/1/100000','GET',NULL,'b0aed06b-0d16-424c-a7c8-ecd1e66a3e6c',NULL,'[{"id":"oHUteJ3boa_dSDNrFdHLp","headerKey":"system-id","headerValue":"167096554103328853"}]',0,'{}'),
	 ('3dfdd700-ac8f-4342-be3b-d60a11260adb','2024-07-21 00:46:25.311','2024-07-21 00:46:25.311','项目出勤情况分析MOCK','','/projectAttendance','POST','be5601bf-d35d-4f34-8715-23e3e01995ab','b0aed06b-0d16-424c-a7c8-ecd1e66a3e6c',NULL,'[]',1,'{
    "code": 200,
    "data": [
    {
        "projectName": "安溪县城炭坑溪片区治涝工程",
        "attendanceNum": 22,
        "manageAttendanceNum": 37,
        "attendanceRate": "18",
        "shutFlag": 1
    },
    {
        "projectName": "采购调入项目",
        "attendanceNum": 80,
        "manageAttendanceNum": 58,
        "attendanceRate": "50",
        "shutFlag": 0
    },
    {
        "projectName": "采购项目",
        "attendanceNum": 73,
        "manageAttendanceNum": 15,
        "attendanceRate": "57",
        "shutFlag": 0
    },
    {
        "projectName": "福建省德化职业技术学校二期控规用地建设项目工程",
        "attendanceNum": 46,
        "manageAttendanceNum": 57,
        "attendanceRate": "46",
        "shutFlag": 1
    },
    {
        "projectName": "华能霞浦核电项目施工供水工程",
        "attendanceNum": 48,
        "manageAttendanceNum": 38,
        "attendanceRate": "45",
        "shutFlag": 0
    },
    {
        "projectName": "华能霞浦核电项目施工供水工程（重新建项目）测试",
        "attendanceNum": 11,
        "manageAttendanceNum": 20,
        "attendanceRate": "68",
        "shutFlag": 0
    },
    {
        "projectName": "华润大夏A座20楼",
        "attendanceNum": 38,
        "manageAttendanceNum": 97,
        "attendanceRate": "70",
        "shutFlag": 0
    },
    {
        "projectName": "金门供水水源保障工程（溪边-龙湖段）",
        "attendanceNum": 73,
        "manageAttendanceNum": 3,
        "attendanceRate": "94",
        "shutFlag": 1
    },
    {
        "projectName": "临港新区高新科技产业园配套项目一标段",
        "attendanceNum": 12,
        "manageAttendanceNum": 12,
        "attendanceRate": "22",
        "shutFlag": 0
    },
    {
        "projectName": "前园片区改造—安置区",
        "attendanceNum": 62,
        "manageAttendanceNum": 27,
        "attendanceRate": "48",
        "shutFlag": 1
    },
    {
        "projectName": "泉南国家高速公路改扩建新增永春锦斗出入口及接线工程设计施工总承包（EPC）项目",
        "attendanceNum": 36,
        "manageAttendanceNum": 33,
        "attendanceRate": "54",
        "shutFlag": 1
    },
    {
        "projectName": "泉州金屿大桥工程",
        "attendanceNum": 78,
        "manageAttendanceNum": 37,
        "attendanceRate": "49",
        "shutFlag": 1
    },
    {
        "projectName": "泉州软件园二期体育公园工程",
        "attendanceNum": 58,
        "manageAttendanceNum": 46,
        "attendanceRate": "57",
        "shutFlag": 1
    },
    {
        "projectName": "泉州市菱溪水库至泉港区供水工程PPP项目",
        "attendanceNum": 10,
        "manageAttendanceNum": 59,
        "attendanceRate": "63",
        "shutFlag": 0
    },
    {
        "projectName": "思明万达广场",
        "attendanceNum": 58,
        "manageAttendanceNum": 81,
        "attendanceRate": "31",
        "shutFlag": 0
    },
    {
        "projectName": "厦门华润大夏A座",
        "attendanceNum": 37,
        "manageAttendanceNum": 96,
        "attendanceRate": "67",
        "shutFlag": 0
    },
    {
        "projectName": "翔安南部片区启动区A1地块-子地块A1-1/A1-2基坑支护、桩基、土石方工程",
        "attendanceNum": 71,
        "manageAttendanceNum": 54,
        "attendanceRate": "57",
        "shutFlag": 1
    },
    {
        "projectName": "翔安南部片区启动区A1地块-子地块A1-3/A1-4基坑支护、桩基、土石方工程",
        "attendanceNum": 36,
        "manageAttendanceNum": 55,
        "attendanceRate": "67",
        "shutFlag": 1
    },
    {
        "projectName": "翔安南部片区启动区A1地块-子地块A1-5/A1-6基坑支护、桩基、土石方工程",
        "attendanceNum": 54,
        "manageAttendanceNum": 34,
        "attendanceRate": "8",
        "shutFlag": 1
    },
    {
        "projectName": "质量测试",
        "attendanceNum": 42,
        "manageAttendanceNum": 72,
        "attendanceRate": "31",
        "shutFlag": 0
    },
    {
        "projectName": "质量测试1000",
        "attendanceNum": 38,
        "manageAttendanceNum": 19,
        "attendanceRate": "80",
        "shutFlag": 0
    }
]
}'),
	 ('4851df01-fcd1-46ab-931e-7a0a74ccef93','2024-07-19 02:12:07.191','2024-07-19 02:12:07.191','测试api新建','测试api新建','/fsdff/453123','GET',NULL,'b0aed06b-0d16-424c-a7c8-ecd1e66a3e6c',NULL,'[]',1,'{"a":123}'),
	 ('617bd9be-ca7c-4a55-b5ab-7f3a301b0560','2024-07-21 00:44:29.939','2024-07-21 00:44:29.939','项目考勤数据分析mock','','/projectClocking','POST','be5601bf-d35d-4f34-8715-23e3e01995ab','b0aed06b-0d16-424c-a7c8-ecd1e66a3e6c',NULL,'[]',1,'{
    "code": 200,
    "data": {
        "projectNum": "5",
        "allUserProjectNum": 22,
        "sectionUserProjectNum": 44,
        "unUserProjectNum": 5,
        "allUserNum": 32,
        "clockUserNum": 26,
        "unClockUserNum": 12
    }
}'),
	 ('65ae965c-1cdc-4b17-afe1-926ab28ee776','2024-07-19 02:12:07.191','2024-07-20 00:59:43.855','项目驾驶舱菜单','','/kx-cockpit/menu','GET',NULL,'b0aed06b-0d16-424c-a7c8-ecd1e66a3e6c',NULL,'[]',1,'{
    "code": 200,
    "data": [
        {
            "label": "指挥中心",
            "shareURL": "29eeac82-726d-435c-ba09-61541290c332"
        },
        {
            "label": "人员信息管理",
            "shareURL": "4a99eb1e-2d7d-4ea7-8dbb-31096c97c68e"
        },
        {
            "label": "人员信息管理",
            "shareURL": "",
            "children": [
                {
                    "label": "劳务信息",
                    "shareURL": ""
                },
                {
                    "label": "智能安全帽",
                    "shareURL": "d58b1b81-501a-4684-9cc8-a97fdc09dc41"
                }
            ]
        },
        {
            "label": "物料信息管理",
            "shareURL": ""
        },
        {
            "label": "机械设备管理",
            "shareURL": ""
        },
        {
            "label": "文明施工管理",
            "shareURL": ""
        },
        {
            "label": "施工质量管理",
            "shareURL": "4a99eb1e-2d7d-4ea7-8dbb-31096c97c68e"
        },
        {
            "label": "施工安全管理",
            "shareURL": ""
        },
        {
            "label": "BIM技术应用",
            "shareURL": ""
        },
        {
            "label": "视频监控",
            "shareURL": ""
        }
    ]
}'),
	 ('72dedd0d-3d87-497f-9fa8-88bfc7fa6f3a','2024-07-19 02:12:07.192','2024-07-19 02:12:07.192','项目类别','','/bg/v1/project/type','GET',NULL,'b0aed06b-0d16-424c-a7c8-ecd1e66a3e6c',NULL,'[{"id":"14zNZ_1h5tjysqtpL2UQs","headerKey":"system-id","headerValue":"167096554103328853"}]',0,'{}'),
	 ('74340e09-5e9d-45b0-805f-72f3a4673539','2024-07-19 02:12:07.191','2024-07-19 02:12:07.191','项目预算','','/bg/v1/fee/budget','GET',NULL,'b0aed06b-0d16-424c-a7c8-ecd1e66a3e6c',NULL,'[]',0,'{}'),
	 ('7af6a3aa-15dd-446b-8ae9-050f685e3058','2024-07-19 02:12:07.191','2024-07-19 02:12:07.191','安全检查','','/bg/v1/safety/check','GET',NULL,'b0aed06b-0d16-424c-a7c8-ecd1e66a3e6c',NULL,'[{"id":"9Wv4lyuI9XtUmtvJyLyhC","headerKey":"system-id","headerValue":"167096554103328853"}]',0,'{}');
INSERT INTO dashboard.ApiManage (id,createdAt,updateAt,name,description,url,`method`,groupId,baseNameId,originId,headers,isMock,mockJson) VALUES
	 ('81fa5e46-5eae-4d54-a318-c1dfa90ccf1d','2024-07-20 12:47:06.478','2024-07-20 12:47:06.478','参建人员分布统计mock','','/cjry','POST','be5601bf-d35d-4f34-8715-23e3e01995ab','b0aed06b-0d16-424c-a7c8-ecd1e66a3e6c',NULL,'[]',1,'{
    "code": 200,
    "data": {
        "constructionTotal": 175,
        "chartListData": [
            {
                "name": "架子工",
                "value": 4
            },
            {
                "name": "木工班组",
                "value": 27
            },
            {
                "name": "塔吊班组",
                "value": 12
            },
            {
                "name": "杂工班组",
                "value": 47
            },
            {
                "name": "止水钢板班组",
                "value": 3
            },
            {
                "name": "桩基班组",
                "value": 82
            }
        ]
    }
}'),
	 ('86445281-fc02-4451-957f-f0d582ab28fa','2024-07-21 06:01:06.066','2024-07-21 06:01:06.066','智能安全帽MOCK','','/applicationAnalysis','POST','be5601bf-d35d-4f34-8715-23e3e01995ab','b0aed06b-0d16-424c-a7c8-ecd1e66a3e6c',NULL,'[]',1,'{
    "code": 200,
    "data": {
        "safetyProject": {
            "applicationItemNum": 36,
            "monitoringPersonnelNum": 55,
            "previousApplicationItemNum": 68,
            "previousMonitoringPersonnelNum": 122,
            "applicationRate": "0.53",
            "monitoringRate": "0.45"
        },
        "applicationAnalysis": [
            {
                "index": 1,
                "projectName": "采购调入项目",
                "rate": "37"
            },
            {
                "index": 2,
                "projectName": "采购项目",
                "rate": "67"
            },
            {
                "index": 3,
                "projectName": "华能霞浦核电项目施工供水工程",
                "rate": "28"
            },
            {
                "index": 4,
                "projectName": "华能霞浦核电项目施工供水工程（重新建项目）测试",
                "rate": "30"
            },
            {
                "index": 5,
                "projectName": "华润大夏A座20楼",
                "rate": "91"
            },
            {
                "index": 6,
                "projectName": "泉州市菱溪水库至泉港区供水工程PPP项目",
                "rate": "18"
            },
            {
                "index": 7,
                "projectName": "思明万达广场",
                "rate": "18"
            },
            {
                "index": 8,
                "projectName": "厦门华润大夏A座",
                "rate": "37"
            },
            {
                "index": 9,
                "projectName": "质量测试",
                "rate": "12"
            },
            {
                "index": 10,
                "projectName": "质量测试1000",
                "rate": "23"
            }
        ]
    }
}'),
	 ('8648f7e2-8dbd-4958-86b4-3f5b0b676c94','2024-07-21 06:03:38.487','2024-07-21 06:03:38.487','未处理预警','','/warnList','POST','be5601bf-d35d-4f34-8715-23e3e01995ab','b0aed06b-0d16-424c-a7c8-ecd1e66a3e6c',NULL,'[]',1,'{
    "code": 200,
    "data": [
        {
            "date": "2024-06-5",
            "details": "未处理预警details1",
            "title": "未处理预警title1"
        },
        {
            "date": "2024-06-18",
            "details": "未处理预警details2",
            "title": "未处理预警title2"
        }
    ]
}'),
	 ('867a399c-57fb-4701-b701-1e4165297c8a','2024-07-19 02:12:07.192','2024-07-19 02:12:07.192','预警分析','','/bg/v1/project/progress/warn','GET',NULL,'b0aed06b-0d16-424c-a7c8-ecd1e66a3e6c',NULL,'[{"id":"MYULJj1n4UVUqSkjj3dHm","headerKey":"system-id","headerValue":"167096554103328853"},{"id":"JUpiJ7HbyZHYiTO9IcOFx","headerKey":"depend-method","headerValue":"GET"},{"id":"3Pi0kZOpvCavmsnJi38eV","headerKey":"depend-uri","headerValue":"/api/bg/v1/fee/budget"}]',1,'{
    "code": 200,
    "message": "success.",
    "data": {
        "monthes": [
            "2023-06",
            "2023-07",
            "2023-08",
            "2023-09",
            "2023-10",
            "2023-11",
            "2023-12",
            "2024-01",
            "2024-02",
            "2024-03",
            "2024-04",
            "2024-05"
        ],
        "progress": [
            12,
            1,
            13,
            10,
            7,
            3,
            10,
            30,
            1,
            2,
            1,
            8
        ],
        "quality": null,
        "safety": [
            2,
            9,
            28,
            8,
            3,
            2,
            5,
            6,
            12,
            1,
            2,
            4
        ]
    },
    "validErrors": null
}'),
	 ('9825fa27-ea25-4e4a-8cab-c45c82bf8c53','2024-07-19 02:12:07.191','2024-07-19 02:12:07.191','项目数量统计','','/bg/v1/trace/project','GET',NULL,'b0aed06b-0d16-424c-a7c8-ecd1e66a3e6c',NULL,'[]',0,'{}'),
	 ('ae060448-a558-411b-a87e-ca60b21a9ecb','2024-07-21 05:57:40.864','2024-07-21 05:57:40.864','关键人员今日到岗MOCK','','/keyPersonnel','POST','be5601bf-d35d-4f34-8715-23e3e01995ab','b0aed06b-0d16-424c-a7c8-ecd1e66a3e6c',NULL,'[]',1,'{
    "code": 200,
    "data": [
        {
            "jobTitle": "项目经理",
            "attendanceNum": 192,
            "unAttendanceNum": 102,
            "rate": "31"
        },
        {
            "jobTitle": "专职安全员",
            "attendanceNum": 206,
            "unAttendanceNum": 10,
            "rate": "95"
        },
        {
            "jobTitle": "总监",
            "attendanceNum": 200,
            "unAttendanceNum": 16,
            "rate": "93"
        }
    ]
}'),
	 ('ae9a44fa-b634-44aa-bba8-873fed9275c3','2024-07-21 14:44:53.337','2024-07-21 14:44:53.337','用工信用管理MOCK','用工信用管理
','/workerList','POST','be5601bf-d35d-4f34-8715-23e3e01995ab','b0aed06b-0d16-424c-a7c8-ecd1e66a3e6c',NULL,'[]',1,'{
    "code":200,
    "data":[
    {
        "username": "艾达胜",
        "code": "2024-RY-0011",
        "validity": "2024.6.7~2025.6.7",
        "instructions": "具有良好的个人素质，服从上级安排，对工作认真负责"
    },
    {
        "username": "艾达银",
        "code": "2024-RY-0012",
        "validity": "2024.6.7~2025.6.7",
        "instructions": "工作经验丰富，技术水平较高"
    },
    {
        "username": "程时波",
        "code": "2024-RY-0009",
        "validity": "2024.6.7~2025.6.7",
        "instructions": "工作态度认真，服从安排，表现良好，关心和团结同事"
    },
    {
        "username": "刘长生",
        "code": "2024-RY-0008",
        "validity": "2024.6.7~2025.6.7",
        "instructions": "任劳任怨，勤快务实，服从领导，团结同事"
    },
    {
        "username": "刘有生",
        "code": "2024-RY-0010",
        "validity": "2024.6.7~2025.6.7",
        "instructions": "工工作勤奋，表现积极，服从安排，工作中有实干精神，从不斤斤计较"
    },
    {
        "username": "卢金",
        "code": "2024-RY-0002",
        "validity": "2024.6.7~2025.6.7",
        "instructions": "工作态度积极、主动"
    },
    {
        "username": "马先文",
        "code": "2024-RY-0007",
        "validity": "2024.6.7~2025.6.7",
        "instructions": "工作认真、做事效率好"
    },
    {
        "username": "任静",
        "code": "2024-RY-0003",
        "validity": "2024.6.7~2025.6.7",
        "instructions": "做事认真，任劳任怨，不计较个人得失，服从上级安排"
    },
    {
        "username": "石茂龙",
        "code": "2024-RY-0005",
        "validity": "2024.6.7~2025.6.7",
        "instructions": "工作仔细、认真、负责，不但执行力强，且工作配合度也好"
    },
    {
        "username": "宋云",
        "code": "2024-RY-0006",
        "validity": "2024.6.7~2025.6.7",
        "instructions": "良好的个人形象和素养，专业技能或业务水平优秀"
    },
    {
        "username": "吴桂南",
        "code": "2024-RY-0004",
        "validity": "2024.6.7~2025.6.7",
        "instructions": "工作中态度认真，积极向上，为人乐观"
    },
    {
        "username": "闵小丽",
        "code": "2024-RY-0001",
        "validity": "2024.6.7~2025.6.7",
        "instructions": "热爱本职工作，服从安排"
    }
]
}'),
	 ('c17594bf-c8fe-4020-924d-e8d00f451764','2024-07-19 02:12:07.191','2024-07-19 02:12:07.191','项目进度','','/bg/v1/project/progress/num','GET',NULL,'b0aed06b-0d16-424c-a7c8-ecd1e66a3e6c',NULL,'[]',0,'{}'),
	 ('c91334f6-a710-4a98-ae21-84ebd1f6697e','2024-07-20 13:45:28.346','2024-07-20 13:45:28.346',' 合规风险预警分析玫瑰图','','/hgfxyj','POST','be5601bf-d35d-4f34-8715-23e3e01995ab','b0aed06b-0d16-424c-a7c8-ecd1e66a3e6c',NULL,'[]',1,'{
    "code": 200,
    "data": [
        {
            "name": "合同未按期上传",
            "value": 14
        },
        {
            "name": "超龄人员",
            "value": 7
        },
        {
            "name": "特殊工种证书到期",
            "value": 3
        },
        {
            "name": "人员健康状态异常",
            "value": 20
        },
        {
            "name": "入场安全教育未完成",
            "value": 20
        },
        {
            "name": "黑名单&红色通缉令",
            "value": 13
        }
    ]
}'),
	 ('ca4e7c9f-6371-4aee-bead-2eae5094e8e5','2024-07-19 02:12:07.191','2024-07-19 02:12:07.191','测试请求','测试请求','/qerrt/123','POST',NULL,NULL,NULL,'[]',0,'{}');
INSERT INTO dashboard.ApiManage (id,createdAt,updateAt,name,description,url,`method`,groupId,baseNameId,originId,headers,isMock,mockJson) VALUES
	 ('ea7539fe-5623-40ea-be91-b7d90963262f','2024-07-19 02:12:07.191','2024-07-19 02:12:07.191','质量检查','','/bg/v1/quality/check','GET',NULL,'b0aed06b-0d16-424c-a7c8-ecd1e66a3e6c',NULL,'[{"id":"U6h6PnqkMZFC_Ra-9qewY","headerKey":"system-id","headerValue":"167096554103328853"}]',0,'{}'),
	 ('f51a7812-ff9e-424f-91d8-5499ce2df512','2024-07-19 02:12:07.191','2024-07-19 02:12:07.191','人员信息','','/bg/v1/worker/company','GET',NULL,'b0aed06b-0d16-424c-a7c8-ecd1e66a3e6c',NULL,'[{"id":"MtknbCa_PpMttjJkKiRQ4","headerKey":"system-id","headerValue":"167096554103328853"},{"id":"zXuRYh8rvD9wXRRSZMZPR","headerKey":"depend-method","headerValue":"GET"},{"id":"LmAS1PBj2GCyn2Fl1MJyH","headerKey":"depend-uri","headerValue":"/api/bg/v1/fee/budget"}]',0,'{}');
