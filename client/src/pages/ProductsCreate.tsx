import { useState } from 'react'; 

function ProductsCreate() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  function validate(): string[] {
    const validationErrors: string[] = [];

    if (nome.length < 3 || nome.length > 50) {
      validationErrors.push('Nome precisa ter entre 3 a 50 caracteres');
    }

    const priceNum = Number(preco);
    if (!preco || priceNum < 10) {
      validationErrors.push('Preço precisa ser maior que 10');
    }

    if (descricao.length < 30 || descricao.length > 255) {
      validationErrors.push('Descrição precisa ter entre 30 a 255 caracteres');
    }

    return validationErrors;
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    let file;
    if (e.target.files) {
      file = e.target.files[0];
    }
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Imagem deve ter no máximo 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImagem(reader.result as string);
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validationErrors = validate(); 
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    const produto = { nome, preco: Number(preco), descricao, imagem };

    try {
      const response = await fetch('http://localhost:8080/api/v1/produtos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': 'tagview-desafio-2024',
        },
        body: JSON.stringify(produto),
      });

      if (response.status === 422) {
        const data = await response.json();
        console.log(produto);
        setErrors(data.erros || ['Erro de validação']);
        return;
      }

      if (!response.ok) {
        setErrors(['Erro ao cadastrar produto.']);
        return;
      }

      alert('Novo Produto Cadastrado!');
     
    } catch (error) {
      console.error(error);
      setErrors(['Erro de conexão com o servidor']);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Cabeçalho */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Criar Produto</h1>
        <a 
          href="/"
          className="text-blue-500 hover:underline"
        >
          ← Ir para Home
        </a>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        {/* Erros de validação */}
        {errors.length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded mb-6">
            {errors.map((error, i) => (
              <div key={i}>• {error}</div>
            ))}
          </div>
        )}

        {/* Nome */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Nome:
          </label>
          <input 
            type="text" 
            value={nome} 
            onChange={e => setNome(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="Digite o nome do produto"
          />
        </div>

        {/* Preço */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Preço (R$):
          </label>
          <input 
            type="number" 
            value={preco} 
            onChange={e => setPreco(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="0.00"
            step="0.01"
          />
        </div>

        {/* Descrição */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Descrição:
          </label>
          <textarea 
            value={descricao} 
            onChange={e => setDescricao(e.target.value)}
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="Descreva o produto..."
          />
        </div>

        {/* Imagem */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Imagem (opcional):
          </label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-600 border border-gray-300 rounded p-2"
          />
          {imagem && (
            <img 
              src={imagem} 
              alt="Prévia da imagem" 
              className="mt-4 max-w-xs rounded border"
            />
          )}
        </div>

        {/* Botão Submit */}
        <button 
          type="submit" 
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded transition"
        >
          Cadastrar Produto
        </button>
      </form>
    </div>
  );
}

export default ProductsCreate;