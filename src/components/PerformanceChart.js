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

function PerformanceChart({ data }) {
    if (!data) {
        return <div>Loading data...</div>;
      }
    
      if (data.length === 0) {
        return <div className="d-flex justify-content-center">Select a stat to view your players' performance</div>;
      }

      let stat = data[2].statName

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
    )
}

export default PerformanceChart;