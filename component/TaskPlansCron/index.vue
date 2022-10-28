
<template>
  <div id="changeContab">
    <el-button
      class="language"
      type="text"
      @click="i18n='cn'"
    >{{ i18n }}</el-button>
    <el-tabs v-model="tabsInx" type="border-card">
      <!-- 帮助 -->
      <el-tab-pane name="hel">
        <span slot="label"><i class="el-icon-info" /> {{ text.Help.name }}</span>
        <div class="tabBody">
          <el-row style="margin: 0 auto;">
            <span style="font-weight: bold; font-size: 15px;">选择：</span>
            <el-select v-model="cronArryvalue" value-key="cronArryvalue" placeholder="请选择" style="width: 290px;margin-left:1em;" @change="helpFun">
              <el-option
                v-for="item in text.Help.cronArry"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 12px">{{ item.value }}</span>
              </el-option>
            </el-select>

            <span>{{ cronArryvalue }}</span>
          </el-row>
          <div v-for="item in text.Help.Tips" :key="item.tex" style="margin: 6px 0;">
            <span style="font-size:13px">{{ item.tex }}</span>
          </div>
        </div>
      </el-tab-pane>
      <!-- 秒 -->
      <el-tab-pane name="sec">
        <span slot="label"><i class="el-icon-date" /> {{ text.Seconds.name }}</span>
        <div class="tabBody">
          <el-row>
            <el-radio
              v-model="second.cronEvery"
              label="1"
            >{{ text.Seconds.every }}</el-radio>
          </el-row>
          <el-row>
            <el-radio
              v-model="second.cronEvery"
              label="2"
            >{{ text.Seconds.interval[0] }}
              <el-input-number
                v-model="second.incrementIncrement"
                size="small"
                :min="1"
                :max="60"
              />
              {{ text.Seconds.interval[1]||'' }}
              <el-input-number
                v-model="second.incrementStart"
                size="small"
                :min="0"
                :max="59"
              />
              {{ text.Seconds.interval[2]||'' }}
            </el-radio>
          </el-row>
          <el-row>
            <el-radio
              v-model="second.cronEvery"
              label="4"
            >{{ text.Seconds.cycle[0] }}
              <el-input-number
                v-model="second.rangeStart"
                size="small"
                :min="0"
                :max="second.rangeEnd||0"
              />
              {{ text.Seconds.cycle[1]||'' }}
              <el-input-number
                v-model="second.rangeEnd"
                size="small"
                :min="1"
                :max="59"
              />
              {{ text.Seconds.cycle[2]||'' }}
            </el-radio>
          </el-row>
          <el-row>
            <el-radio
              v-model="second.cronEvery"
              class="long"
              label="3"
            >{{ text.Seconds.specific }}
              <el-checkbox-group
                v-model="second.specificSpecific"
                value-key="second"
                size="small"
                multiple

                class="checkBox_style"
              >
                <el-checkbox
                  v-for="val in 60"
                  :key="val"
                  :label="val-1"
                >{{ val-1 }}</el-checkbox>
              </el-checkbox-group>
            </el-radio>
          </el-row>
        </div>
      </el-tab-pane>
      <!-- 分 -->
      <el-tab-pane name="miu">
        <span slot="label"><i class="el-icon-date" /> {{ text.Minutes.name }}</span>
        <div class="tabBody">
          <el-row>
            <el-radio
              v-model="minute.cronEvery"
              label="1"
            >{{ text.Minutes.every }}</el-radio>
          </el-row>
          <el-row>
            <el-radio
              v-model="minute.cronEvery"
              label="2"
            >{{ text.Minutes.interval[0] }}
              <el-input-number
                v-model="minute.incrementIncrement"
                size="small"
                :min="1"
                :max="60"
              />
              {{ text.Minutes.interval[1] }}
              <el-input-number
                v-model="minute.incrementStart"
                size="small"
                :min="0"
                :max="59"
              />
              {{ text.Minutes.interval[2]||'' }}
            </el-radio>
          </el-row>
          <el-row>
            <el-radio
              v-model="minute.cronEvery"
              label="4"
            >{{ text.Minutes.cycle[0] }}
              <el-input-number
                v-model="minute.rangeStart"
                size="small"
                :min="0"
                :max="minute.rangeEnd||0"
              />
              {{ text.Minutes.cycle[1] }}
              <el-input-number
                v-model="minute.rangeEnd"
                size="small"
                :min="1"
                :max="59"
              />
              {{ text.Minutes.cycle[2] }}
            </el-radio>
          </el-row>
          <el-row>
            <el-radio
              v-model="minute.cronEvery"
              class="long"
              label="3"
            >{{ text.Minutes.specific }}
              <el-checkbox-group
                v-model="minute.specificSpecific"
                value-key="minute"
                size="small"
                multiple
                class="checkBox_style"
              >
                <el-checkbox
                  v-for="val in 60"
                  :key="val"
                  :label="val-1"
                >{{ val-1 }}</el-checkbox>
              </el-checkbox-group>
            </el-radio>
          </el-row>

        </div>
      </el-tab-pane>
      <!-- 时 -->
      <el-tab-pane name="hou">
        <span slot="label"><i class="el-icon-date" /> {{ text.Hours.name }}</span>
        <div class="tabBody">
          <el-row>
            <el-radio
              v-model="hour.cronEvery"
              label="1"
            >{{ text.Hours.every }}</el-radio>
          </el-row>
          <el-row>
            <el-radio
              v-model="hour.cronEvery"
              label="2"
            >{{ text.Hours.interval[0] }}
              <el-input-number
                v-model="hour.incrementIncrement"
                size="small"
                :min="0"
                :max="23"
              />
              {{ text.Hours.interval[1] }}
              <el-input-number
                v-model="hour.incrementStart"
                size="small"
                :min="0"
                :max="23"
              />
              {{ text.Hours.interval[2] }}
            </el-radio>
          </el-row>

          <el-row>
            <el-radio
              v-model="hour.cronEvery"
              label="4"
            >{{ text.Hours.cycle[0] }}
              <el-input-number
                v-model="hour.rangeStart"
                size="small"
                :min="0"
                :max="hour.rangeEnd||0"
              />
              {{ text.Hours.cycle[1] }}
              <el-input-number
                v-model="hour.rangeEnd"
                size="small"
                :min="0"
                :max="23"
              />
              {{ text.Hours.cycle[2] }}
            </el-radio>
          </el-row>
          <el-row>
            <el-radio
              v-model="hour.cronEvery"
              class="long"
              label="3"
            >{{ text.Hours.specific }}
              <el-checkbox-group
                v-model="hour.specificSpecific"
                value-key="hour"
                size="small"
                multiple
                class="checkBox_style"
              >
                <el-checkbox
                  v-for="val in 24"
                  :key="val"
                  :label="val-1"
                >{{ val-1 }}</el-checkbox>
              </el-checkbox-group>
            </el-radio>
          </el-row>
        </div>
      </el-tab-pane>
      <!-- 天 -->
      <el-tab-pane name="day">
        <span slot="label"><i class="el-icon-date" /> {{ text.Day.name }}</span>
        <div class="tabBody">
          <el-row>
            <el-radio
              v-model="day.cronEvery"
              label="1"
            >{{ text.Day.every }}</el-radio>
          </el-row>
          <el-row>
            <el-radio
              v-model="day.cronEvery"
              label="3"
            >{{ text.Day.intervalDay[0] }}
              <el-input-number
                v-model="day.incrementIncrement"
                size="small"
                :min="1"
                :max="31"
              />
              {{ text.Day.intervalDay[1] }}
              <el-input-number
                v-model="day.incrementStart"
                size="small"
                :min="1"
                :max="31"
              />
              {{ text.Day.intervalDay[2] }}
            </el-radio>
          </el-row>
          <el-row>
            <el-radio
              v-model="day.cronEvery"
              label="6"
            >{{ text.Day.lastDay }}</el-radio>
          </el-row>
          <el-row>
            <el-radio
              v-model="day.cronEvery"
              label="9"
            >
              <el-input-number
                v-model="day.cronDaysBeforeEomMinus"
                size="small"
                :min="1"
                :max="31"
              />
              {{ text.Day.beforeEndMonth[0] }}
            </el-radio>
          </el-row>
          <el-row>
            <el-radio
              v-model="day.cronEvery"
              class="long"
              label="5"
            >{{ text.Day.specificDay }}
              <el-checkbox-group
                v-model="day.specificSpecific"
                value-key="day"
                size="small"
                multiple
                class="checkBox_style"
              >
                <el-checkbox
                  v-for="val in 31"
                  :key="val"
                  :label="val"
                >{{ val }}</el-checkbox>
              </el-checkbox-group>

            </el-radio>
          </el-row>
        </div>
      </el-tab-pane>

      <!-- 月 -->
      <el-tab-pane name="mon">
        <span slot="label"><i class="el-icon-date" /> {{ text.Month.name }}</span>
        <div class="tabBody">
          <el-row>
            <el-radio
              v-model="month.cronEvery"
              label="1"
            >{{ text.Month.every }}</el-radio>
          </el-row>
          <el-row>
            <el-radio
              v-model="month.cronEvery"
              label="2"
            >{{ text.Month.interval[0] }}
              <el-input-number
                v-model="month.incrementIncrement"
                size="small"
                :min="0"
                :max="12"
              />
              {{ text.Month.interval[1] }}
              <el-input-number
                v-model="month.incrementStart"
                size="small"
                :min="0"
                :max="12"
              />
            </el-radio>
          </el-row>

          <el-row>
            <el-radio
              v-model="month.cronEvery"
              label="4"
            >{{ text.Month.cycle[0] }}
              <el-input-number
                v-model="month.rangeStart"
                size="small"
                :min="1"
                :max="month.rangeEnd||12"
              />
              {{ text.Month.cycle[1] }}
              <el-input-number
                v-model="month.rangeEnd"
                size="small"
                :min="1"
                :max="12"
              />
            </el-radio>
          </el-row>
          <el-row>
            <el-radio
              v-model="month.cronEvery"
              class="long"
              label="3"
            >{{ text.Month.specific }}
              <el-checkbox-group
                v-model="month.specificSpecific"
                value-key="month"
                size="small"
                multiple
                class="checkBox_style"
              >
                <el-checkbox
                  v-for="val in 12"
                  :key="val"
                  :label="val"
                >{{ val }}</el-checkbox>
              </el-checkbox-group>

            </el-radio>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane name="wek">
        <span slot="label"><i class="el-icon-date" /> {{ text.week.name }}</span>
        <div class="tabBody">
          <el-row>
            <el-radio
              v-model="day.cronEvery"
              label="2"
            >{{ text.week.intervalWeek[0] }}
              <el-input-number
                v-model="week.incrementIncrement"
                size="small"
                :min="1"
                :max="7"
              />
              {{ text.week.intervalWeek[1] }}
              <el-select
                v-model="week.incrementStart"

                value-key="week"
                size="small"
              >
                <el-option
                  v-for="val in 7"
                  :key="val"
                  :label="text.Week[val-1]"
                  :value="val"
                />
              </el-select>
              {{ text.week.intervalWeek[2] }}
            </el-radio>
          </el-row>

          <el-row>
            <el-radio
              v-model="day.cronEvery"
              label="7"
            >{{ text.week.lastWeekday }}</el-radio>
          </el-row>
          <el-row>
            <el-radio
              v-model="day.cronEvery"
              label="8"
            >{{ text.week.lastWeek[0] }}
              <el-select
                v-model="day.cronLastSpecificDomDay"

                value-key="days"
                size="small"
              >
                <el-option
                  v-for="val in 7"
                  :key="val"
                  :label="text.Week[val-1]"
                  :value="val-1"
                />
              </el-select>
              {{ text.week.lastWeek[1]||'' }}
            </el-radio>
          </el-row>
          <el-row>
            <el-radio
              v-model="day.cronEvery"
              label="10"
            >{{ text.week.nearestWeekday[0] }}
              <el-input-number
                v-model="day.cronDaysNearestWeekday"
                size="small"
                :min="1"
                :max="31"
              />
              {{ text.week.nearestWeekday[1] }}
            </el-radio>
          </el-row>
          <el-row>
            <el-radio
              v-model="day.cronEvery"
              label="11"
            >{{ text.week.someWeekday[0] }}
              <el-input-number
                v-model="week.cronNthDayNth"
                size="small"
                :min="1"
                :max="5"
              />
              <el-select
                v-model="week.cronNthDayDay"

                value-key="weeksy"
                size="small"
              >
                <el-option
                  v-for="val in 7"
                  :key="val"
                  :label="text.Week[val-1]"
                  :value="val"
                />
              </el-select>
              {{ text.week.someWeekday[1] }}
            </el-radio>
          </el-row>
          <el-row>
            <el-radio
              v-model="day.cronEvery"
              class="long"
              label="4"
            >{{ text.week.specificWeek }}
              <el-checkbox-group
                v-model="week.specificSpecific"
                value-key="weeks"
                size="small"
                multiple
                class="checkBox_style"
                style="margin: 10px 0;"
              >
                <el-checkbox
                  v-for="val in 7"

                  :key="val-1"
                  style="width: 50px;"
                  :label="['SUN','MON','TUE','WED','THU','FRI','SAT'][val-1]"
                >{{ text.Week[val-1] }}</el-checkbox>
              </el-checkbox-group>
            </el-radio>
          </el-row>
        </div>
      </el-tab-pane>
      <!-- 年 -->
      <el-tab-pane name="yea">
        <span slot="label"><i class="el-icon-date" /> {{ text.Year.name }}</span>
        <div class="tabBody">
          <el-row>
            <el-radio
              v-model="year.cronEvery"
              label="1"
            >{{ text.Year.every }}</el-radio>
          </el-row>
          <el-row>
            <el-radio
              v-model="year.cronEvery"
              label="2"
            >{{ text.Year.interval[0] }}
              <el-input-number
                v-model="year.incrementIncrement"
                size="small"
                :min="1"
                :max="99"
              />
              {{ text.Year.interval[1] }}
              <el-input-number
                v-model="year.incrementStart"
                size="small"
                :min="2021"
                :max="2222"
              />
            </el-radio>
          </el-row>

          <el-row>
            <el-radio
              v-model="year.cronEvery"
              label="4"
            >{{ text.Year.cycle[0] }}
              <el-input-number
                v-model="year.rangeStart"
                size="small"
                :min="2020"
                :max="year.rangeEnd||2023"
              />
              {{ text.Year.cycle[1] }}
              <el-input-number
                v-model="year.rangeEnd"
                size="small"
                :min="2022"
                :max="2222"
              />
            </el-radio>
          </el-row>
          <el-row>
            <el-radio
              v-model="year.cronEvery"
              class="long"
              label="3"
            >{{ text.Year.specific }}
              <el-checkbox-group
                v-model="year.specificSpecific"
                value-key="year"
                size="small"
                filterable
                multiple
                class="checkBox_style"
                style="margin: 10px 0;"
              >
                <el-checkbox
                  v-for="(val,index) in text.Year.yeaArray"
                  :key="val.id"
                  style="width: 50px;"
                  :label="val.label"
                  :checked="val.value==year.specificSpecific[index]"
                >{{ val.value }}</el-checkbox>
              </el-checkbox-group>
            </el-radio>
          </el-row>
        </div>
      </el-tab-pane>

    </el-tabs>
    <!-- <span class="value">{{ cron }}</span> -->
    <!-- <div v-show="tabsInx!=='hel'" class="bottom">
      <el-button
        type="primary"
        @click="change"
      >{{ text.Save }}</el-button>
      <el-button
        type="primary"
        @click="close"
      >{{ text.Close }}</el-button>
    </div> -->
  </div>
</template>
<script>
import Language from './Language/index'
export default {
  name: 'VueCron',
  props: ['data', 'i18n', 'expression'],
  data() {
    return {
      cronArryvalue: '', //帮助
      tabsInx: 'sec',
      exps: [
        { type: 'second', expression: '' },
        { type: 'minute', expression: '' },
        { type: 'hour', expression: '' },
        { type: 'day', expression: '' },
        { type: 'month', expression: '' },
        { type: 'Week', expression: '' },
        { type: 'year', expression: [2022, 2025] }
      ],
      second: {
        cronEvery: '',
        incrementStart: '3',
        incrementIncrement: '1',
        rangeStart: '',
        rangeEnd: '',
        specificSpecific: []
      },
      minute: {
        cronEvery: '',
        incrementStart: '3',
        incrementIncrement: '1',
        rangeStart: '',
        rangeEnd: '',
        specificSpecific: []
      },
      hour: {
        cronEvery: '',
        incrementStart: '3',
        incrementIncrement: '1',
        rangeStart: '',
        rangeEnd: '',
        specificSpecific: []
      },
      day: {
        cronEvery: '',
        incrementStart: '1',
        incrementIncrement: '1',
        rangeStart: '',
        rangeEnd: '',
        specificSpecific: [],
        cronLastSpecificDomDay: 1,
        cronDaysBeforeEomMinus: '',
        cronDaysNearestWeekday: ''
      },
      week: {
        cronEvery: '',
        incrementStart: '1',
        incrementIncrement: '1',
        specificSpecific: [],
        cronNthDayDay: 1,
        cronNthDayNth: '1'
      },
      month: {
        cronEvery: '',
        incrementStart: '3',
        incrementIncrement: '1',
        rangeStart: '',
        rangeEnd: '',
        specificSpecific: []
      },
      year: {
        cronEvery: '',
        incrementStart: '2022',
        incrementIncrement: '1',
        rangeStart: '',
        rangeEnd: '',
        specificSpecific: []
      },
      output: {
        second: '',
        minute: '',
        hour: '',
        day: '',
        month: '',
        Week: '',
        year: ''
      }
    }
  },
  computed: {
    text() {
      return Language['cn']
    },
    secondsText() {
      let seconds = '';
      const cronEvery = this.second.cronEvery;
      switch (cronEvery.toString()) {
        case '1':
          seconds = '*';
          break;
        case '2':
          seconds = this.second.incrementStart + '/' + this.second.incrementIncrement;
          break;
        case '3':
          this.second.specificSpecific.map(val => {
            seconds += val-0 + ','
            this.second.specificSpecific.push(val-0)
          });
          // seconds = seconds.slice(0, -1);
          break;
        case '4':
          seconds = this.second.rangeStart + '-' + this.second.rangeEnd;
          break;
      }
      return seconds;
    },
    minutesText() {
      let minutes = '';
      const cronEvery = this.minute.cronEvery;
      switch (cronEvery.toString()) {
        case '1':
          minutes = '*';
          break;
        case '2':
          minutes = this.minute.incrementStart + '/' + this.minute.incrementIncrement;
          break;
        case '3':
          this.minute.specificSpecific.map(val => {
            minutes += val + ','
            this.minute.specificSpecific.push(val-0)
          });

          minutes = minutes.slice(0, -1);
          break;
        case '4':
          minutes = this.minute.rangeStart + '-' + this.minute.rangeEnd;
          break;
      }
      return minutes;
    },
    hoursText() {
      let hours = '';
      const cronEvery = this.hour.cronEvery;
      switch (cronEvery.toString()) {
        case '1':
          hours = '*';
          break;
        case '2':
          hours = this.hour.incrementStart + '/' + this.hour.incrementIncrement;
          break;
        case '3':
          this.hour.specificSpecific.map(val => {
            hours += val + ','
            this.hour.specificSpecific.push(val-0)
          });
          hours = hours.slice(0, -1);
          break;
        case '4':
          hours = this.hour.rangeStart + '-' + this.hour.rangeEnd;
          break;
      }
      return hours;
    },
    daysText() {
      let days = '';
      const cronEvery = this.day.cronEvery;
      switch (cronEvery.toString()) {
        case '1':
          break;
        case '2':
        case '4':
        case '11':
          days = '?';
          break;
        case '3':
          days = this.day.incrementStart + '/' + this.day.incrementIncrement;
          break;
        case '5':
          this.day.specificSpecific.map(val => {
            days += val + ','
            this.day.specificSpecific.push(val-0)
          });
          days = days.slice(0, -1);
          break;
        case '6':
          days = 'L';
          break;
        case '7':
          days = 'LW';
          break;
        case '8':
          days = this.day.cronLastSpecificDomDay + 'L';
          break;
        case '9':
          days = 'L-' + this.day.cronDaysBeforeEomMinus;
          break;
        case '10':
          days = this.day.cronDaysNearestWeekday + 'W';
          break
      }
      return days;
    },
    weeksText() {
      let weeks = '';
      const cronEvery = this.day.cronEvery;
      switch (cronEvery.toString()) {
        case '1':
        case '3':
        case '5':
          weeks = '?';
          break;
        case '2':
          weeks = this.week.incrementStart + '/' + this.week.incrementIncrement;
          break;
        case '4':
          this.week.specificSpecific.map(val => {
            weeks += val + ','
          });
          weeks = weeks.slice(0, -1);
          break;
        case '6':
        case '7':
        case '8':
        case '9':
        case '10':
          weeks = '?';
          break;
        case '11':
          weeks = this.week.cronNthDayDay + '#' + this.week.cronNthDayNth;
          break;
      }
      return weeks;
    },
    monthsText() {
      let months = '';
      const cronEvery = this.month.cronEvery;
      switch (cronEvery.toString()) {
        case '1':
          months = '*';
          break;
        case '2':
          months = this.month.incrementStart + '/' + this.month.incrementIncrement;
          break;
        case '3':
          this.month.specificSpecific.map(val => {
            months += val + ','
            this.month.specificSpecific.push(val-0)
          });
          months = months.slice(0, -1);
          break;
        case '4':
          months = this.month.rangeStart + '-' + this.month.rangeEnd;
          break;
      }
      return months;
    },
    yearsText() {
      let years = '';
      const cronEvery = this.year.cronEvery;
      switch (cronEvery.toString()) {
        case '1':
          years = '*';
          break;
        case '2':
          years = this.year.incrementStart + '/' + this.year.incrementIncrement;
          break;
        case '3':
          this.year.specificSpecific.map(val => {
            years += val + ','
            this.year.specificSpecific.push(val-0)
          });
          years = years.slice(0, -1);
          break;
        case '4':
          years = this.year.rangeStart + '-' + this.year.rangeEnd;
          break;
      }
      return years;
    },
    cron() {
      return `${this.secondsText || '*'} ${this.minutesText || '*'} ${this.hoursText || '*'} ${this.daysText || '*'} ${this.monthsText || '*'} ${this.weeksText || '?'} ${this.yearsText || '*'}`
    }
  },
  watch: {
    data() {
      this.$emit('CronChange', this.cron);
      this.rest(this.$data);
    },
    cron: {
      handler(newData, olddata) {
        this.$emit('CronChange', newData);
      },
      immediate: true
    }
    // expression: {
    //   handler(newData, olddata) {
    //     console.log('🚀 ~ file: index.vue ~ line 921 ~ handler ~ newData', newData)
    //   },
    // }
  },
  mounted() {
    this.resolveExpression();

    // this.translateLanguage()
  },
  methods: {

    helpFun(){
      this.$emit('CronChange', this.cronArryvalue);
      this.close()
    },
    getValue() {
      return this.cron;
    },
    change() {
      const cronVal={
        secondsText: this.secondsText,
        minutesText: this.minutesText,
        hoursText: this.hoursText,
        daysText: this.daysText,
        weeksText: this.weeksText,
        yearsText: this.yearsText
      }
      this.$emit('CronChange', this.cron);
      this.close();
    },
    close() {
      this.$emit('close')
    },
    rest(data) {
      for (const i in data) {
        if (data[i] instanceof Object) {
          this.rest(data[i])
        } else {
          switch (typeof data[i]) {
            case 'object': data[i] = []; break;
            case 'string': data[i] = ''; break;
          }
        }
      }
    },
    // 反向解析表达式  待测试----
    resolveExpression(res) {
      console.log('🚀 ~ file: index.vue ~ line 962 ~ resolveExpression ~ this.expression', this.expression)
      if (!this.expression) return;//有异常。。。待测试
      let expList = this.expression.split(' ');
      if (res&&expList){
        expList=res.split(' ')
      }
      if (expList.length < 7) {
        new Error('表达式格式不正确');
      }

      for (let i = 0; i < expList.length; i++) {
        this.exps[i].expression = expList[i];
      }

      this.exps.forEach((exp) => {
        this.output[exp.type] = exp.expression;
        switch (exp.type) {
          case 'year':
          case 'month':
          case 'hour':
          case 'minute':
          case 'second':
            this.commonParser(this[exp.type], exp.expression);
            return;
          case 'Week':
            this.resolveWeek(exp.expression);
            return;
          case 'day':
            this.resolveDay(exp.expression);
            return;
        }
      });
      console.log('week---》', this.week, 'year-----》', this.year, 'month-------》', this.month);
    },
    // 年，月，时，分，秒
    commonParser(expressionType, str) {
      if (str == '*') {
        this.resolveStar(expressionType);
      } else if (str.indexOf('-') >= 0) {
        this.resolveLine(expressionType, str);
      } else if (str.indexOf('/') >= 0) {
        this.resolveSlash(expressionType, str);
      } else {
        this.resolveComma(expressionType, str);
      }
    },
    resolveWeek(str) {
      if (str.indexOf('/') >= 0) {
        this.day.cronEvery = '2';
        this.resolveSlash(this.week, str);
      } else if (str.indexOf(',') >= 0) {
        this.day.cronEvery = '4';
        this.resolveComma(this.week, str);
      } else if (str.indexOf('#') >= 0) {
        this.day.cronEvery = '11';
        const range = str.split('#');
        this.handlecondsnscuengtv
        this.Week.cronNthDayDay = range[0];
        this.Week.cronNthDayNth = range[1];
      }
    },
    resolveDay(str) {
      if (str == '*') {
        this.resolveStar(this.day);
      } else if (str.indexOf('/') >= 0) {
        this.resolveSlash(this.day, str, '3');
      } else if (str == 'L') {
        this.day.cronEvery = '6';
      } else if (str == 'LW') {
        this.day.cronEvery = '7';
      } else if (/\dL/.test(str)) {
        this.day.cronEvery = '8';
        this.day.cronLastSpecificDomDay = Number(str.match(/(\d)L/)[1]);
      } else if (/L-\d+/.test(str)) {
        this.day.cronEvery = '9';
        this.day.cronDaysBeforeEomMinus = Number(str.match(/L-(\d+)/)[1]);
      } else if (/\d+W/.test(str)) {
        this.day.cronEvery = '10';
        this.day.cronDaysNearestWeekday = Number(str.match(/(\d+)W/))[1];
      } else {
        this.resolveComma(this.day, str, '5');
      }
    },
    resolveStar(expressionObj, type = '1') {
      expressionObj.cronEvery = type;
    },
    resolveSlash(expressionObj, expression, type = '2') {
      expressionObj.cronEvery = type;
      const range = expression.split('/');
      expressionObj.incrementStart = range[0];
      expressionObj.incrementIncrement = range[1];
    },
    resolveLine(expressionObj, expression, type = '4') {
      expressionObj.cronEvery = type;
      const range = expression.split('-');
      expressionObj.rangeStart = range[0];
      expressionObj.rangeStart = range[1];
    },
    resolveComma(expressionObj, expression, type = '3') {
      expressionObj.cronEvery = type;
      expressionObj.specificSpecific = expression.split(',');
      console.log('🚀 ~ file: index.vue ~ line 1069 ~ resolveComma ~ expression', expression)
    }

  }
}
</script>
<style lang="scss" scoped>
#changeContab {
  .language {
  //必须----
    position: absolute;
    right: 25px;
    z-index: 1;
  }
  .el-tabs {
    box-shadow: none;
  }
  .tabBody {
    .el-row {
      margin: 5px 0;
      .long {
        .el-select {
          width: 350px;
        }
      }
      .el-input-number {
        width: 110px;
      }
    }
  }
  .bottom {
    width: 100%;
    text-align: right;
    margin:0.5vw auto;
    position: relative;
    .value {
      font-size: 18px;
      vertical-align: middle;
    }
  }
  .checkBox_style{
    white-space: normal;
    width: 48vw;
    >.el-checkbox{
      width: 30px;

    }
  }
}
</style>
