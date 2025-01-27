import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: number[];
  labels: string[];
}

const BarChartHorizontal: React.FC<BarChartProps> = ({ data, labels }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Agendamentos por Dia da Semana",
        data: data,
        backgroundColor: "rgba(250, 212, 0, 0.95)",
        borderColor: "rgba(250, 212, 0, 0.95)",
        borderWidth: 1,
        
        maxBarThickness: 80
      },
    ],
  };

  const options = {
    responsive: true,
    indexAxis: "x",    
    plugins: {
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.label}: ${tooltipItem.raw} agendamentos`;
          },
        },
      },
      legend: {
        display: true,
        position: "bottom" as const,
        labels: {
          color: "rgb(255, 99, 132)",
          font: {
            size: 16,
            family: "Poppins",
          },
          padding: 20,
          usePointStyle: true,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="mt-5" style={{ width: "100%", height: "100%" }}>
      <Bar data={chartData} options={options as any} />
    </div>
  );
};

export default BarChartHorizontal;
