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

function StatTotalsChart({ data }) {
  const totalsData = {
    labels: data.map(item => item.date),
    datasets: [
      {
        label: "Stat total(Make dynamic)",
        data: data.map(item => item.stat),
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
    <div>
      <Line data={totalsData} options={options}></Line>
    </div>
  );
}

export default StatTotalsChart;
