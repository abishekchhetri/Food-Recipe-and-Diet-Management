//this data is for the stats of all dish added based on data of user
import { COLORS } from './config.js';

export const DOUGHNUT_DATA = function (data) {
  const dataOptions = data.addedDiet.reduce(
    (acc, val, idx) => {
      acc.name.push(val.name);
      acc.calories.push(val.calories);
      acc.backgroundColor.push(COLORS[idx]);
      return acc;
    },
    {
      name: [],
      calories: [],
      backgroundColor: [],
    }
  );

  return {
    labels: [...dataOptions.name],
    datasets: [
      {
        label: 'Calories ',
        data: [...dataOptions.calories],
        backgroundColor: [...dataOptions.backgroundColor],
        hoverOffset: 4,
      },
    ],
  };
};

export const LINE_GRAPH = function (data) {
  const labels = [
    'Baisakh',
    'Jesha',
    'Asar',
    'Sharawn',
    'Bhadra',
    'Asoj',
    'Kartik',
    'Mangsir',
    'Poush',
    'Magh',
    'Falgun',
    'Chaitra',
  ];
  return {
    labels: labels,
    datasets: [
      {
        label: 'Weight',
        data: data.dietSummary.weights,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };
};
