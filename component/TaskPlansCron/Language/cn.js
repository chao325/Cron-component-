export default {
  Seconds: {
    name: '秒',
    every: '每一秒钟',
    interval: ['每隔', '秒执行 从', '秒开始'],
    specific: '具体秒数(可多选)',
    cycle: ['周期从', '到', '秒']
  },
  Minutes: {
    name: '分',
    every: '每一分钟',
    interval: ['每隔', '分执行 从', '分开始'],
    specific: '具体分钟数(可多选)',
    cycle: ['周期从', '到', '分']
  },
  Hours: {
    name: '时',
    every: '每一小时',
    interval: ['每隔', '小时执行 从', '小时开始'],
    specific: '具体小时数(可多选)',
    cycle: ['周期从', '到', '小时']
  },
  Day: {
    name: '天(周)',
    every: '每一天',
    intervalWeek: ['每隔', '周执行 从', '开始'],
    intervalDay: ['每隔', '天执行 从', '天开始'],
    specificWeek: '具体星期几(可多选)',
    specificDay: '具体天数(可多选)',
    lastDay: '在这个月的最后一天',
    lastWeekday: '在这个月的最后一个工作日',
    lastWeek: ['在这个月的最后一个'],
    beforeEndMonth: ['在本月底前', '天'],
    nearestWeekday: ['最近的工作日（周一至周五）至本月', '日'],
    someWeekday: ['在这个月的第', '个']
  },
  Week: ['天', '一', '二', '三', '四', '五', '六'].map(val => '星期'+val),
  Month: {
    name: '月',
    every: '每一月',
    interval: ['每隔', '月执行 从', '月开始'],
    specific: '具体月数(可多选)',
    cycle: ['从', '到', '月之间的每个月']
  },
  Year: {
    name: '年',
    every: '每一年',
    interval: ['每隔', '年执行 从', '年开始'],
    specific: '具体年份(可多选)',
    cycle: ['从', '到', '年之间的每一年']
  },
  Help: {
    name: '帮助(快捷选择)',
    cronArry: [
      { value: '* * * * * ? *', label: '每秒' },
      { value: '0 */30 * * * ? *', label: '每30分钟' },
      { value: '0 15,30,45 * * * ? *', label: '在每小时的第15,30,45分钟' },
      { value: '0 0 12 * * ? *', label: '每天中午12点' },
      { value: '0 0 12 ? * MON *', label: '每周一12点' },
      { value: '0 0 12 * 1,6 ? *', label: '1月和6月的每天中午12点' },
      { value: '* * 12 ? * 6#1 *', label: '每月第一个星期五的12点' }
    ],
    Tips: [
      { tex: '秒：值为0 1 2...59 通配符支持* / - ，' },
      { tex: '分：值为0 1 2...59 通配符支持* / - ，' },
      { tex: '时：值为0 1 2...23 通配符支持* / - ，' },
      { tex: '日：值为1 2...31 通配符支持* / - , L W ，' },
      { tex: '月：值为1 2...12，或12个月的缩写(JAN ... DEC) 通配符支持* / - ，' },
      { tex: '周：值为1 2...7或星期的缩写(SUN ... SAT) 通配符支持* / - , ? L # ，' },
      { tex: '年：值为2022 ... 2099 通配符支持* / - ,' }
    ]
  },
  Save: '生成表达式',
  Close: '关闭'
}
