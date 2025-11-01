import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements AfterViewInit {

  ngAfterViewInit(): void {
    this.initLeaveChart();
    this.initTypeChart();
  }

  initLeaveChart() {
    new Chart('leaveChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Leave Requests',
          data: [8, 12, 6, 14, 9, 15],
          borderColor: '#007bff',
          tension: 0.3,
          fill: true,
          backgroundColor: 'rgba(0, 123, 255, 0.1)',
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }

  initTypeChart() {
    new Chart('typeChart', {
      type: 'doughnut',
      data: {
        labels: ['Sick', 'Annual', 'Personal', 'Emergency'],
        datasets: [{
          data: [30, 45, 15, 10],
          backgroundColor: ['#17a2b8', '#28a745', '#ffc107', '#dc3545']
        }]
      },
      options: { responsive: true }
    });
  }
}
