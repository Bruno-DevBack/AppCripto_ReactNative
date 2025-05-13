import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack'; 
import Home from '../components/Home'; 
import Cadastro from '../components/Cadastro'; 
import Alterar from '../components/Alterar'; 

const Stack = createStackNavigator(); 

export default function Rotas() { 
    return ( 
    <NavigationContainer> 
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerStyle: { backgroundColor: '#121212' }, // Fundo do cabeçalho
                headerTintColor: '#fff', // Cor do texto e da seta
                headerTitleStyle: { fontWeight: 'bold' }, // Estilo do título
            }}
        > 
            <Stack.Screen 
                name="Home" 
                component={Home} 
                options={{ title: 'Página Inicial' }} // Título da tela inicial
            /> 
            <Stack.Screen 
                name="Cadastro" 
                component={Cadastro} 
                options={{
                    title: 'Cadastro de Cripto', // Título da tela
                    headerBackTitleVisible: false, // Remove o texto "Voltar"
                }}
            /> 
            <Stack.Screen 
                name="Alterar" 
                component={Alterar} 
                options={{
                    title: 'Alterar Cripto', // Título da tela
                    headerBackTitleVisible: false, // Remove o texto "Voltar"
                }}
            /> 
        </Stack.Navigator> 
    </NavigationContainer> 
); 
}