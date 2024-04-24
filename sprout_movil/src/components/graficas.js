import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

const Graficas = ({ data }) => {
  // Mueve la lógica para obtener los días directamente dentro de Graficas
  const getDaysEvery7Days = (labels) => {
    return labels.filter((_, index) => index % 7 === 0).map(date => date.split('-')[2]);
  };

  const chartData = {
    ...data,
    labels: getDaysEvery7Days(data.labels)
  };

  const chartConfig = {
    backgroundColor: '#0C5963',
    backgroundGradientFrom: '#0C5963',
    backgroundGradientTo: '#0C5963',
    decimalPlaces: 1, 
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, 
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <LineChart
      data={chartData}
      width = {width * .95}
      height={220}
      chartConfig={chartConfig}
      bezier
      style={{
        left: -10,
        marginVertical: 8,
        borderRadius: 16,
      }}
      fromZero
      withHorizontalLabels={true}
      horizontalLabelsHeight={90}
      horizontalLabelRotation={-45}
    />
  );
};

export default Graficas;
