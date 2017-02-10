import { Component, OnInit } from '@angular/core';

declare const d3: any;

@Component({
  selector: 'app-d3-charts',
  templateUrl: './d3-charts.component.html',
  styleUrls: ['./d3-charts.component.scss']
})
export class D3ChartsComponent implements OnInit {

  options;
  data;
  chartType;

  chartTypes = [
    'lineChart',
    'discreteBarChart',
    'pieChart',
    'donutChart'
  ];

  color = d3.scale.category20();

  AllOptions = {
    lineChart: {
      chart: {
        type: 'lineChart',
        height: 200,
        margin : {
          top: 20,
          right: 20,
          bottom: 40,
          left: 55
        },
        x: function(d){ return d.x; },
        y: function(d){ return d.y; },
        useInteractiveGuideline: true,
        dispatch: {
          stateChange: function(e){ console.log('stateChange'); },
          changeState: function(e){ console.log('changeState'); },
          tooltipShow: function(e){ console.log('tooltipShow'); },
          tooltipHide: function(e){ console.log('tooltipHide'); }
        },
        xAxis: {
          axisLabel: 'Time (ms)'
        },
        yAxis: {
          axisLabel: 'Voltage (v)',
          tickFormat: function(d){
            return d3.format('.02f')(d);
          },
          axisLabelDistance: -10
        },
        callback: function(chart){
          console.log('!!! lineChart callback !!!');
        }
      }
    },
    discreteBarChart: {
      chart: {
        type: 'discreteBarChart',
        height: 200,
        margin : {
          top: 20,
          right: 20,
          bottom: 50,
          left: 55
        },
        x: function(d){ return d.label; },
        y: function(d){ return d.value; },
        showValues: true,
        valueFormat: function(d){
          return d3.format(',.4f')(d);
        },
        duration: 500,
        xAxis: {
          axisLabel: 'X Axis'
        },
        yAxis: {
          axisLabel: 'Y Axis',
          axisLabelDistance: -10
        }
      }
    },
    pieChart: {
      chart: {
        type: 'pieChart',
        height: 300,
        x: function(d){ return d.key; },
        y: function(d){ return d.y; },
        showLabels: true,
        duration: 500,
        labelThreshold: 0.01,
        labelSunbeamLayout: true,
        legend: {
          margin: {
            top: 5,
            right: 35,
            bottom: 5,
            left: 0
          }
        }
      }
    },
    donutChart: {
      chart: {
        type: 'pieChart',
        height: 300,
        donut: true,
        x: function(d){ return d.key; },
        y: function(d){ return d.y; },
        showLabels: true,
        pie: {
          startAngle: function(d) { return d.startAngle / 2 - Math.PI / 2; },
          endAngle: function(d) { return d.endAngle / 2 - Math.PI / 2; }
        },
        duration: 500,
        legend: {
          margin: {
            top: 5,
            right: 140,
            bottom: 5,
            left: 0
          }
        }
      }
    },
  };

  AllData = {
    lineChart: this.sinAndCos(),
    discreteBarChart: [
      {
        key: 'Cumulative Return',
        values: [
          {
            'label' : 'A' ,
            'value' : -29.765957771107
          } ,
          {
            'label' : 'B' ,
            'value' : 0
          } ,
          {
            'label' : 'C' ,
            'value' : 32.807804682612
          } ,
          {
            'label' : 'D' ,
            'value' : 196.45946739256
          } ,
          {
            'label' : 'E' ,
            'value' : 0.19434030906893
          } ,
          {
            'label' : 'F' ,
            'value' : -98.079782601442
          } ,
          {
            'label' : 'G' ,
            'value' : -13.925743130903
          } ,
          {
            'label' : 'H' ,
            'value' : -5.1387322875705
          }
        ]
      }
    ],
    pieChart: [
      {
        key: 'One',
        y: 5
      },
      {
        key: 'Two',
        y: 2
      },
      {
        key: 'Three',
        y: 9
      },
      {
        key: 'Four',
        y: 7
      },
      {
        key: 'Five',
        y: 4
      },
      {
        key: 'Six',
        y: 3
      },
      {
        key: 'Seven',
        y: .5
      }
    ],
    donutChart: [
      {
        key: 'One',
        y: 5
      },
      {
        key: 'Two',
        y: 2
      },
      {
        key: 'Three',
        y: 9
      },
      {
        key: 'Four',
        y: 7
      },
      {
        key: 'Five',
        y: 4
      },
      {
        key: 'Six',
        y: 3
      },
      {
        key: 'Seven',
        y: .5
      }
    ]
  };

  constructor() {
   }

  ngOnInit() {
    this.selectType(this.chartTypes[0]);
  }

  selectType(e) {
    this.chartType = e;
    this.options = this.AllOptions[this.chartType];
    this.data = this.AllData[this.chartType];
  }

  // utils
  sinAndCos() {
    const sin = [], sin2 = [], cos = [];

    // Data is represented as an array of {x,y} pairs.
    for (let i = 0; i < 100; i++) {
      sin.push({x: i, y: Math.sin(i / 10)});
      sin2.push({x: i, y: i % 10 === 5 ? null : Math.sin(i / 10) * 0.25 + 0.5});
      cos.push({x: i, y: .5 * Math.cos(i / 10 + 2) + Math.random() / 10});
    }

    // Line chart data should be sent as an array of series objects.
    return [
      {
        values: sin,      // values - represents the array of {x,y} data points
        key: 'Sine Wave', // key  - the name of the series.
        color: '#ff7f0e'  // color - optional: choose your own line color.
      },
      {
        values: cos,
        key: 'Cosine Wave',
        color: '#2ca02c'
      },
      {
        values: sin2,
        key: 'Another sine wave',
        color: '#7777ff',
        area: true      // area - set to true if you want this line to turn into a filled area chart.
      }
    ];
  }

}
