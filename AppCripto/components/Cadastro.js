import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { createCripto } from './Api';

export default function Cadastro({ navigation }) {
  const [nomeCripto, setNomeCripto] = useState('');
  const [siglaCripto, setSiglaCripto] = useState('');
  const [selectedCriptoId, setSelectedCriptoId] = useState(null);

  const handleSubmit = async () => {
    if (!nomeCripto || !siglaCripto) {
      Alert.alert('Atenção', 'Preencha todos os campos antes de cadastrar.');
      return;
    }

    const newCripto = { nomeCripto, siglaCripto };

    if (selectedCriptoId) {
      await updateCripto(selectedCriptoId, newCripto);
      setSelectedCriptoId(null);
    } else {
      const addedCripto = await createCripto(newCripto);
      if (addedCripto) {
        Alert.alert('Sucesso!', 'Cadastro realizado com sucesso!', [
          { text: 'OK', onPress: () => navigation.navigate('Home') },
        ]);
      }
    }

    setNomeCripto('');
    setSiglaCripto('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Cripto</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome da Cripto"
        placeholderTextColor="#aaa"
        value={nomeCripto}
        onChangeText={setNomeCripto}
      />

      <TextInput
        style={styles.input}
        placeholder="Sigla da Cripto"
        placeholderTextColor="#aaa"
        value={siglaCripto}
        onChangeText={setSiglaCripto}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark theme
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#00d8ff',
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1f1f1f',
    color: '#fff',
    padding: 12,
    borderRadius: 6,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#444',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#00c853',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
