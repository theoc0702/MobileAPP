import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, Button, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const businesses = [
  { id: 1, name: "Coiffure Elégance", services: ["Coupe Homme", "Coupe Femme"] },
  { id: 2, name: "Institut Beauté Zen", services: ["Massage", "Soins visage"] },
  { id: 3, name: "Barber Shop", services: ["Rasage", "Dégradé"] },
];

export default function App() {
  const [search, setSearch] = useState("");
  const [filteredBusinesses, setFilteredBusinesses] = useState(businesses);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [viewAppointments, setViewAppointments] = useState(false);

  const handleSearch = (text) => {
    setSearch(text);
    setFilteredBusinesses(
      businesses.filter((b) => b.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const handleSelectAppointment = () => {
    setAppointments([...appointments, { business: selectedBusiness.name, service: selectedService, date }]);
    setSelectedService(null);
    setSelectedBusiness(null);
    Alert.alert("Succès", "Votre rendez-vous a bien été enregistré.");
  };

  const handleCancelAppointment = (index) => {
    Alert.alert("Confirmation", "Êtes-vous sûr de vouloir annuler ce rendez-vous ?", [
      { text: "Non", style: "cancel" },
      { text: "Oui", onPress: () => {
          const newAppointments = appointments.filter((_, i) => i !== index);
          setAppointments(newAppointments);
          Alert.alert("Annulé", "Votre rendez-vous a bien été annulé.");
        }
      }
    ]);
  };

  return (
    <View style={{ padding: 20 }}>
      {viewAppointments ? (
        <>
          <TouchableOpacity onPress={() => setViewAppointments(false)} style={{ marginBottom: 10 }}>
            <Text style={{ color: 'blue' }}>← Retour</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Mes Rendez-vous</Text>
          <FlatList
            data={appointments}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={{ padding: 10, borderBottomWidth: 1 }}>
                <Text>{item.business} - {item.service}</Text>
                <Text>{item.date.toLocaleString()}</Text>
                <Button title="Annuler" onPress={() => handleCancelAppointment(index)} color="red" />
              </View>
            )}
          />
        </>
      ) : !selectedBusiness ? (
        <>
          <Button title="Voir mes rendez-vous" onPress={() => setViewAppointments(true)} />
          <TextInput
            placeholder="Rechercher un commerçant..."
            value={search}
            onChangeText={handleSearch}
            style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 }}
          />
          <FlatList
            data={filteredBusinesses}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={{ padding: 10, borderBottomWidth: 1 }}
                onPress={() => setSelectedBusiness(item)}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      ) : !selectedService ? (
        <View>
          <TouchableOpacity onPress={() => setSelectedBusiness(null)} style={{ marginBottom: 10 }}>
            <Text style={{ color: 'blue' }}>← Retour</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
            {selectedBusiness.name}
          </Text>
          <FlatList
            data={selectedBusiness.services}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={{ padding: 10, borderBottomWidth: 1 }}
                onPress={() => setSelectedService(item)}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        <View>
          <TouchableOpacity onPress={() => setSelectedService(null)} style={{ marginBottom: 10 }}>
            <Text style={{ color: 'blue' }}>← Retour</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
            {selectedService}
          </Text>
          <Button title="Choisir une date et un horaire" onPress={() => setShowPicker(true)} />
          {showPicker && (
            <DateTimePicker
              value={date}
              mode="datetime"
              display="default"
              onChange={(event, selectedDate) => {
                setShowPicker(false);
                if (selectedDate) setDate(selectedDate);
              }}
            />
          )}
          <Text style={{ marginTop: 10 }}>Date et heure sélectionnées : {date.toLocaleString()}</Text>
          <Button title="Sélectionner cet horaire" onPress={handleSelectAppointment} />
        </View>
      )}
    </View>
  );
}
