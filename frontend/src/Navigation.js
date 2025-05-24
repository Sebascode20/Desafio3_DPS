import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import BookListScreen from './screens/BookListScreen';
import BookFormScreen from './screens/BookFormScreen';
import BookDetailScreen from './screens/BookDetailScreen';
import { AuthContext } from './context/AuthContext';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Iniciar Sesión' }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Registrarse' }} />
          </>
        ) : (
          <>
            <Stack.Screen name="BookList" component={BookListScreen} options={{ title: 'Mis Libros' }} />
            <Stack.Screen name="BookForm" component={BookFormScreen} options={{ title: 'Agregar/Editar Libro' }} />
            <Stack.Screen name="BookDetail" component={BookDetailScreen} options={{ title: 'Detalle del Libro' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
