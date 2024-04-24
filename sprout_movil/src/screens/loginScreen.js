import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { TextInput, Button, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../components/authContext';
import CustomAlertModal from '../components/modalAlert';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false); // Nuevo estado para controlar la carga
    const { signIn } = useAuth();
    const { colors } = useTheme();

    const handleLogin = async () => {
        setLoading(true); // Activar el indicador de carga
        const success = await signIn(email, password);
        if (success) {
            navigation.replace('HomeTabs');
        } else {
            setIsModalVisible(true);
        }
        setLoading(false); // Desactivar el indicador de carga
    };

    const navigateToRegister = () => {
        navigation.navigate('Register');
    };

    return (
        <LinearGradient
            colors={['#0C5963', 'rgba(12, 99, 78, 0.35)']}
            style={styles.background}
        >
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <CustomAlertModal
                    isVisible={isModalVisible}
                    onDismiss={() => setIsModalVisible(false)}
                    title="Error"
                    message="No se pudo iniciar sesión. Verifica tus credenciales."
                />
                <View style={styles.inputContainer}>
                    <Image
                        source={require('../../assets/logo.jpeg')}
                        style={styles.logo}
                    />
                    <Text style={styles.appName}>Sprout</Text> 

                    <TextInput
                        label="Correo electrónico"
                        mode="outlined"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        theme={{ colors: { primary: colors.primary } }}
                    />
                    <TextInput
                        label="Contraseña"
                        mode="outlined"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        style={styles.input}
                        theme={{ colors: { primary: colors.primary } }}
                    />
                    <Button 
                        mode="contained" 
                        onPress={handleLogin} 
                        style={styles.button}
                        disabled={loading}
                        loading={loading}
                    >
                        {loading ? 'Cargando...' : 'Ingresar'}
                    </Button>
                    <Text 
                        onPress={navigateToRegister} 
                        style={styles.registerText}
                    >
                        ¿No tienes cuenta? Regístrate
                    </Text>
                </View>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    appName: {
        fontSize: 32,
        color: 'black',
        marginBottom: 25,
        fontWeight: 'light',
    },
    background: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%',
        backgroundColor: 'rgba(255,255,255,0.85)',
        borderRadius: 25,
        padding: 20,
        alignItems: 'center', 
    },
    input: {
        width: '100%',
        marginVertical: 10,
    },
    button: {
        marginTop: 10,
    },
    registerText: {
        marginTop: 20,
        color: 'blue',
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
});

export default LoginScreen;
