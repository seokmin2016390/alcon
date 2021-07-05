<template>
  <div class="home">
    <div class="flex-container">
      <div class="col-12">
        <LineChart />
      </div>
    </div>
    <div class="flex-container">
      <div class="col-12">
        <PieChart />
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/LineChart.vue'
import PieChart from '@/components/PieChart.vue'
export default {
  name: 'VueChartJS',
  components: {
    LineChart,
    PieChart
  }
}
</script>
