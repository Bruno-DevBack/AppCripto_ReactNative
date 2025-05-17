const API_URL = 'https://criptos.webapptech.cloud/api/cripto';
import { Alert } from 'react-native';

// Função para buscar as Criptos
export const fetchCripto = async (setRegistros) => {
  try {
    // Inicia a requisição com timeout de 10 segundos
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const textResponse = await response.text();
    let responseData;
    
    try {
      responseData = JSON.parse(textResponse);
    } catch (parseError) {
      console.error('Erro ao processar resposta JSON:', parseError);
      throw new Error('Erro ao processar dados da API');
    }

    // Verifica se a resposta tem a estrutura esperada
    if (!responseData.data || !Array.isArray(responseData.data)) {
      console.warn('Resposta da API não contém um array de dados:', responseData);
      setRegistros([]);
      return;
    }

    // Mapeia os dados para o formato esperado pelo app
    const formattedData = responseData.data.map(item => ({
      codigo: item.id,
      nomeCripto: item.nomeCripto,
      siglaCripto: item.siglaCripto
    }));

    console.log('Dados formatados:', formattedData);
    setRegistros(formattedData);
  } catch (error) {
    console.error('Erro ao buscar Criptos:', error);
    
    let mensagem = 'Erro ao buscar as criptomoedas.';
    if (error.name === 'AbortError') {
      mensagem = 'Tempo limite excedido. Verifique sua conexão.';
    } else if (error.message.includes('HTTP')) {
      mensagem = `Erro no servidor: ${error.message}`;
    }
    
    Alert.alert(
      'Erro',
      mensagem,
      [{ text: 'OK' }]
    );
    
    setRegistros([]);
  }
};

// Função para criar Cripto
export const createCripto = async (criptoData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(criptoData),
    });

    if (response.status === 204) {
      Alert.alert('Sucesso!', 'Cadastro realizado com sucesso!');
      return {};  // Retorna um objeto vazio para evitar erro
    }

    const textResponse = await response.text();
    let responseData;
    try {
      responseData = JSON.parse(textResponse);
    } catch (error) {
      console.warn('A resposta não é um JSON válido.');
      responseData = null;
    }

    if (!response.ok || !responseData) {
      throw new Error(responseData?.message || 'Erro desconhecido na API');
    }

    return responseData;
  } catch (error) {
    console.error('Erro ao cadastrar Cripto:', error.message);
    Alert.alert('Erro ao cadastrar', `Detalhes: ${error.message}`);
    return null;
  }
};

// Função para deletar Cripto
export const deleteCripto = async (criptoId, setRegistros) => {
  try {
    const response = await fetch(`${API_URL}/${criptoId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    const textResponse = await response.text();
    let responseData = null;

    try {
      responseData = JSON.parse(textResponse);
    } catch (error) {
      console.warn('A resposta não é um JSON válido.');
    }

    if (response.ok && responseData?.success) {
      Alert.alert('Sucesso!', responseData.message || 'Criptomoeda excluída com sucesso!');
      setRegistros((prevRegistros) => {
        return prevRegistros.filter((cripto) => cripto.codigo !== criptoId);
      });
    } else {
      throw new Error(responseData?.message || 'Erro desconhecido ao excluir a Criptomoeda');
    }
  } catch (error) {
    console.error('Erro ao excluir Criptomoeda:', error.message);
    Alert.alert('Erro ao excluir', `Detalhes: ${error.message}`);
  }
};

// Função para atualizar Cripto
export const updateCripto = async (criptoId, updatedData, navigation) => {
  try {
    // Enviando os dados com os nomes corretos dos campos
    const response = await fetch(`${API_URL}/${criptoId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nomeCripto: updatedData.nomeCripto,
        siglaCripto: updatedData.siglaCripto
      }),
    });

    const textResponse = await response.text();
    console.log('Resposta da API:', textResponse);

    let responseData;
    try {
      responseData = JSON.parse(textResponse);
    } catch (error) {
      console.warn('A resposta não é um JSON válido.');
      responseData = null;
    }

    if (response.ok && responseData?.success) {
      Alert.alert('Sucesso!', responseData.message || 'Criptomoeda atualizada com sucesso!', [
        { text: 'OK', onPress: () => navigation.navigate('Home') }
      ]);
    } else {
      if (responseData?.errors) {
        // Formatando as mensagens de erro para exibição
        const errorMessages = Object.values(responseData.errors)
          .flat()
          .join('\n');
        throw new Error(errorMessages);
      } else {
        throw new Error(responseData?.message || 'Erro desconhecido ao atualizar a Criptomoeda');
      }
    }
  } catch (error) {
    console.error('Erro ao atualizar Criptomoeda:', error.message);
    Alert.alert('Erro ao atualizar', `Detalhes: ${error.message}`);
  }
};
