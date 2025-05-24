import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import api from '../api/api';

export default function BookFormScreen({ navigation, route }) {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [estatus, setEstatus] = useState('por leer');
  const [fecha_inicio, setFechaInicio] = useState('');
  const [fecha_fin, setFechaFin] = useState('');
  const [comentario, setComentario] = useState('');
  const [editando, setEditando] = useState(false);
  const libroId = route.params?.libroId;

  useEffect(() => {
    if (libroId) {
      cargarLibro(libroId);
      setEditando(true);
    }
  }, []);

  const cargarLibro = async (id) => {
    try {
      const res = await api.get(`/libros/${id}`);
      const libro = res.data;
      setTitulo(libro.titulo);
      setAutor(libro.autor);
      setEstatus(libro.estatus);
      setFechaInicio(libro.fecha_inicio || '');
      setFechaFin(libro.fecha_fin || '');
      setComentario(libro.comentario || '');
    } catch (error) {
      Alert.alert('Error', 'No se pudo cargar el libro');
    }
  };

  const guardarLibro = async () => {
    if (!titulo || !autor || !estatus) {
      Alert.alert('Error', 'Título, autor y estatus son obligatorios');
      return;
    }

    const datos = {
      titulo,
      autor,
      estatus,
      fecha_inicio,
      fecha_fin,
      comentario,
    };

    try {
      if (editando) {
        await api.put(`/libros/${libroId}`, datos);
      } else {
        await api.post('/libros', datos);
      }
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo guardar el libro');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={styles.input}
        placeholder="Autor"
        value={autor}
        onChangeText={setAutor}
      />

      <Text style={styles.label}>Estatus:</Text>
      <Picker
        selectedValue={estatus}
        style={Platform.OS === 'ios' ? undefined : styles.picker}
        onValueChange={(itemValue) => setEstatus(itemValue)}
      >
        <Picker.Item label="Por leer" value="por leer" />
        <Picker.Item label="Leyendo" value="leyendo" />
        <Picker.Item label="Completado" value="completado" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Fecha inicio (opcional, yyyy-mm-dd)"
        value={fecha_inicio}
        onChangeText={setFechaInicio}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha fin (opcional, yyyy-mm-dd)"
        value={fecha_fin}
        onChangeText={setFechaFin}
      />
      <TextInput
        style={styles.input}
        placeholder="Comentario"
        value={comentario}
        onChangeText={setComentario}
      />

      <Button title={editando ? 'Guardar cambios' : 'Agregar libro'} onPress={guardarLibro} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 12,
    borderRadius: 5,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  picker: {
    height: 50,
    marginBottom: 12,
  },
});
