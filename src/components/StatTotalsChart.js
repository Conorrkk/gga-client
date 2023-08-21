import "../styles.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
  Legend,
  Filler
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Filler);

function StatTotalsChart({ data }) {
  if (!data) {
    return <div>Loading data...</div>;
  }

  if (data.length === 0) {
    return <div>Data unavailable.</div>;
  }

  let statName = data[0].name;
  
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
