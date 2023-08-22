import {
  Chart as ChartJS,
  BarElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

// we must register each feature we need for the bar chart
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function PerformanceChart({ data }) {
  // give time for the data to load
  if (!data) {
    return <div>Loading data...</div>;
  }

  // display this to user before they have selected the stat they wish to view
  if (data.length === 0) {
    return (
      <div className="d-flex justify-content-center">
        Select a stat to view your players' performance
      </div>
    );
  }

  // loads the specific statName to be used (3rd element in data array)
  let stat = data[2].statName;

  // data to populate bar chart - changes depending on user selection
  const performanceData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: `${stat}`,
        data: data.map((item) => item.amount),
        backgroundColor: "red",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  // options for scale of y-axis
  const options = {
    plugins: {
      legend: true,
    },
    scales: {
      y: {
        min: 0,
        max: 16,
      },
    },
  };

  return (
    <div>
      <Bar
        style={{ width: "100%" }}
        data={performanceData}
        options={options}
      ></Bar>
    </div>
  );
}

export default PerformanceChart;
