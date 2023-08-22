import "../styles.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
  Legend,
  Filler,
} from "chart.js";

// register all features we want to use
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Filler
);

function StatTotalsChart({ data }) {
  // buffer time for data to load
  if (!data) {
    return <div>Loading data...</div>;
  }

  // display if there is no data
  if (data.length === 0) {
    return <div>Data unavailable.</div>;
  }

  // the name for the chart
  let statName = data[0].name;

  // the data that will be sent to the Line component
  const totalsData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: `${statName}`,
        data: data.map((item) => item.stat),
        backgroundColor: "red",
        borderColor: "black",
        pointBorderColor: "red",
        fill: false,
        tension: 0.4,
      },
    ],
  };

  // the options for the line component y-axis
  const options = {
    plugins: {
      legend: true,
    },
    scales: {
      y: {
        min: 0,
        max: 10,
      },
    },
  };

  return (
    <div>
      <Line data={totalsData} options={options}></Line>
    </div>
  );
}

export default StatTotalsChart;
