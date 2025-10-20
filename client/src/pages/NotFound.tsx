function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="text-center">
        {/* Número 404 grande */}
        <h1 className="text-8xl font-bold text-gray-300 mb-4">404</h1>
        
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Página não encontrada
        </h2>
        
        <p className="text-gray-600 mb-8">
          A página que você está procurando não existe.
        </p>
        
        {/* Botão voltar */}
        <a 
          href="/produtos/exibir"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg transition transform hover:scale-105"
        >
          Ir para Produtos
        </a>
      </div>
    </div>
  );
}

export default NotFound;