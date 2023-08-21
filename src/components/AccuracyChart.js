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

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend);

function AccuracyChart({ data }) {
  const accuracyData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Shot accuracy",
        data: data.map((item) => item.accuracy),
        backgroundColor: "red",
        borderColor: "black",
        pointBorderColor: "red",
        pointBackgroundColor: "red",
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
