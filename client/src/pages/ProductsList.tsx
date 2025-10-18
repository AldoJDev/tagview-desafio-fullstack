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

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        // Faz a requisição para a API de produtos
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

      } catch (err) {
        // Define uma mensagem de erro em caso de falha
        setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []); // O array vazio [] garante que o useEffect execute apenas uma vez

  // --- RENDERIZAÇÃO ---

  // Exibe mensagem de carregamento enquanto os dados são buscados
  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Carregando produtos...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>Erro: {error}</div>;
  }
  
  // Renderiza a lista de produtos
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Lista de Produtos</h1>
      <a href="/produtos/cadastro" style={{ marginBottom: '20px', display: 'inline-block' }}>
        Cadastrar Novo Produto
      </a>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.length > 0 ? (
          products.map(product => (
            <div 
              key={product.id} 
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                width: '220px',
                textAlign: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
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
    </div>
  );
}

export default ProductsList;