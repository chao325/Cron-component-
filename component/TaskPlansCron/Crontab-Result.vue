<template>
  <div class="popup-result">
    <!-- <p class="title">最近15次运行时间</p> -->
    <ul class="popup-result-scroll">
      <!-- <template v-if="isShow">
        <li v-for="item in resultList" :key="item">{{ item }}</li>
      </template>
      <li v-else>计算结果中...</li> -->
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CrontabResult',
  props: ['ex', 'times'],
  data() {
    return {
      dayRule: '',
      dayRuleSup: '',
      dateArr: [],
      resultList: [],
      isShow: false,
      sumcc: 20
    }
  },
  watch: {
    // 'ex': 'expressionChange'
    ex: {
      handler(){
        if (this.ex){
          this.expressionChange();
        }
      }
    }
  },
  mounted: function () {
    // 初始化 获取一次结果
    if (this.ex){
      this.expressionChange();
    }
    if (this.times){
      this.sumcc=this.times;
    }
  },
  methods: {
    // 表达式值变化时，开始去计算结果
    expressionChange() {
      const weekis={
        SUN: 1,
        MON: 2,
        TUE: 3,
        WED: 4,
        THU: 5,
        FRI: 6,
        SAT: 7
      }
      // 计算开始-隐藏结果
      this.isShow = false;
      // 获取规则数组[0秒、1分、2时、3日、4月、5星期、6年]
      const ruleArr = this.$options.propsData.ex.split(' ');
      // 用于记录进入循环的次数
      let nums = 0;
      // 用于暂时存符号时间规则结果的数组
      const resultArr = [];
      // 获取当前时间精确至[年、月、日、时、分、秒]
      const nTime = new Date();
      const nYear = nTime.getFullYear();
      let nMouth = nTime.getMonth() + 1;
      let nDay = nTime.getDate();
      let nHour = nTime.getHours();
      let nMin = nTime.getMinutes();
      let nSecond = nTime.getSeconds();
      // 根据规则获取到近100年可能年数组、月数组等等
      this.getSecondArr(ruleArr[0]);
      this.getMinArr(ruleArr[1]);
      this.getHourArr(ruleArr[2]);
      this.getDayArr(ruleArr[3]);
      this.getMouthArr(ruleArr[4]);
      const arr = ruleArr[5].split( ',' );
      const dataWeek = [];
      for (let i = 0; i < arr.length; i++) {
        const t = arr[i];
        dataWeek.push(weekis[t]-1)
      }
      ruleArr[5]=dataWeek.join(',');
      this.getWeekArr(ruleArr[5]);
      this.getYearArr(ruleArr[6], nYear);
      // 将获取到的数组赋值-方便使用
      const sDate = this.dateArr[0];
      const mDate = this.dateArr[1];
      const hDate = this.dateArr[2];
      const DDate = this.dateArr[3];
      const MDate = this.dateArr[4];
      const YDate = this.dateArr[5];
      // 获取当前时间在数组中的索引
      let sIdx = this.getIndex(sDate, nSecond);
      let mIdx = this.getIndex(mDate, nMin);
      let hIdx = this.getIndex(hDate, nHour);
      let DIdx = this.getIndex(DDate, nDay);
      let MIdx = this.getIndex(MDate, nMouth);
      const YIdx = this.getIndex(YDate, nYear);
      // 重置月日时分秒的函数(后面用的比较多)
      const resetSecond = function () {
        sIdx = 0;
        nSecond = sDate[sIdx]
      }
      const resetMin = function () {
        mIdx = 0;
        nMin = mDate[mIdx]
        resetSecond();
      }
      const resetHour = function () {
        hIdx = 0;
        nHour = hDate[hIdx]
        resetMin();
      }
      const resetDay = function () {
        DIdx = 0;
        nDay = DDate[DIdx]
        resetHour();
      }
      const resetMouth = function () {
        MIdx = 0;
        nMouth = MDate[MIdx]
        resetDay();
      }
      // 如果当前年份不为数组中当前值
      if (nYear !== YDate[YIdx]) {
        resetMouth();
      }
      // 如果当前月份不为数组中当前值
      if (nMouth !== MDate[MIdx]) {
        resetDay();
      }
      // 如果当前“日”不为数组中当前值
      if (nDay !== DDate[DIdx]) {
        resetHour();
      }
      // 如果当前“时”不为数组中当前值
      if (nHour !== hDate[hIdx]) {
        resetMin();
      }
      // 如果当前“分”不为数组中当前值
      if (nMin !== mDate[mIdx]) {
        resetSecond();
      }

      // 循环年份数组
      goYear: for (let Yi = YIdx; Yi < YDate.length; Yi++) {
        const YY = YDate[Yi];
        // 如果到达最大值时
        if (nMouth > MDate[MDate.length - 1]) {
          resetMouth();
          continue;
        }
        // 循环月份数组
        goMouth: for (let Mi = MIdx; Mi < MDate.length; Mi++) {
          // 赋值、方便后面运算
          let MM = MDate[Mi];
          MM = MM < 10 ? '0' + MM : MM;
          // 如果到达最大值时
          if (nDay > DDate[DDate.length - 1]) {
            resetDay();
            if (Mi == MDate.length - 1) {
              resetMouth();
              continue goYear;
            }
            continue;
          }
          // 循环日期数组
          goDay: for (let Di = DIdx; Di < DDate.length; Di++) {
            // 赋值、方便后面运算
            let DD = DDate[Di];
            let thisDD = DD < 10 ? '0' + DD : DD;
            // 如果到达最大值时
            if (nHour > hDate[hDate.length - 1]) {
              resetHour();
              if (Di == DDate.length - 1) {
                resetDay();
                if (Mi == MDate.length - 1) {
                  resetMouth();
                  continue goYear;
                }
                continue goMouth;
              }
              continue;
            }
            // 判断日期的合法性，不合法的话也是跳出当前循环
            if (this.checkDate(YY + '-' + MM + '-' + thisDD + ' 00:00:00') !== true && this.dayRule !== 'workDay' && this.dayRule !== 'lastWeek' && this.dayRule !== 'lastDay') {
              resetDay();
              continue goMouth;
            }
            // 如果日期规则中有值时
            if (this.dayRule == 'lastDay') {
              //如果不是合法日期则需要将前将日期调到合法日期即月末最后一天
              if (this.checkDate(YY + '-' + MM + '-' + thisDD + ' 00:00:00') !== true) {
                while (DD > 0 && this.checkDate(YY + '-' + MM + '-' + thisDD + ' 00:00:00') !== true) {
                  DD--;
                  thisDD = DD < 10 ? '0' + DD : DD;
                }
              }
            } else if (this.dayRule == 'workDay') {
              //校验并调整如果是2月30号这种日期传进来时需调整至正常月底
              if (this.checkDate(YY + '-' + MM + '-' + thisDD + ' 00:00:00') !== true) {
                while (DD > 0 && this.checkDate(YY + '-' + MM + '-' + thisDD + ' 00:00:00') !== true) {
                  DD--;
                  thisDD = DD < 10 ? '0' + DD : DD;
                }
              }
              // 获取达到条件的日期是星期X
              const thisWeek = this.formatDate(new Date(YY + '-' + MM + '-' + thisDD + ' 00:00:00'), 'week');
              // 当星期日时
              if (thisWeek == 0) {
                //先找下一个日，并判断是否为月底
                DD++;
                thisDD = DD < 10 ? '0' + DD : DD;
                //判断下一日已经不是合法日期
                if (this.checkDate(YY + '-' + MM + '-' + thisDD + ' 00:00:00') !== true) {
                  DD -= 3;
                }
              } else if (thisWeek == 6) {
                //当星期6时只需判断不是1号就可进行操作
                if (this.dayRuleSup !== 1) {
                  DD--;
                } else {
                  DD += 2;
                }
              }
            } else if (this.dayRule == 'weekDay') {
              //如果指定了是星期几
              //获取当前日期是属于星期几
              const thisWeek = this.formatDate(new Date(YY + '-' + MM + '-' + DD + ' 00:00:00'), 'week');
              //校验当前星期是否在星期池（dayRuleSup）中
              if (Array.indexOf(this.dayRuleSup, thisWeek) < 0) {
                // 如果到达最大值时
                if (Di == DDate.length - 1) {
                  resetDay();
                  if (Mi == MDate.length - 1) {
                    resetMouth();
                    continue goYear;
                  }
                  continue goMouth;
                }
                continue;
              }
            } else if (this.dayRule == 'assWeek') {
              //如果指定了是第几周的星期几
              //获取每月1号是属于星期几
              const thisWeek = this.formatDate(new Date(YY + '-' + MM + '-' + DD + ' 00:00:00'), 'week');
              if (this.dayRuleSup[1] >= thisWeek) {
                DD = (this.dayRuleSup[0] - 1) * 7 + this.dayRuleSup[1] - thisWeek + 1;
              } else {
                DD = this.dayRuleSup[0] * 7 + this.dayRuleSup[1] - thisWeek + 1;
              }
            } else if (this.dayRule == 'lastWeek') {
              //如果指定了每月最后一个星期几
              //校验并调整如果是2月30号这种日期传进来时需调整至正常月底
              if (this.checkDate(YY + '-' + MM + '-' + thisDD + ' 00:00:00') !== true) {
                while (DD > 0 && this.checkDate(YY + '-' + MM + '-' + thisDD + ' 00:00:00') !== true) {
                  DD--;
                  thisDD = DD < 10 ? '0' + DD : DD;
                }
              }
              //获取月末最后一天是星期几
              const thisWeek = this.formatDate(new Date(YY + '-' + MM + '-' + thisDD + ' 00:00:00'), 'week');
              //找到要求中最近的那个星期几
              if (this.dayRuleSup < thisWeek) {
                DD -= thisWeek - this.dayRuleSup;
              } else if (this.dayRuleSup > thisWeek) {
                DD -= 7 - (this.dayRuleSup - thisWeek)
              }
            }
            // 判断时间值是否小于10置换成“05”这种格式
            DD = DD < 10 ? '0' + DD : DD;
            // 循环“时”数组
            goHour: for (let hi = hIdx; hi < hDate.length; hi++) {
              const hh = hDate[hi] < 10 ? '0' + hDate[hi] : hDate[hi]
              // 如果到达最大值时
              if (nMin > mDate[mDate.length - 1]) {
                resetMin();
                if (hi == hDate.length - 1) {
                  resetHour();
                  if (Di == DDate.length - 1) {
                    resetDay();
                    if (Mi == MDate.length - 1) {
                      resetMouth();
                      continue goYear;
                    }
                    continue goMouth;
                  }
                  continue goDay;
                }
                continue;
              }
              // 循环"分"数组
              goMin: for (let mi = mIdx; mi < mDate.length; mi++) {
                const mm = mDate[mi] < 10 ? '0' + mDate[mi] : mDate[mi];
                // 如果到达最大值时
                if (nSecond > sDate[sDate.length - 1]) {
                  resetSecond();
                  if (mi == mDate.length - 1) {
                    resetMin();
                    if (hi == hDate.length - 1) {
                      resetHour();
                      if (Di == DDate.length - 1) {
                        resetDay();
                        if (Mi == MDate.length - 1) {
                          resetMouth();
                          continue goYear;
                        }
                        continue goMouth;
                      }
                      continue goDay;
                    }
                    continue goHour;
                  }
                  continue;
                }
                // 循环"秒"数组
                for (let si = sIdx; si <= sDate.length - 1; si++) {
                  const ss = sDate[si] < 10 ? '0' + sDate[si] : sDate[si];
                  // 添加当前时间（时间合法性在日期循环时已经判断）
                  if (MM !== '00' && DD !== '00') {
                    resultArr.push(YY + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss)
                    nums++;
                  }
                  //如果条数满了就退出循环
                  if (nums == this.sumcc) break goYear;
                  //如果到达最大值时
                  if (si == sDate.length - 1) {
                    resetSecond();
                    if (mi == mDate.length - 1) {
                      resetMin();
                      if (hi == hDate.length - 1) {
                        resetHour();
                        if (Di == DDate.length - 1) {
                          resetDay();
                          if (Mi == MDate.length - 1) {
                            resetMouth();
                            continue goYear;
                          }
                          continue goMouth;
                        }
                        continue goDay;
                      }
                      continue goHour;
                    }
                    continue goMin;
                  }
                } //goSecond
              } //goMin
            }//goHour
          }//goDay
        }//goMouth
      }
      // 判断100年内的结果条数
      if (resultArr.length == 0) {
        this.resultList = ['没有达到条件的结果！'];
      } else {
        this.resultList = resultArr;
        if (resultArr.length < this.sumcc) {
          this.resultList.push('此表达式只够运行出以上' + resultArr.length + '条结果！')
        }
      }
      this.$emit('change', this.resultList, this.sumcc)
      console.log('🚀 ~ file: Crontab-Result.vue ~ line 340 ~ expressionChange ~ this.resultList', this.resultList)

      // 计算完成-显示结果
      this.isShow = true;
    },
    //用于计算某位数字在数组中的索引
    getIndex(arr, value) {
      if (value <= arr[0] || value > arr[arr.length - 1]) {
        return 0;
      } else {
        for (let i = 0; i < arr.length - 1; i++) {
          if (value > arr[i] && value <= arr[i + 1]) {
            return i + 1;
          }
        }
      }
    },
    // 获取"年"数组
    getYearArr(rule, year) {
      this.dateArr[5] = this.getOrderArr(year, year + 100);
      if (rule !== undefined) {
        if (rule.indexOf('-') >= 0) {
          this.dateArr[5] = this.getCycleArr(rule, year + 100, false)
        } else if (rule.indexOf('/') >= 0) {
          this.dateArr[5] = this.getAverageArr(rule, year + 100)
        } else if (rule !== '*') {
          this.dateArr[5] = this.getAssignArr(rule)
        }
      }
    },
    // 获取"月"数组
    getMouthArr(rule) {
      this.dateArr[4] = this.getOrderArr(1, 12);
      if (rule.indexOf('-') >= 0) {
        this.dateArr[4] = this.getCycleArr(rule, 12, false)
      } else if (rule.indexOf('/') >= 0) {
        this.dateArr[4] = this.getAverageArr(rule, 12)
      } else if (rule !== '*') {
        this.dateArr[4] = this.getAssignArr(rule)
      }
    },
    // 获取"日"数组-主要为日期规则
    getWeekArr(rule) {
      //只有当日期规则的两个值均为“”时则表达日期是有选项的
      if (this.dayRule == '' && this.dayRuleSup == '') {
        if (rule.indexOf('-') >= 0) {
          this.dayRule = 'weekDay';
          this.dayRuleSup = this.getCycleArr(rule, 7, false)
        } else if (rule.indexOf('#') >= 0) {
          this.dayRule = 'assWeek';
          const matchRule = rule.match(/[0-9]{1}/g);
          this.dayRuleSup = [Number(matchRule[0]), Number(matchRule[1])];
          this.dateArr[3] = [1];
          if (this.dayRuleSup[1] == 7) {
            this.dayRuleSup[1] = 0;
          }
        } else if (rule.indexOf('L') >= 0) {
          this.dayRule = 'lastWeek';
          console.log('🚀 ~ file: Crontab-Result.vue ~ line 427 ~ getWeekArr ~ rule', rule)

          this.dayRuleSup = Number(rule.match(/[0-9]{1,2}/g)[0]);
          this.dateArr[3] = [31];
          if (this.dayRuleSup == 7) {
            this.dayRuleSup = 0;
          }
        } else if (rule !== '*' && rule !== '?') {
          this.dayRule = 'weekDay';
          this.dayRuleSup = this.getAssignArr(rule)
        }
        //如果weekDay时将7调整为0【week值0即是星期日】
        if (this.dayRule == 'weekDay') {
          for (let i = 0; i < this.dayRuleSup.length; i++) {
            if (this.dayRuleSup[i] == 7) {
              this.dayRuleSup[i] = 0;
            }
          }
        }
      }
    },
    // 获取"日"数组-少量为日期规则
    getDayArr(rule) {
      this.dateArr[3] = this.getOrderArr(1, 31);
      this.dayRule = '';
      this.dayRuleSup = '';
      if (rule.indexOf('-') >= 0) {
        this.dateArr[3] = this.getCycleArr(rule, 31, false)
        this.dayRuleSup = 'null';
      } else if (rule.indexOf('/') >= 0) {
        this.dateArr[3] = this.getAverageArr(rule, 31)
        this.dayRuleSup = 'null';
      } else if (rule.indexOf('W') >= 0) {
        this.dayRule = 'workDay';
        this.dayRuleSup = Number(rule.match(/[0-9]{1,2}/g)[0]);
        this.dateArr[3] = [this.dayRuleSup];
      } else if (rule.indexOf('L') >= 0) {
        this.dayRule = 'lastDay';
        this.dayRuleSup = 'null';
        this.dateArr[3] = [31];
      } else if (rule !== '*' && rule !== '?') {
        this.dateArr[3] = this.getAssignArr(rule)
        this.dayRuleSup = 'null';
      } else if (rule == '*') {
        this.dayRuleSup = 'null';
      }
    },
    // 获取"时"数组
    getHourArr(rule) {
      this.dateArr[2] = this.getOrderArr(0, 23);
      if (rule.indexOf('-') >= 0) {
        this.dateArr[2] = this.getCycleArr(rule, 24, true)
      } else if (rule.indexOf('/') >= 0) {
        this.dateArr[2] = this.getAverageArr(rule, 23)
      } else if (rule !== '*') {
        this.dateArr[2] = this.getAssignArr(rule)
      }
    },
    // 获取"分"数组
    getMinArr(rule) {
      this.dateArr[1] = this.getOrderArr(0, 59);
      if (rule.indexOf('-') >= 0) {
        this.dateArr[1] = this.getCycleArr(rule, 60, true)
      } else if (rule.indexOf('/') >= 0) {
        this.dateArr[1] = this.getAverageArr(rule, 59)
      } else if (rule !== '*') {
        this.dateArr[1] = this.getAssignArr(rule)
      }
    },
    // 获取"秒"数组
    getSecondArr(rule) {
      this.dateArr[0] = this.getOrderArr(0, 59);
      if (rule.indexOf('-') >= 0) {
        this.dateArr[0] = this.getCycleArr(rule, 60, true)
      } else if (rule.indexOf('/') >= 0) {
        this.dateArr[0] = this.getAverageArr(rule, 59)
      } else if (rule !== '*') {
        this.dateArr[0] = this.getAssignArr(rule)
      }
    },
    // 根据传进来的min-max返回一个顺序的数组
    getOrderArr(min, max) {
      const arr = [];
      for (let i = min; i <= max; i++) {
        arr.push(i);
      }
      return arr;
    },
    // 根据规则中指定的零散值返回一个数组
    getAssignArr(rule) {
      const arr = [];
      const assiginArr = rule.split(',');
      for (let i = 0; i < assiginArr.length; i++) {
        arr[i] = Number(assiginArr[i])
      }
      arr.sort(this.compare)
      return arr;
    },
    // 根据一定算术规则计算返回一个数组
    getAverageArr(rule, limit) {
      const arr = [];
      const agArr = rule.split('/');
      let min = Number(agArr[0]);
      const step = Number(agArr[1]);
      while (min <= limit) {
        arr.push(min);
        min += step;
      }
      return arr;
    },
    // 根据规则返回一个具有周期性的数组
    getCycleArr(rule, limit, status) {
      //status--表示是否从0开始（则从1开始）
      const arr = [];
      const cycleArr = rule.split('-');
      const min = Number(cycleArr[0]);
      let max = Number(cycleArr[1]);
      if (min > max) {
        max += limit;
      }
      for (let i = min; i <= max; i++) {
        let add = 0;
        if (status == false && i % limit == 0) {
          add = limit;
        }
        arr.push(Math.round(i % limit + add))
      }
      arr.sort(this.compare)
      return arr;
    },
    //比较数字大小（用于Array.sort）
    compare(value1, value2) {
      if (value2 - value1 > 0) {
        return -1;
      } else {
        return 1;
      }
    },
    formatDate(value, type) {
      // 计算日期相关值
      const time = typeof value === 'number' ? new Date(value) : value;
      const Y = time.getFullYear();
      const M = time.getMonth() + 1;
      const D = time.getDate();
      const h = time.getHours();
      const m = time.getMinutes();
      const s = time.getSeconds();
      const week = time.getDay();
      // 如果传递了type的话
      if (type == undefined) {
        return Y + '-' + (M < 10 ? '0' + M : M) + '-' + (D < 10 ? '0' + D : D) + ' ' + (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
      } else if (type == 'week') {
        return week;
      }
    },
    // 检查日期是否存在
    checkDate(value) {
      const time = new Date(value);
      const format = this.formatDate(time)
      return value == format;
    }
  }
}
</script>
