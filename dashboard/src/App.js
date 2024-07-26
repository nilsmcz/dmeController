import Navigation from './navigation/Navigation';
import '@mantine/core/styles.css';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/dates/styles.css';
const theme = createTheme({
  /** Put your mantine theme override here */
});


function App() {
  return (
    <MantineProvider theme={theme}>
      <Provider store={store}>
        <Navigation/>
      </Provider>
    </MantineProvider>
  );
}

export default App;
