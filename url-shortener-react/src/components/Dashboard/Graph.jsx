import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(
  BarElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  Legend
);

const Graph = ({ graphData = [] }) => {

  // ✅ prevent crash if no data
  if (!graphData || graphData.length === 0) {
    return (
      <div className="flex justify-center items-center h-40 text-gray-500">
        No analytics data available
      </div>
    );
  }

  const labels = graphData.map((item) => item.clickDate);
  const values = graphData.map((item) => item.count);

  const data = {
    labels,
    datasets: [
      {
        label: "Total Clicks",
        data: values,
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
    },
  };

  return (
    <div style={{ height: "300px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Graph;