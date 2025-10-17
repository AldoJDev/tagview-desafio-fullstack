package com.tagview.challenge_api.DTOs;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProdutoCreateDTO {

    private String nome;
    private BigDecimal preco;
    private String descricao;
    private String imagem;
}