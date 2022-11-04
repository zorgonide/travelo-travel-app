import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "At a glance",
    },
  },
};

function TotalStats({ data }) {
  const TOTAL_STATS = {
    labels: ["Total Revenue £", "Total Vehicles Rented", "Total Orders"],
    datasets: [
      {
        label: "Total Stats",
        data: [data.Total_Amount, data.Total_Bikes_rented, data.Total_Orders],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut data={TOTAL_STATS} options={options} />;
}

export default TotalStats;
