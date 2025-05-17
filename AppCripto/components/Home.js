import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fetchCripto, deleteCripto } from './Api';

export default function Home({ navigation }) {
  const [registro, setRegistros] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    try {
      await fetchCripto(setRegistros);
      console.log('Dados carregados:', registro); // Para debug
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchCripto(setRegistros);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });

    return unsubscribe;
  }, [navigation]);

  const handleDelete = (id) => {
    Alert.alert(
      'Confirmação',
      'Tem certeza de que deseja deletar esta Criptomoeda?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          onPress: () => deleteCripto(id, setRegistros),
          style: 'destructive'
        },
      ]
    );
  };

  const renderItem = ({ item }) => {
    console.log('Renderizando item:', item); // Para debug
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>
          <Text style={styles.label}>Sigla:</Text> {item.siglaCripto}{'\n'}
          <Text style={styles.label}>Nome:</Text> {item.nomeCripto}
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
            onPress={() => navigation.navigate('Alterar', { 
              Book: {
                codigo: item.codigo,
                nomeCripto: item.nomeCripto,
                siglaCripto: item.siglaCripto
              }
            })}
          >
            <Icon name="edit" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00d8ff" />
          <Text style={styles.loadingText}>Carregando criptomoedas...</Text>
        </View>
      ) : (
        <FlatList
          data={registro}
          keyExtractor={(item) => item.codigo?.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma criptomoeda cadastrada.</Text>}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#00d8ff']}
              tintColor="#00d8ff"
            />
          }
        />
      )}
      
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Icon name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#f1f1f1',
    marginTop: 10,
    fontSize: 16,
  },
  list: {
    paddingBottom: 80,
  },
  itemContainer: {
    marginBottom: 12,
    padding: 15,
    backgroundColor: '#1f1f1f',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    elevation: 2,
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
    elevation: 2,
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
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#00d8ff',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
  },
});
