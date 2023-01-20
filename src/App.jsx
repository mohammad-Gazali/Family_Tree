import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Footer, Navbar } from './components';
import { AddingForm, Graph } from './pages';


function App() {

  return (
    <Box position='relative' minHeight='100vh' paddingBottom="68px" className="my__background">
      <Box component='header'>
        <Navbar />
      </Box>
      <Box component="main">
        <Routes>
          <Route path="/" element={<Graph />} />
          <Route path="/add" element={<AddingForm />}  />
        </Routes>
      </Box>
      <Footer />
    </Box>
  )
}

export default App
