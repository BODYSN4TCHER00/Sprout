import React, { useState, useContext } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener esta librería instalada
import { AuthContext } from '../components/authContext';

const RegistrationScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const { signUp } = useContext(AuthContext);

  // Función para validar el email
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async () => {
    if (!validateEmail(email) || password.length < 6 || password !== confirmPassword || !termsAccepted) {
      setModalContent('Por favor, verifica que todos los campos sean correctos y que hayas aceptado los términos y condiciones.');
      setModalVisible(true);
      return;
    }

    const registered = await signUp(nombre, apellido, email, telefono, password);
    if (registered) {
      navigation.replace('Home');
    } else {
      setModalContent('No se pudo completar el registro.');
      setModalVisible(true);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#0C5963" />
      </TouchableOpacity>
      <View style={styles.container}>
        <Image
          source={require('../../assets/logo2.png')}
          resizeMode="contain"
          style={styles.logo}
        />
        <Text style={styles.appName}>Sprout</Text>
        <Text style={styles.header}>Crear Cuenta</Text>

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>Apellido</Text>
        <TextInput
          style={styles.input}
          value={apellido}
          onChangeText={setApellido}
        />

        <Text style={styles.label}>Correo Electrónico</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          keyboardType="phone-pad"
          value={telefono}
          onChangeText={setTelefono}
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.label}>Confirmar Contraseña</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.termsContainer} onPress={() => setTermsAccepted(!termsAccepted)}>
          <Text style={[styles.termsText, termsAccepted && styles.termsTextAccepted]}>
            Acepto los términos y condiciones
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
      {/* Modal para las alertas */}
      <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{modalContent}</Text>
          <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.modalButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 5,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    // fontFamily: 'RobotoMono-Light', // Asegúrate de incluir esta fuente en tu proyecto o elige una similar
    color: 'black',
    marginBottom: 10,
  },
  label: {
    width: '90%',
    marginLeft: 20,
    color: '#0C5963',
    fontSize: 14,
    marginBottom: 5,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#F4F4F4',
  },
  header: {
    fontSize: 22,
    color: '#0C5963',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '90%',
    marginVertical: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    color: '#333',
    borderWidth: 1,
    borderColor: '#0C5963',
  },
  termsContainer: {
    marginVertical: 12,
  },
  termsText: {
    color: '#4056F4',
    textDecorationLine: 'underline',
  },
  termsTextAccepted: {
    color: '#32E0C4',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#0C5963',
    padding: 15,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 12,
  },
  modalButton: {
    backgroundColor: '#4056F4',
    padding: 10,
    borderRadius: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 18,
  }
});

export default RegistrationScreen;
