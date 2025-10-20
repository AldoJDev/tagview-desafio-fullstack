function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full">
        {/* Card principal */}
        <div className="bg-white rounded-lg shadow-lg p-10">
          {/* Título */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Desafio <span className="text-blue-600">Tagview</span>
            </h1>
            <p className="text-gray-600">
              Sistema de Gerenciamento de Produtos
            </p>
          </div>

          {/* Cards de navegação */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Card - Ver Produtos */}
            <a
              href="/produtos/exibir"
              className="bg-blue-500 hover:bg-blue-600 rounded-lg p-6 text-white text-center transition"
            >
              <h2 className="text-xl font-bold mb-2">Ver Produtos</h2>
              <p className="text-blue-100 text-sm">
                Visualize todos os produtos cadastrados
              </p>
            </a>

            {/* Card - Cadastrar Produto */}
            <a
              href="/produtos/cadastro"
              className="bg-green-500 hover:bg-green-600 rounded-lg p-6 text-white text-center transition"
            >
              <h2 className="text-xl font-bold mb-2">Cadastrar Produto</h2>
              <p className="text-green-100 text-sm">
                Adicione novos produtos ao catálogo
              </p>
            </a>
          </div>

          {/* Rodapé */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Desenvolvido para o teste técnico Tagview 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;