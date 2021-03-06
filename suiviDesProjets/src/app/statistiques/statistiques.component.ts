import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { isNullOrUndefined } from 'util';
import { StatistiquesService } from '../../services/statistiques.service';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit {
  myChart: any;
  fileName: string = 'statistiques-' + new Date() + '.pdf';
  critere: string = "annee";
  labels: Array<string>;
  data: any;
  label: string = 'Projets par ' + (isNullOrUndefined(this.critere) || this.critere == 'annee'? 'années !' : this.critere + 's');
  allData: any;

  constructor(public statService: StatistiquesService) { }

  ngOnInit() {
    this.statService.getStatistiques(this.critere)
      .subscribe(
        data => {
          this.allData = data;
          this.labels = Object.keys(data.statMap);
          this.data = Object.values(data.statMap);
          this.initializeChartComponent();
        },
        err => { console.log(err); })
  }

  getChartType() {
    switch (this.critere) {
      case 'annee':
        return 'bar';
      default:
        return 'pie';
    }
  }

  getRandomColor() {
    return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',0.2)';
  }

  getBackgroundColors() {
    let resultColors = [];
    let n = this.data.length;
    for (let index = 0; index < n; index++) {
      resultColors.push(this.getRandomColor());
    }
    return resultColors;
  }

  initializeChartComponent() {
    switch (this.critere) {
      case 'annee':
        this.initialiseBarChar();
        break;
      default:
        this.initiaseDefaultChart()
        break;
    }
  }

  initialiseBarChar() {
    var colors = this.getBackgroundColors();
    var ctx = document.getElementById('myChart');
    this.myChart = new Chart(ctx, {
      type: this.getChartType(), //same type just change the value: bars, pie, ...
      data: {
        labels: this.labels,
        datasets: [{
          label: this.label,
          data: this.data,
          backgroundColor:
            colors,
          borderColor:
            colors,
          borderWidth: 1
        }]
      },
      options: {
        title: {
          display: true,
          position: 'top',
          text: this.label,
          fontSize:20
        },
        legend: {
          display: false,
        },
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              stepSize: 1,
              beginAtZero: true
            }
          }],
          xAxes: [{
            barThickness: 50
          }]
        }
      }
    });
  }

  releadChart() {

  }

  initiaseDefaultChart() {
    var colors = this.getBackgroundColors();
    var ctx = document.getElementById('myChart');
    this.myChart = new Chart(ctx, {
      type: this.getChartType(), //same type just change the value: bars, pie, ...
      data: {
        labels: this.labels.map(key => { return key + ' (Nb: ' + this.allData.statMap[key] + ')' }),
        datasets: [{
          label: this.label,
          data: this.data,
          backgroundColor:
            colors,
          borderColor:
            colors,
          borderWidth: 1
        }]
      },
      options: {
        title: {
          display: true,
          position: 'top',
          text: this.label,
          fontSize:20
        },
        responsive: true
      }
    });
  }
  showCritere() {
    console.log(this.critere);
    this.label = 'Projets par ' + (this.critere =='annee' ? 'années !' : this.critere + 's');
    this.myChart.destroy();
    this.ngOnInit()
  }
}
