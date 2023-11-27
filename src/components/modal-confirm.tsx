import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

// @ts-ignore
const ConfirmationModal = ({ isVisible, scheduling, onConfirm, onCancel, onRequestClose }) => {
    const date = new Date(scheduling.datetime);
    const minutes = date.getMinutes();
    const hour = date.getHours()
    const formattedHourAndMinutes = (`${hour < 0 ? `0${hour}` : hour}:${minutes < 10 ? `0${minutes}` : minutes}`);
    const FormattedDate = `${date.toLocaleDateString()} ás ${formattedHourAndMinutes}`;

    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={onRequestClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title} >Dados do Agendamento: </Text>
                    <View style={styles.body}>
                        <Text style={styles.text}>Tipo do Serviço: {scheduling?.service?.name}</Text>
                        <Text style={styles.text}>Data: {FormattedDate}</Text>
                        <Text style={styles.text}>Barbeiro: {scheduling?.barber?.name}</Text>
                    </View>
                    <View style={styles.modalButtons}>
                        <TouchableOpacity onPress={onCancel} style={styles.modalButton}>
                            <Text style={styles.modalButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onConfirm} style={styles.modalButton}>
                            <Text style={styles.modalButtonText}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 30,
        borderRadius: 10,
        elevation: 5,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    modalButton: {
        padding: 10,
        backgroundColor: '#1f547e',
        borderRadius: 5,
    },
    text: {
        fontSize: 18,
        fontWeight: "400",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10
    },
    modalButtonText: {
        color: '#ffffff',
        fontSize: 18
    },
    body: {
        width: "100%",
    }
});

export default ConfirmationModal;
