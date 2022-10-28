<template>
  <div>
    <el-input v-model="cronVal" style="width: 220px;" />
    <Cron :expression="cronVal" @CronChange="handelCron" />
                    <CrontabResult :ex="CrontabResultex" :times="runsNumberArry.sum" @change="(e,sum)=>{runsNumberArry.runsArry=e,runsNumberArry.sum=sum}" />
  </div>

</template>

<script>
import Cron from './TaskPlansCron'

export default {
  components: {
    Cron
  },
  data(){
    return {
      cronVal: ''

    }
  },

  methods: {
    handelCron(val){
      this.cronVal=val
    }
  }

}
</script>

<style >

</style>
