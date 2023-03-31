const runSimulation = (startingZ, startingW, simulationLength) => {
  const results = [
    {
      z: startingZ,
      w: startingW,
    },
  ];

  const simulateNext = (z, w, a = 0.02, b = 0.0005, c = 0.05) => {
    return {
      z: z + a * z - b * z * w,
      w: w + b * z * w - c * w,
    };
  };

  let decliningZ, decliningW;
  for (let i = 0; i < simulationLength; i++) {
    const last = results[results.length - 1];
    const next = simulateNext(last.z, last.w);

    if (next.z < last.z && !decliningZ) {
      decliningZ = `Z started declining at ${i} months`;
    }

    if (next.w < last.w && !decliningW) {
      decliningW = `W started declining at ${i} months`;
    }

    results.push(next);
  }

  return { results, message: `${decliningZ}, ${decliningW}` };
};

document.addEventListener("DOMContentLoaded", () => {
  const startingZ = 100;
  const startingW = 30;
  const simulationLength = 200;

  const simulation = runSimulation(startingZ, startingW, simulationLength);
  console.table(simulation.results);
  console.log(simulation.message);

  const chart = Highcharts.chart("chart", {
    chart: {
      type: "line",
    },
    title: {
      text: "Z and W over time",
    },
    xAxis: {
      title: {
        text: "Months",
      },
    },
    yAxis: {
      title: {
        text: "Population",
      },
    },
    series: [
      {
        name: "Z",
        data: simulation.results.map((result) => result.z),
      },
      {
        name: "W",
        data: simulation.results.map((result) => result.w),
      },
    ],
  });
});
