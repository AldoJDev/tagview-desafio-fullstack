function Home() {
  return (
    // Container principal com fundo escuro e texto claro
    <div className="bg-main min-h-screen text-main flex items-center justify-center">
      <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
        
        {/* Título Principal */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-4">
          Desafio <span className="text-main/60">Tagview</span>
        </h1>
        <p className="text-xl text-main/50 mb-12">
          Sistema de Gerenciamento de Produtos
        </p>

        {/* Links de Navegação */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Card - Ver Produtos */}
          <a
            href="/produtos/exibir"
            className="group block p-8 border-4 border-main/40 rounded-lg hover:bg-main/5 transition-colors duration-300"
          >
            <h2 className="text-2xl font-bold text-main/90 mb-2">
              Ver Produtos
            </h2>
            <p className="text-main/50 mb-4">
              Visualize todos os produtos cadastrados no sistema.
            </p>
            <div className="inline-flex items-center text-sm text-blue-500 group-hover:translate-x-1 transition-transform">
              Acessar lista
            </div>
          </a>

          {/* Card - Cadastrar Produto */}
          <a
            href="/produtos/cadastro"
            className="group block p-8 border-4 border-main/40 rounded-lg hover:bg-main/5 transition-colors duration-300"
          >
            <h2 className="text-2xl font-bold text-main/90 mb-2">
              Cadastrar Produto
            </h2>
            <p className="text-main/50 mb-4">
              Adicione um novo item ao catálogo de produtos.
            </p>
            <div className="inline-flex items-center text-sm text-green-500 group-hover:translate-x-1 transition-transform">
              Adicionar agora
            </div>
          </a>
        </div>

        {/* Rodapé */}
        <div className="mt-16">
          <p className="text-sm text-main/40">
            Desenvolvido para o teste técnico Tagview 2025
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;

