import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Vehicle Stats",
    },
  },
};
function BikeStats({ data }) {
  const labels = data.map((e) => e.id);

  const pdata = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data: data.map((e) => (e.revenue ? e.revenue : 0)),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Journey time",
        data: data.map((e) => (e.journeyTime ? e.journeyTime / 3600 : 0)),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Orders",
        data: data.map((e) => (e.orders ? e.orders : 0)),
        backgroundColor: "green",
      },
    ],
  };
  return <Bar options={options} data={pdata} />;
}

export default BikeStats;
