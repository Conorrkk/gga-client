import {
  Chart as ChartJS,
  BarElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

// we must register each feature we need for our bar chart
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function MatchTotals({ data }) {
  // the data we are going to pass into our bar component - dynamic
  const statData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: "Team total",
        data: data.map((item) => item.amount),
        backgroundColor: "blue",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  // options for the y axis
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
      <Bar style={{ width: "90%", margin: "10px" }} data={statData} options={options}></Bar>
    </div>
  );
}

export default MatchTotals;
