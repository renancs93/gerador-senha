import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';

import Slider from '@react-native-community/slider';
import Clipboard from 'expo-clipboard';

let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export default function App() {
  const [password, setPassword] = useState('');
  const [size, setSize] = useState(10);

  function genaratePass() {
    let pass = '';
    for (let i = 0, n = charset.length; i < size; i++) {
      pass += charset.charAt(Math.floor(Math.random() * n));
    }

    setPassword(pass);
  }

  function copyPass() {
    Clipboard.setString(password);
    Alert.alert('Copiado','Senha copiada com sucesso!');
  }

  return (
    <View style={styles.container}>
      <Image source={require('./src/assets/logo.png')} style={styles.logo} />

      <Text style={styles.title}>{size} CARACTERES</Text>

      <View style={styles.area}>
        <Slider
          style={{ height: 50 }}
          minimumValue={5}
          maximumValue={15}
          minimumTrackTintColor='#FF0000'
          maximumTrackTintColor='#000'
          thumbTintColor='#FFA200'
          value={size}
          onValueChange={(value) => setSize(value)}
          step={1}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={genaratePass}>
        <Text style={styles.buttonText}>Gerar senha</Text>
      </TouchableOpacity>

      {password != '' && (
        <View style={[styles.area, styles.rowSpace]}>
          <Text style={styles.password} onLongPress={copyPass}>
            {password}
          </Text>
          <TouchableOpacity onPress={copyPass} style={styles.buttonCopy}>
            <Image
              style={{ height: 32, width: 32 }}
              source={require('./src/assets/copy.png')}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F3FF',
  },
  logo: {
    marginBottom: 60,
    width: 119,
    height: 159,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  area: {
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: '#FFF',
    width: '80%',
    borderRadius: 7,
  },
  button: {
    backgroundColor: '#FFA200',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    marginBottom: 25,
  },
  buttonText: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
  },
  password: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    fontSize: 20,
  },
  rowSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonCopy: {
    marginRight: 5,
  },
});
