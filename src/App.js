import React from 'react';
import Home from './components/Home';
import { View, StyleSheet } from 'react-native';
import style from './App.style.js';
export default function App() {
  return (
    <View style={style.container}>
      <Home />
    </View>
  )
}