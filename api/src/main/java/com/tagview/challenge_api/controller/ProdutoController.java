package com.tagview.challenge_api.controller;


import com.tagview.challenge_api.model.Produto;
import com.tagview.challenge_api.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.concurrent.TimeUnit;

import java.util.List;

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
    public ResponseEntity<Produto> createProduct(@RequestBody Produto produto) {
        simularDelay();
        Produto savedProduct = produtoRepository.save(produto);
        return ResponseEntity.ok(savedProduct);
    }


}
