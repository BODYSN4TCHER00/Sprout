import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
import CircularChart from '../components/graficasCirculares';
import ParameterBox from '../components/cajaBotones';
import Header from '../components/Header';
import SafeArea from '../components/SafeArea';
import axiosInstance from './../components/instanciaAxios';

const { height, width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const today = new Date();
  
  const [dispositivoData, setDispositivoData] = useState({
    humedad: 0,
    temperatura: 0,
    luz: 0
  });
  
  useEffect(() => {
    const fetchDispositivoData = async () => {
      try {
        const response = await axiosInstance.get('/api/dispositivos/valores');
        setDispositivoData(response.data);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'No se pudo obtener los datos del dispositivo.');
      }
    };
  
    fetchDispositivoData();

  }, []);

  return (
    <SafeArea>
      <Header navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.chartContainer}>
          <CircularChart size={110} width={15} fill={dispositivoData.humedad} tintColor="rgba(200, 48, 204, 0.73)" backgroundColor="rgba(200, 48, 204, 0.22)" label="Humedad" unit="%" />
          <CircularChart size={110} width={15} fill={dispositivoData.temperatura} tintColor="rgba(92, 96, 189, 0.96)" backgroundColor="rgba(92, 96, 189, 0.35)" label="Temperatura" unit="°C"/>
          <CircularChart size={110} width={15} fill={dispositivoData.luz} tintColor="rgba(250, 255, 0, 1)" backgroundColor="rgba(250, 255, 0, 0.31)" label="Luz" unit="Lm"/>
        </View>
        
        <View style={styles.parametersContainer}>
          
          <View style={styles.row}>
            <ParameterBox title="Temperatura" iconName="thermometer" fecha="01/04/2024"
                          onPress={() => navigation.navigate('Temperatura')}>
            </ParameterBox>
            <ParameterBox title="Humedad" iconName="water" fecha="01/04/2024"
                          onPress={() => navigation.navigate('Humedad')}>
            </ParameterBox>
          </View>

          <View style={styles.row}>
            <ParameterBox title="Luz Solar" iconName="white-balance-sunny" fecha="01/04/2024"
                          onPress={() => navigation.navigate('Luz')}>
            </ParameterBox>
          </View>
        </View>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: height / 4,
    width: '90%',
    backgroundColor: 'rgba(12, 99, 78, 0.35)',
    borderRadius: 50,
    margin: 20,
  },
  parametersContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default HomeScreen;
