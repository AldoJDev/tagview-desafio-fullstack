import { useState, useEffect } from 'react';

interface Produto {
  id: string;
  nome: string;
  preco: number;
  descricao: string;
  imagem: string | null;
}

function ProductsList() {
  const [products, setProducts] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Produto | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/api/v1/produtos', {
          headers: {
            'X-API-KEY': 'tagview-desafio-2024',
          },
        });

        if (!response.ok) {
          throw new Error('Falha ao buscar os produtos da API.');
        }

        const data: Produto[] = await response.json();
        setProducts(data);

        const params = new URLSearchParams(window.location.search);
        const productIdFromUrl = params.get('idProduto');
        if (productIdFromUrl) {
          const productToOpen = data.find(p => p.id === productIdFromUrl);
          if (productToOpen) {
            setSelectedProduct(productToOpen);
          }
        }

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = itemsPerPage === Infinity ? products : products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = itemsPerPage === Infinity ? 1 : Math.ceil(products.length / itemsPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Carregando produtos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">Erro: {error}</div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Cabeçalho */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Lista de Produtos</h1>
        <a 
          href="/produtos/cadastro"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
        >
          Cadastrar Novo Produto
        </a>
      </div>

      {/* Controles de paginação */}
      <div className="mb-6 flex items-center gap-3">
        <span className="text-gray-700">Itens por página:</span>
        <select 
          value={itemsPerPage === Infinity ? 'all' : itemsPerPage}
          onChange={e => {
            setItemsPerPage(e.target.value === 'all' ? Infinity : Number(e.target.value));
            setCurrentPage(1);
          }}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value="all">Todos</option>
        </select>
      </div>
      
      {/* Grid de Produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.length > 0 ? (
          currentProducts.map(product => (
            <div 
              key={product.id} 
              onClick={() => setSelectedProduct(product)}
              className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-lg transition transform hover:scale-105"
            >
              {product.imagem ? (
                <img 
                  src={product.imagem} 
                  alt={product.nome} 
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
              ) : (
                <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400 rounded-md mb-3">
                  Sem Imagem
                </div>
              )}
              <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{product.nome}</h3>
              <p className="text-xl font-bold text-green-600">
                {product.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-10">Nenhum produto cadastrado.</p>
        )}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
            <button 
              key={pageNumber} 
              onClick={() => setCurrentPage(pageNumber)}
              className={`px-4 py-2 rounded-lg border transition ${
                currentPage === pageNumber 
                  ? 'bg-green-500 text-white border-green-500' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div 
            className="bg-white rounded-lg p-8 w-full max-w-2xl relative"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
            >
              ×
            </button>
            
            {selectedProduct.imagem ? (
              <img 
                src={selectedProduct.imagem} 
                alt={selectedProduct.nome} 
                className="w-full max-h-96 object-contain rounded-lg mb-4"
              />
            ) : (
              <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400 rounded-lg mb-4">
                Sem Imagem
              </div>
            )}
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedProduct.nome}</h2>
            <p className="text-3xl font-bold text-green-600 mb-4">
              {selectedProduct.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
            <p className="text-gray-700 border-t border-gray-200 pt-4">
              {selectedProduct.descricao}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsList;