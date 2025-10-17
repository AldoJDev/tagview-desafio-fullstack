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

    //retorna a lista de erros
    return validationErrors;
  }

  //funçao chamada quando o usuário seleciona uma imagem
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    let file;
    if (e.target.files) {
        file = e.target.files[0];
    }
    if (!file) return;

    //pesquisei como fazer essa verificação de tamanho de arquivo e descobri que o tamanho vem em bytes, então multipliquei 5 * 1024 * 1024 pra limitar o upload a 5MB
    if (file.size > 5 * 1024 * 1024) {
        alert('Image must be at most 5MB');
        return;
    }

    //le a imagem e gera uma URL temporaria pra exibir o preview
    const reader = new FileReader();
    reader.onload = () => setImagem(reader.result as string);
    reader.readAsDataURL(file);
    }

  //função chamada quando o formulario e enviado
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); //impede o recarregamento da página

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
        console.log(produto)
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
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Criar Produto</h1>
      <a href="/produtos/exibir">Voltar</a>

      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        {/* exibe os erros de validação, se existirem */}
        {errors.length > 0 && (
          <div style={{ backgroundColor: '#ffcccc', padding: '10px', marginBottom: '20px' }}>
            {errors.map((error, i) => <div key={i}>{error}</div>)}
          </div>
        )}

        {/*nome */}
        <div style={{ marginBottom: '15px' }}>
          <label>Nome:</label><br />
          <input 
            type="text" 
            value={nome} 
            onChange={e => setNome(e.target.value)} //atualiza o estado conforme o usuário digita
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        {/*preço */}
        <div style={{ marginBottom: '15px' }}>
          <label>Preço (R$):</label><br />
          <input 
            type="number" 
            value={preco} 
            onChange={e => setPreco(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        {/*descrição */}
        <div style={{ marginBottom: '15px' }}>
          <label>Descrição:</label><br />
          <textarea 
            value={descricao} 
            onChange={e => setDescricao(e.target.value)}
            rows={5}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        {/*imagem */}
       <div>
        <label>Imagem:</label>
        <br/>
        <input type="file" accept="image/*" onChange={handleImageChange} />
            {imagem && (
                <img 
                    src={imagem} 
                    alt="Prévia da imagem" 
                    style={{ marginTop: '10px', maxWidth: '200px', borderRadius: '8px' }} 
                />
            )}
        </div>

        <button 
          type="submit" 
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Cadastrar Produto
        </button>
      </form>
    </div>
  );
}


export default ProductsCreate;