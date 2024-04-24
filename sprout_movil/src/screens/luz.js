import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, ActivityIndicator } from 'react-native';
import axiosInstance from '../components/instanciaAxios';
import SafeArea from '../components/SafeArea';
import Graficas from '../components/graficas';
import IntervaloDeTiempo from '../components/GestorTiempo'; 
import Estadisticas from '../components/stats'; 

const { width, height } = Dimensions.get('window');

const LuzScreen = () => {
  const [dataPeriod, setDataPeriod] = useState('Mes');
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [] }]
  });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    let startDate, endDate;
    const today = new Date();
    switch (dataPeriod) {
      case 'Día':
        startDate = endDate = today.toISOString().split('T')[0];
        break;
      case 'Semana':
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        startDate = startOfWeek.toISOString().split('T')[0];
        endDate = endOfWeek.toISOString().split('T')[0];
        break;
      case 'Mes':
        startDate = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0];
        break;
      default:
        startDate = endDate = today.toISOString().split('T')[0];
        break;
    }
    
    try {
      const response = await axiosInstance.get(`/api/historial?startDate=${startDate}&endDate=${endDate}`);
      const labels = response.data.map(item => item.fecha.split('T')[0]);
      const data = response.data.map(item => item.luz);
      setChartData({
        labels,
        datasets: [{
          data,
          strokeWidth: 2
        }],
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [dataPeriod]);  // Asegúrate de que fetchData se ejecute cada vez que dataPeriod cambie

  return (
    <SafeArea style={styles.safeArea}>
      <View style={styles.blueContainer}>
        <Text style={styles.headerText}>Luz</Text>
        <IntervaloDeTiempo dataPeriod={dataPeriod} setDataPeriod={setDataPeriod} />
        {loading ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : (
          <Graficas
            data={chartData}
            width={width * 0.9}
            height={220}
          />
        )}
      </View>
      {!loading && chartData && (
        <Estadisticas 
          maximo={Math.max(...chartData.datasets[0].data).toFixed(2)}
          minimo={Math.min(...chartData.datasets[0].data).toFixed(2)}
          promedio={(chartData.datasets[0].data.reduce((sum, value) => sum + value, 0) / chartData.datasets[0].data.length).toFixed(2)}
        />
      )}
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  blueContainer: {
    backgroundColor: '#0C5963',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: (2 * height) / 3,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default LuzScreen;
