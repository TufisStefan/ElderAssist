import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  Provider as PaperProvider,
  DefaultTheme,
  DarkTheme
} from 'react-native-paper';
import { AuthProvider } from './context/AuthContext';
import { LocationProvider } from './context/LocationContext';
import AppNav from './navigation/AppNav';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function App() {
  const [theme, setTheme] = React.useState(DefaultTheme);

  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

  return (
    <AuthProvider>
      <LocationProvider>
        <PaperProvider theme={theme}>
          <AppNav />
        </PaperProvider>
      </LocationProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
