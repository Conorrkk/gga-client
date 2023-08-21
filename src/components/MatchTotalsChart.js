import {
  Chart as ChartJS,
  BarElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function MatchTotals({ data }) {
  const statData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: "Team totals",
        data: data.map((item) => item.amount),
        backgroundColor: "green",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: true,
    },
    scales: {
      y: {
        min: 0,
        max: 20,
      },
    },
  };

  return (
    <div>
      <Bar
        style={{ width: "100%" }}
        data={statData}
        options={options}
      ></Bar>
    </div>
  );
}

export default MatchTotals;
