<template>
  <canvas></canvas>
</template>

<script>
import Chart from 'chart.js/auto';
import 'chartjs-adapter-luxon';
import ChartStreaming from 'chartjs-plugin-streaming';

Chart.register(ChartStreaming);

export default {
  name: "liveChart",
  props: ['myData', 'title'],
  data() {
    return {
      count: 0,
      myChart: null
    }
  },
  watch: {
    myData: function(newVal) {
      // console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      // Receive Data Update (WORKING!!!)
      let cnt = 0;

      let myChart = this.myChart;
      // loop through each value in newVal.y
      newVal.y.forEach(function(y) {
        let label = newVal.label + cnt;

        // newVal.label check to see if dataset already has this label
        let foundSet = myChart.data.datasets.find(dataset => dataset.label == label)
        // if so, push {...} to dataset.data

        if (foundSet !== undefined) {
          foundSet.data.push({
            x: newVal.x,
            y: y
          })
        // if not, create new dataset via push
        } else {
          myChart.data.datasets.push({
            label: label,
            data: [{
              x: newVal.x,
              y: y
            }]
          })
          myChart.update();
        }
        
        cnt++;
      })
      
      this.myChart.update('quiet');
    }
  },
  mounted() {
    const options = {
      plugins: {
        // Change options for ALL axes of THIS CHART
        streaming: {
          duration: 20000
        },
        title: {
          display: true,
          text: this.title,
          padding: {
            top: 10,
            bottom: 30
          }
        }
      },
      scales: {
        x: {
          type: 'realtime',
          // Change options only for THIS AXIS
          realtime: {
            duration: 20000
          }
        }
      }
    };

    const config = {
      type: 'line',
      data: {
        datasets: []
      },
      options: options
    };

    let ctx = this.$el; 
    this.myChart = new Chart(ctx, config);
  }
}
</script>

