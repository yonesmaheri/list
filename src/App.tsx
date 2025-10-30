import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  ChartOptions,
  ChartData,
  Plugin,
} from "chart.js";
import { useRef } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

const labels = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const values = [30, 75, 55, 95, 95, 95, 30, 60, 20, 20, 85, 65];

const roundCornersPlugin: Plugin = {
  id: "roundedCorners",
  afterDatasetsDraw: (chart) => {
    const ctx = chart.ctx;
    const dataset = chart.data.datasets[0];
    const meta = chart.getDatasetMeta(0);
    const points = meta.data.map((p: any) => p.getProps(["x", "y"], true));

    const radius = 10; // شعاع گردی گوشه‌ها

    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = dataset.borderColor as string;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];

      // افقی حرکت کن تا قبل از گوشه
      ctx.lineTo(p2.x - radius, p1.y);

      // قوس گوشه
      ctx.quadraticCurveTo(p2.x, p1.y, p2.x, p1.y + (p2.y - p1.y > 0 ? radius : -radius));

      // عمودی حرکت کن
      ctx.lineTo(p2.x, p2.y);
    }

    ctx.stroke();
    ctx.restore();
  },
};


export default function MyChart() {
  const chartRef = useRef<any>(null);

  const data: ChartData<"line"> = {
    labels,
    datasets: [
      {
        label: "درصد",
        data: values,
        fill: true,
        borderColor: "#1976d2",
        borderWidth: 3,
        stepped: true,
        pointRadius: 0,
        pointBackgroundColor: "#1976d2",
        pointBorderColor: "#fff",
        pointHoverRadius: 0,
        backgroundColor: (ctx) => {
          const chart = ctx.chart;
          const { ctx: canvasCtx, chartArea } = chart;
          if (!chartArea) return "rgba(25, 118, 210, 0.3)";

          const gradient = canvasCtx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, "rgba(25, 118, 210, 0.4)");
          gradient.addColorStop(1, "rgba(25, 118, 210, 0)");
          return gradient;
        },
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#1976d2",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          callback: (tickValue) => tickValue + "%",
        },
      },
    },
  };

  return (
    <>
      <Line
        ref={chartRef}
        data={data}
        options={options}
        plugins={[roundCornersPlugin]}
      />
    </>
  );
}
