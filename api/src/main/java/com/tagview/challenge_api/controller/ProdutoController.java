package com.tagview.challenge_api.controller;


import com.tagview.challenge_api.DTOs.ProdutoCreateDTO;
import com.tagview.challenge_api.model.Produto;
import com.tagview.challenge_api.repository.ProdutoRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.*;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api/v1/produtos")
public class ProdutoController {

    private void simularDelay() {
        try {
            //3 segundos
            TimeUnit.SECONDS.sleep(3);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            //lidar com a exceção se a thread for interrompida.
        }
    }

    @Autowired
    private ProdutoRepository produtoRepository;

    //apenas uma rota de teste para saber se subiu a api
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        simularDelay();
        return ResponseEntity.ok("okok");
    }

    @GetMapping
    public ResponseEntity<List<Produto>> getAllProducts() {
        simularDelay();
        return ResponseEntity.ok(produtoRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<?> createProduct(@Valid @RequestBody ProdutoCreateDTO produtoDTO) {
        simularDelay();

        //para fazer as validacoes.
        List<String> erros = new ArrayList<>();

        if (produtoDTO.getNome() == null || produtoDTO.getNome().isBlank()) {
            erros.add("O nome do produto é obrigatório.");
        }

        if (produtoDTO.getPreco() == null || produtoDTO.getPreco().compareTo(new BigDecimal("10")) < 0) {
            erros.add("O preço deve ser maior que zero.");
        }

        if (produtoDTO.getDescricao() == null || produtoDTO.getDescricao().isBlank()) {
            erros.add("A descrição é obrigatória.");
        }

        if (produtoDTO.getImagem() != null && !produtoDTO.getImagem().isBlank()) {
            try {
                //decodifica a imagem pra verificar se o conteudo é "base64".
                byte[] decodedBytes = Base64.getDecoder().decode(produtoDTO.getImagem());

                //converte o tamanho do array de bytes (imagem decodificada) para megabytes.
                //1kb = 1024 bytes
                //1mb = 1024 KB = 1024 * 1024 bytes
                double tamanhoMb = decodedBytes.length / (1024.0 * 1024.0);

                if (tamanhoMb > 2) {
                    erros.add("A imagem excede o tamanho máximo permitido de 2MB.");
                }
            } catch (IllegalArgumentException e) {
                //cai aqui se o decode falhar,portanto o conteudo não é base64.
                //pode ser uma url de imagem ou uma string invalida
                //não é considerado uma erro fatal (aceita tanto Base64 quanto URL).
            }
        }

        //caso a lista não for nula, houve erro, e dispara uma execption com o erro 422 (unprocessable)
        if (!erros.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(Map.of("erros", erros));
        }

        Produto produto = new Produto();
        produto.setNome(produtoDTO.getNome());
        produto.setPreco(produtoDTO.getPreco());
        produto.setDescricao(produtoDTO.getDescricao());
        produto.setImagem(produtoDTO.getImagem());

        Produto savedProduct = produtoRepository.save(produto);
        return ResponseEntity.ok(savedProduct);
    }


}
