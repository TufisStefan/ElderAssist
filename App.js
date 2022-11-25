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

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [theme, setTheme] = React.useState(DefaultTheme);

  // useEffect(() => {
  //   setTheme({
  //     ...theme,
  //     colors: {
  //       ...theme.colors,
  //       primary: '#00ff00',
  //       accent: '#ff0000'
  //     }
  //   })
  // }, []);


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
