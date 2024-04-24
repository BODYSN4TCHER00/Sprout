import React from 'react';
import { Modal, Text, Button, Portal } from 'react-native-paper';

const CustomAlertModal = ({ isVisible, onDismiss, title, message }) => {
    return (
        <Portal>
            <Modal visible={isVisible} onDismiss={onDismiss} contentContainerStyle={{backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 20}}>
                <Text style={{marginBottom: 20, fontSize: 18, fontWeight: 'bold'}}>{title}</Text>
                <Text style={{marginBottom: 20}}>{message}</Text>
                <Button mode="contained" onPress={onDismiss}>Cerrar</Button>
            </Modal>
        </Portal>
    );
};

export default CustomAlertModal;
