
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import BasePage from '@/app.base';
import { findAllServices } from '@/repositories/ServiceRepository';
import { ServiceModel } from '@/@types/models';
import { router } from 'expo-router';

export default function Service() {
  const [services, setServices] = useState<ServiceModel[]>([]);
  //const _services: ServiceModel[] = [
    /*{ id: '1', name: 'Corte Masculino' },
    { id: '2', name: 'Pigmentação de barba' },
    { id: '3', name: 'Corte Infantil' },
    { id: '4', name: 'Barba' },
    { id: '5', name: 'Barba + Corte' },
    { id: '6', name: 'Penteado' },
    { id: '7', name: 'Coloração' },
    { id: '8', name: 'Hidratação' },   
    { id: '9', name: 'Sobrancelha' },
    { id: '10', name: 'Hidratação + Corte' },*/
    // Adicione os outros serviços com suas IDs];

  useEffect(() => {
    const unsubscribe = () => {
      findAllServices()
        .then(allServices => {
          setServices(allServices);
        })
        .catch((error: any) => {
          console.error('Error get all service: ', error);
        });
    };

    return unsubscribe();
  }, []);

  const handleNavigateSignUp = (id: string) => {
     router.replace(`/service/scheduling/${id}`);
  };

  return (
    <BasePage>
      <View style={styles.container}>
        <Text style={styles.heading}>Serviços Oferecidos</Text>
        <View style={styles.row}>
          {services.map((service) => (
            <View key={service.id} style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleNavigateSignUp(service.id)}
              >
                <Text style={styles.buttonText}>{service.name}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </BasePage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '50%',
    padding: 10,
  },
  button: {
    backgroundColor: '#1f547e',
    padding: 17,
    margin: 9,
    borderRadius: 9,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});