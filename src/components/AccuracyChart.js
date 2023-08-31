import "../styles.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
  Legend,
} from "chart.js";

// need to register everything we want to use in our chart
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend);

function AccuracyChart({ data }) {
  // data that populates the line chart
  const accuracyData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Shot accuracy",
        data: data.map((item) => item.accuracy),
        backgroundColor: "blue",
        borderColor: "black",
        pointBorderColor: "blue",
        pointBackgroundColor: "blue",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // options for the y axis on line chart
  const options = {
    plugins: {
      legend: true,
    },
    scales: {
      y: {
        min: 0.0,
        max: 1.0,
      },
    },
  };

  return (
    <div>
      <Line data={accuracyData} options={options}></Line>
    </div>
  );
}

export default AccuracyChart;
