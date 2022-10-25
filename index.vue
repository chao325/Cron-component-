<template>
  <div>
    <el-input v-model="cronVal" style="width: 220px;" />
    <Cron :expression="cronVal" @CronChange="handelCron" />
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
