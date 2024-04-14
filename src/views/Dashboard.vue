<!-- <template>
  <div class="text-center">
    <div class="col-lg-4 mt-4">
      <chart-holder-card
        title="기온"
        update="updated 4 min ago"
        color="success"
      >
        <reports-line-chart
          :chart="{
            labels: [
              '06',
              '07',
              '08',
              '09',
              '11',
              '12',
              '13',
              '14',
              '15',
              '16',
              '17',
              '18',
              '19',
              '20',
              '21',
              '22',
              '23',
            ],
            datasets: {
              label: 'Mobile apps',
              data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
            },
          }"
        />
      </chart-holder-card>
    </div>
  </div>

  <div class="text-center">
    <div class="col-lg-4 mt-4">
      <chart-holder-card
        title="강수확률"
        update="just updated"
        color="dark"
      >
        <reports-line-chart
          id="tasks-chart"
          :chart="{
            labels: [
              '월요일',
              '화요일',
              '수요일',
              '목요일',
              '금요일',
              '토요일',
              '일요일',
            ],
            datasets: {
              label: 'Mobile apps',
              data: [50, 40, 30, 20, 50, 25, 40],
            },
          }"
        />
      </chart-holder-card>
    </div>
  </div>
</template>
<script>
import ChartHolderCard from "./components/ChartHolderCard.vue";
import ReportsBarChart from "@/examples/Charts/ReportsBarChart.vue";
import ReportsLineChart from "@/examples/Charts/ReportsLineChart.vue";
import MiniStatisticsCard from "./components/MiniStatisticsCard.vue";
import ProjectCard from "./components/ProjectCard.vue";
import TimelineList from "@/examples/Cards/TimelineList.vue";
import TimelineItem from "@/examples/Cards/TimelineItem.vue";
export default {
  name: "dashboard-default",
  data() {

  },
  components: {
    ChartHolderCard,
    ReportsBarChart,
    ReportsLineChart,
    MiniStatisticsCard,
    ProjectCard,
    TimelineList,
    TimelineItem,
  },
};
</script> -->
