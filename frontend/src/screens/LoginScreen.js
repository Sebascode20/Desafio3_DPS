import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  const handleLogin = async () => {
    try {
      
      const res = await api.post('/auth/login', { correo, contrasenia });
      
      await login(res.data.token);
      navigation.replace('BookList');
    } catch (err) {
      Alert.alert('Error', 'Credenciales inválidas');
    }
  };

  return (
    <View>
      <TextInput placeholder="Correo" value={correo} onChangeText={setCorreo} />
      <TextInput placeholder="Contraseña" value={contrasenia} secureTextEntry onChangeText={setContrasenia} />
      <Button title="Iniciar sesión" onPress={handleLogin} />
    </View>
  );
}
