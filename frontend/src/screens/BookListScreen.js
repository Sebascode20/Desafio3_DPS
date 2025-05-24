import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';

export default function BookListScreen({ navigation }) {
  const { logout } = useContext(AuthContext);
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLibros = async () => {
    try {
      const res = await api.get('/libros');
      setLibros(res.data);
    } catch (error) {
      console.error('Error al obtener libros:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchLibros);
    return unsubscribe;
  }, [navigation]);

  const handleLogout = () => logout();

  const renderLibro = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('BookDetail', { libroId: item.id })}
    >
      <Text style={styles.titulo}>{item.titulo}</Text>
      <Text style={styles.autor}>{item.autor}</Text>
      <Text style={styles.estatus}>Estatus: {item.estatus}</Text>
    </TouchableOpacity>
  );

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <View style={styles.container}>
      <Button title="Agregar libro" onPress={() => navigation.navigate('BookForm')} />
      <FlatList
        data={libros}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderLibro}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No hay libros aún.</Text>}
      />
      <Button title="Cerrar sesión" color="red" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    marginVertical: 8
  },
  titulo: { fontSize: 18, fontWeight: 'bold' },
  autor: { fontSize: 16 },
  estatus: { fontSize: 14, color: '#666' }
});
