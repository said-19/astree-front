import { Component, OnInit } from "@angular/core";
import { DashboardService } from "app/services/dashboard.service";
import * as Chartist from "chartist";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadUserCountByRoleChart();
    this.loadMonthlyRegistrationsChart();
    this.loadActivityRateChart();
  }

  // ----------- Animations Chartist -----------
  startAnimationForLineChart(chart: any) {
    let seq = 0,
      delays = 80,
      durations = 500;
    chart.on("draw", (data: any) => {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === "point") {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    });
    seq = 0;
  }

  startAnimationForBarChart(chart: any) {
    let seq2 = 0,
      delays2 = 80,
      durations2 = 500;
    chart.on("draw", (data: any) => {
      if (data.type === "bar") {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    });
    seq2 = 0;
  }

  startAnimationForPieChart(chart: any) {
    chart.on("draw", (data: any) => {
      if (data.type === "slice") {
        const pathLength = data.element._node.getTotalLength();
        data.element.attr({
          "stroke-dasharray": pathLength + "px " + pathLength + "px",
        });
        const animationDefinition = {
          "stroke-dashoffset": {
            id: "anim" + data.index,
            dur: 1000,
            from: -pathLength + "px",
            to: "0px",
            easing: Chartist.Svg.Easing.easeOutQuint,
            fill: "freeze",
          },
        };
        data.element.animate(animationDefinition, false);
      }
    });
  }

  // ----------- Charts Dynamically from API -----------
  loadUserCountByRoleChart() {
    this.dashboardService.getUserCountByRole().subscribe((data) => {
      console.log(data);
      const labels = data.map((r: any) => r.role);
      const series = [data.map((r: any) => r.count)];

      const chart = new Chartist.Bar(
        "#roleChart",
        { labels, series },
        {
          axisX: { showGrid: false },
          low: 0,
          high: Math.max(...series[0]) + 10,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0 },
        }
      );

      this.startAnimationForBarChart(chart);
    });
  }

  loadMonthlyRegistrationsChart() {
    //
    this.dashboardService.getMonthlyRegistrations().subscribe((data) => {
      console.log(data);
      const labels = data.map((r: any) => r.month);
      const series = [data.map((r: any) => r.count)];

      const chart = new Chartist.Line(
        "#monthlyRegistrationsChart",
        { labels, series },
        {
          lineSmooth: Chartist.Interpolation.cardinal({ tension: 0 }),
          low: 0,
          high: Math.max(...series[0]) + 10,
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
        }
      );

      this.startAnimationForLineChart(chart);
    });
  }

  loadActivityRateChart() {
    //
    this.dashboardService.getActivityRate(30).subscribe((data: any) => {
      console.log(data);
      const labels = ["Actifs", "Inactifs"];
      const series = [data.activeUsers, data.totalUsers - data.activeUsers];

      const chart = new Chartist.Pie(
        "#activityRateChart",
        { labels, series },
        {
          labelInterpolationFnc: (value, idx) => `${value}: ${series[idx]}`,
        }
      );

      this.startAnimationForPieChart(chart);
    });
  }

  // ----------- Export PDF / Excel -----------
  exportExcel() {
    this.dashboardService.exportExcelReport().subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "UserReport.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  exportPdf() {
    this.dashboardService.exportPdfReport().subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "UserReport.pdf";
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
