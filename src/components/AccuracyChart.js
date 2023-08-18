import "../styles.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
  Legend
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend);

function AccuracyChart({ data }) {
  const accuracyData = {
    labels: data.map(iteam => iteam.date),
    datasets: [
      {
        label: "Shot accuracy",
        data: data.map(item => item.accuracy),
        backgroundColor: 'aqua',
        borderColor: 'black',
        pointBorderColor: 'aqua',
        fill: true,
        tension: 0.4
      },
    ],
  };

  const options = {
    plugins: {
        legend: true
    },
    scales: {
        y: {
            min: 0.00,
            max: 1.00
        }
    }
  }

  return (
    // <div style={
    //     {width: "600px",
    //     height: "300px"}
    // }>
    <div>
      <Line data={accuracyData} options={options}></Line>
    </div>
  );
}

export default AccuracyChart;
