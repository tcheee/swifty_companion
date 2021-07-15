import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Navigator from './routes/homeStack';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#00AFB1",
    accent: "#00AFB1",
  },
};

export default function App() {
    return (
      <PaperProvider theme={theme}>
        <Navigator />
      </PaperProvider>
    );
}