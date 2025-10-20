import { useState, useEffect } from 'react';

// Definindo uma interface para o tipo Produto para usar com TypeScript
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


  // --- RENDER ---
  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Carregando produtos...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>Erro: {error}</div>;
  }
  
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Lista de Produtos</h1>
      <a href="/produtos/cadastro">Cadastrar Novo Produto</a>

      {/* Controles de paginação */}
      <div style={{ margin: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span>Itens por página: </span>
          <select value={itemsPerPage === Infinity ? 'all' : itemsPerPage} onChange={e => {
            setItemsPerPage(e.target.value === 'all' ? Infinity : Number(e.target.value));
            setCurrentPage(1);
          }}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value="all">Todos</option>
          </select>
        </div>
      </div>
      
      {/* Grid de Produtos */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {currentProducts.length > 0 ? (
          currentProducts.map(product => (
            <div 
              key={product.id} 
              onClick={() => setSelectedProduct(product)}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                width: '220px',
                textAlign: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s',
              }}
            >
              {product.imagem ? (
                <img 
                    src={product.imagem} 
                    alt={product.nome} 
                    style={{
                        width: '100%',
                        height: '150px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                    }} 
                />
              ) : (
                <div style={{
                    width: '100%',
                    height: '150px',
                    backgroundColor: '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#aaa',
                    borderRadius: '4px',
                }}>
                    Sem Imagem
                </div>
              )}
              <h3 style={{ margin: '10px 0' }}>{product.nome}</h3>
              <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
                {product.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>
          ))
        ) : (
          <p>Nenhum produto cadastrado.</p>
        )}
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
          <button 
            key={pageNumber} 
            onClick={() => setCurrentPage(pageNumber)}
            style={{
              margin: '0 5px',
              padding: '8px 12px',
              border: '1px solid #ddd',
              cursor: 'pointer',
              backgroundColor: currentPage === pageNumber ? '#4CAF50' : '#f0f0f0',
              color: currentPage === pageNumber ? 'white' : 'black',
            }}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div 
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
            }}
            onClick={() => setSelectedProduct(null)}
        >
          <div 
            style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '8px',
                width: '90%',
                maxWidth: '500px',
                position: 'relative',
            }}
            onClick={e => e.stopPropagation()}
          >
            <button 
                onClick={() => setSelectedProduct(null)}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'transparent',
                    border: 'none',
                    fontSize: '20px',
                    cursor: 'pointer',
                }}
            >
                X
            </button>
            {selectedProduct.imagem ? (
                <img src={selectedProduct.imagem} alt={selectedProduct.nome} style={{ maxWidth: '100%', borderRadius: '8px' }} />
              ) : (
                <div style={{
                    width: '100%',
                    height: '200px',
                    backgroundColor: '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#aaa',
                    borderRadius: '4px',
                }}>
                    Sem Imagem
                </div>
              )}
            <h2>{selectedProduct.nome}</h2>
            <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#4CAF50' }}>
              {selectedProduct.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
            <p style={{ marginTop: '15px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
              {selectedProduct.descricao}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsList;