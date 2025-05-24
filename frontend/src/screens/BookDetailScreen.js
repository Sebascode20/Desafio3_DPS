import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import api from '../api/api';

export default function BookDetailScreen({ route, navigation }) {
  const { libroId } = route.params;
  const [libro, setLibro] = useState(null);
  const [estatus, setEstatus] = useState('');

  useEffect(() => {
    obtenerLibro();
  }, []);

  const obtenerLibro = async () => {
    try {
      const res = await api.get(`/libros/${libroId}`);
      setLibro(res.data);
      setEstado(res.data.estado);
    } catch (error) {
      Alert.alert('Error', 'No se pudo obtener el libro');
    }
  };

  const actualizarEstatus = async (nuevoEstatus) => {
    try {
      await api.put(`/libros/${libroId}`, { ...libro, estatus: nuevoEstatus });
      setEstado(nuevoEstatus);
      Alert.alert('Éxito', 'Estatus actualizado');
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el estatus');
    }
  };

  const eliminarLibro = () => {
    Alert.alert('Confirmar', '¿Estás seguro que deseas eliminar este libro?', [
      { text: 'Cancelar' },
      {
        text: 'Eliminar',
        onPress: async () => {
          try {
            await api.delete(`/libros/${libroId}`);
            navigation.goBack();
          } catch (error) {
            Alert.alert('Error', 'No se pudo eliminar el libro');
          }
        },
      },
    ]);
  };

  if (!libro) return <Text>Cargando...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título:</Text>
      <Text style={styles.text}>{libro.titulo}</Text>

      <Text style={styles.label}>Autor:</Text>
      <Text style={styles.text}>{libro.autor}</Text>

      <Text style={styles.label}>Estatus:</Text>
      <Picker
        selectedValue={estatus}
        style={Platform.OS === 'ios' ? undefined : styles.picker}
        onValueChange={actualizarEstatus}
      >
        <Picker.Item label="Por leer" value="por leer" />
        <Picker.Item label="Leyendo" value="leyendo" />
        <Picker.Item label="Completado" value="completado" />
      </Picker>

      {libro.fecha_inicio ? (
        <>
          <Text style={styles.label}>Fecha inicio:</Text>
          <Text style={styles.text}>{libro.fecha_inicio}</Text>
        </>
      ) : null}

      {libro.fecha_fin ? (
        <>
          <Text style={styles.label}>Fecha fin:</Text>
          <Text style={styles.text}>{libro.fecha_fin}</Text>
        </>
      ) : null}

      {libro.comentario ? (
        <>
          <Text style={styles.label}>Comentario:</Text>
          <Text style={styles.text}>{libro.comentario}</Text>
        </>
      ) : null}

      <View style={styles.buttonContainer}>
        <Button
          title="Editar"
          onPress={() => navigation.navigate('BookForm', { libroId })}
        />
        <View style={{ height: 10 }} />
        <Button title="Eliminar" color="red" onPress={eliminarLibro} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontWeight: 'bold', marginTop: 10 },
  text: { fontSize: 16, marginBottom: 6 },
  picker: { height: 50, marginBottom: 12 },
  buttonContainer: {
    marginTop: 20,
  },
});
