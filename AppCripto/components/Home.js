import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import FloatingActionButton from 'react-native-floating-action-button';
import { fetchCripto, deleteCripto } from './Api';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Home({ navigation }) {
  const [registro, setRegistros] = useState([]);

  useEffect(() => {
    fetchCripto(setRegistros);
  }, []);

  const handleDelete = (id) => {
    Alert.alert(
      'Confirmação',
      'Tem certeza de que deseja deletar esta Cripto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          onPress: () => deleteCripto(id, setRegistros),
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>
        <Text style={styles.label}>Sigla:</Text> {item.sigla}{'\n'}
        <Text style={styles.label}>Nome:</Text> {item.nome}
      </Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => handleDelete(item.codigo)}
        >
          <Icon name="trash" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => navigation.navigate('Alterar', { Book: item })}
        >
          <Icon name="edit" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={registro}
        keyExtractor={(item) => item.codigo?.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma cripto cadastrada.</Text>}
      />
      <FloatingActionButton
        onPress={() => navigation.navigate('Cadastro')}
        icon="plus"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 10,
  },
  list: {
    paddingBottom: 100,
  },
  itemContainer: {
    marginBottom: 12,
    padding: 15,
    backgroundColor: '#1f1f1f',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  itemText: {
    fontSize: 16,
    color: '#f1f1f1',
    marginBottom: 8,
    lineHeight: 22,
  },
  label: {
    fontWeight: 'bold',
    color: '#00d8ff',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
  },
  editButton: {
    backgroundColor: '#2980b9',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 30,
    fontSize: 16,
  },
});
