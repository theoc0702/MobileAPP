// App.tsx
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, ScrollView, Alert, Pressable } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface Service {
  id: string;
  name: string;
  price: number;
}

interface Appointment {
  id: number;
  name: string;
  phone: string;
  date: string;
  service: Service;
}

const SERVICES: Service[] = [
  { id: 'homme', name: 'Coupe Homme', price: 20 },
  { id: 'femme', name: 'Coupe Femme', price: 50 },
  { id: 'homme-barbe', name: 'Coupe Homme + Barbe', price: 35 },
];

export default function App() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(new Date());
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  const handleSubmit = () => {
    if (!name || !phone || !selectedService) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs et sélectionner un service');
      return;
    }

    const newAppointment: Appointment = {
      id: Date.now(),
      name,
      phone,
      date: date.toLocaleString('fr-FR'),
      service: selectedService,
    };

    setAppointments(prevAppointments => [...prevAppointments, newAppointment]);
    setName('');
    setPhone('');
    setDate(new Date());
    setSelectedService(null);
    Alert.alert('Succès', 'Rendez-vous enregistré');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Salon de Coiffure</Text>
      
      <Text style={styles.subtitle}>Sélectionnez un service :</Text>
      <View style={styles.serviceContainer}>
        {SERVICES.map((service) => (
          <Pressable
            key={service.id}
            style={[
              styles.serviceButton,
              selectedService?.id === service.id && styles.serviceButtonSelected
            ]}
            onPress={() => setSelectedService(service)}
          >
            <Text style={[
              styles.serviceButtonText,
              selectedService?.id === service.id && styles.serviceButtonTextSelected
            ]}>
              {service.name} - {service.price}€
            </Text>
          </Pressable>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Téléphone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <Button 
        title="Sélectionner la date et l'heure"
        onPress={showDatePicker}
      />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        locale="fr-FR"
      />

      <Text style={styles.dateText}>
        Date sélectionnée: {date.toLocaleString('fr-FR')}
      </Text>

      <Button title="Enregistrer" onPress={handleSubmit} />

      <ScrollView style={styles.appointmentList}>
        <Text style={styles.subtitle}>Rendez-vous enregistrés:</Text>
        {appointments.map((apt: Appointment) => (
          <View key={apt.id} style={styles.appointmentItem}>
            <Text>Nom: {apt.name}</Text>
            <Text>Téléphone: {apt.phone}</Text>
            <Text>Service: {apt.service.name} - {apt.service.price}€</Text>
            <Text>Date: {apt.date}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  dateText: {
    marginVertical: 10,
    textAlign: 'center',
  },
  appointmentList: {
    marginTop: 20,
  },
  appointmentItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
  serviceContainer: {
    marginBottom: 20,
  },
  serviceButton: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  serviceButtonSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  serviceButtonText: {
    textAlign: 'center',
    fontSize: 16,
  },
  serviceButtonTextSelected: {
    color: 'white',
  },
});