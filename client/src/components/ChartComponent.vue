<template>
  <div>
    <div class="row justify-content-center">
      <canvas id="questionChart" width="400" height="100"></canvas>
    </div>
  </div>
</template>
<script>
import Chart from "chart.js";
export default {
  name: "chartComponent",
  data() {
    return {
      questionChartData: {}
    };
  },
  computed: {
    question() {
      //NOTE returns question being viewed
      return this.$store.state.ResultsStore.singleResult.pollSnapshot.questions.find(
        q => q.id == this.$route.params.questionId
      );
    },
    questionOptions() {
      //NOTE returns all options for current question
      let arr = ["unanswered"];
      for (var o in this.question.options) {
        arr.push(this.question.options[o].body);
      }
      return arr;
    },
    optionColors() {
      //NOTE returns all options for current question
      let arr = ["transparent"];
      for (var c in this.question.options) {
        arr.push(this.question.options[c].color);
      }
      return arr;
    },
    responses() {
      //NOTE grabs all responses for question
      return this.$store.state.ResultsStore.singleResult.responses.filter(
        r => r.questionId == this.$route.params.questionId
      );
    },
    selected() {
      let arr = [];
      let a = 0;
      let b = 0;
      let c = 0;
      let d = 0;
      for (var i in this.responses) {
        if (this.questionOptions[0] == this.responses[i].option.body) {
          a++;
        }
      }
      for (var i in this.responses) {
        if (this.questionOptions[1] == this.responses[i].option.body) {
          b++;
        }
      }
      if (this.questionOptions.length > 2) {
        for (var i in this.responses) {
          if (this.questionOptions[2] == this.responses[i].option.body) {
            c++;
          }
        }
      }
      if (this.questionOptions.length > 3) {
        for (var i in this.responses) {
          if (this.questionOptions[3] == this.responses[i].option.body) {
            d++;
          }
        }
      }
      arr.push(a, b, c, d);
      return arr;
    }
  },
  methods: {
    newChart() {
      this.questionChartData = {
        type: "bar",
        data: {
          labels: this.questionOptions,
          datasets: [
            {
              label: "choices",
              data: this.selected,
              backgroundColor: [
                "rgba(58,163,216,.5)",
                "rgba(58,163,216,.5)",
                "rgba(58,163,216,.5)",
                "rgba(58,163,216,.5)"
              ],
              hoverBackgroundColor: this.optionColors,
              borderColor: ["#36495d", "#36495d", "#36495d", "#36495d"],
              borderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          lineTension: 1,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  padding: 25
                }
              }
            ]
          },
          events: ["click"]
        }
      };
    },
    createChart(chartId, chartData) {
      // this.newChart();
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
    }
  },
  mounted() {
    this.newChart();
    this.createChart("questionChart", this.questionChartData);
  }
};
</script>
<style scoped>
</style>