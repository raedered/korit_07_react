import {AppBar, Toolbar, Typography, Container, CssBaseline} from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Shoppinglist from './components/Shoppinglist';

const queryClient = new QueryClient();

function App() {

  return (
      <Container>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant='h6'>
              쇼핑 리스트 Shopping List
            </Typography>
          </Toolbar>
        </AppBar>
        <QueryClientProvider client={queryClient}>
          <Shoppinglist />
      </QueryClientProvider>
      </Container>
  )
}

export default App
