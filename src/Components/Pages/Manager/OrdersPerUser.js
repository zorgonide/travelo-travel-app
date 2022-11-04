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
      text: "User Stats",
    },
  },
};
function OrdersPerUser({ data }) {
  const labels = data.map((e) => "ID - " + e.id + " " + e.name);
  const pdata = {
    labels,
    datasets: [
      {
        label: "Number of Orders",
        data: data.map((e) => (e.number_of_orders ? e.number_of_orders : 0)),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return <Bar options={options} data={pdata} />;
}

export default OrdersPerUser;
