  import { BrowserRouter, Routes, Route } from 'react-router-dom';

  import ProductsCreate from './pages/ProductsCreate';
  import NotFound from './pages/NotFound';
  import ProductsList from './pages/ProductsList';
import Home from './pages/Home';

  function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos/exibir" element={<ProductsList />} />
          <Route path="/produtos/cadastro" element={<ProductsCreate />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    );
  }

  export default App;