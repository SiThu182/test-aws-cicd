// src/components/PieChart.js

import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";

const PieChart = ({ data, title, status = false }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  // const [filteredData, setFilteredData] = useState( {
  //   labels:  data[0],
  //   datasets: [
  //     {
  //       data: data[1],
  //       backgroundColor: [ '#36A2EB', '#FFCE56'],
  //       hoverBackgroundColor: [ '#36A2EB', '#FFCE56'],
  //     },
  //   ],
  // });

  useEffect(() => {
    // Destroy the old chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create a new chart with filtered data
    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      // legend:{
      //   position:'bottom'
      // },
      data: {
        labels: data[0] || "",
        datasets: [
          {
            data: data[1],
            backgroundColor: ["#FFD80B", "#0AEAF9"],
            hoverBackgroundColor: ["#FFD80B", "#0AEAF9"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom", // Legend position set here
            labels: {
              // This more specific font property overrides the global property
              font: {
                size: 20,
                weight: "normal",
              },
            },
            display: status == true ? false : true,
          },
        },
      },
      plugins: [
        {
          id: "center-label",

          beforeDraw: (chart) => {
            // chart.options.plugins.legend.position = 'bottom';
            const ctx = chart.ctx;
            const centerText = `${data[2]}\n${title}`; // Change this to your desired title
            const fontSize = 20; // Change the font size as needed
            const fontFamily = "Arial"; // Change the font family as needed
            const paddingX = 20; // Horizontal padding
            const paddingY = 10; // Vertical padding

            // Draw the label text in the center
            ctx.restore();
            ctx.font = `${fontSize}px ${fontFamily}`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "black"; // Change the text color as needed

            const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
            const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
            const lines = centerText.split("\n"); // Split text into lines
            const lineHeight = fontSize + paddingY; // Line height including padding

            for (let i = 0; i < lines.length; i++) {
              const textY =
                centerY - (lines.length / 2) * lineHeight + i * lineHeight;
              ctx.fillText(lines[i], centerX, textY);
            }
            ctx.save();
          },
        },
      ],
    });

    // Clean up when the component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  // Function to apply the filter
  //   const applyFilter = (filterValue) => {
  //     // Implement your filtering logic here based on the dynamic data
  //     // Update the filteredData state with the filtered data
  //     const filtered = data.filter((item) => item.category === filterValue);
  //     setFilteredData(filtered);
  //   };

  return (
    <div>
      <canvas ref={chartRef}></canvas>

      {/* <button onClick={() => applyFilter('Category1')}>Category 1</button>
        <button onClick={() => applyFilter('Category2')}>Category 2</button> */}
      {/* Add more filter buttons or input fields as needed */}
    </div>
  );
};

export default PieChart;
