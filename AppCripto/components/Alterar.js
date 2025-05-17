import React, { useState, useEffect } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { updateCripto } from './Api';

export default function Alterar({ route, navigation }) {
  const { Book } = route.params;
  
  useEffect(() => {
    console.log('Dados recebidos na tela de alteração:', Book); // Para debug
  }, []);

  const [nomeCripto, setNomeCripto] = useState(Book.nomeCripto);
  const [siglaCripto, setSiglaCripto] = useState(Book.siglaCripto);

  const handleUpdate = () => {
    if (!nomeCripto || !siglaCripto) {
      Alert.alert('Atenção', 'Preencha todos os campos antes de atualizar.');
      return;
    }

    // Log dos dados antes de enviar
    console.log('Dados sendo enviados para atualização:', {
      id: Book.codigo,
      nomeCripto,
      siglaCripto
    });

    const updatedData = {
      nomeCripto,
      siglaCripto
    };

    Alert.alert(
      'Confirmação',
      'Tem certeza de que deseja alterar esta Criptomoeda?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Alterar',
          onPress: () => updateCripto(Book.codigo, updatedData, navigation),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alterar Criptomoeda</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome da Criptomoeda"
        placeholderTextColor="#aaa"
        value={nomeCripto}
        onChangeText={setNomeCripto}
      />

      <TextInput
        style={styles.input}
        placeholder="Sigla da Criptomoeda"
        placeholderTextColor="#aaa"
        value={siglaCripto}
        onChangeText={setSiglaCripto}
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Atualizar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
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
    backgroundColor: '#2980b9',
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
