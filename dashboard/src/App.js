import Navigation from './Navigation';
import '@mantine/core/styles.css';

import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  /** Put your mantine theme override here */
});


function App() {
  return (
    <MantineProvider theme={theme}>
      <Navigation/>
    </MantineProvider>
  );
}

export default App;
