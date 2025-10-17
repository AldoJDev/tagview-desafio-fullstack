package com.tagview.challenge_api.DTOs;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProdutoCreateDTO {

    @NotBlank(message = "O nome é obrigatório.")
    @Size(min = 3, max = 50, message = "O nome deve ter entre 3 e 50 caracteres.")
    private String nome;

    @NotNull(message = "O preço é obrigatório.")
    @DecimalMin(value = "1.0", message = "O preço deve ser de no mínimo 10.")
    private BigDecimal preco;

    @NotBlank(message = "A descrição é obrigatória.")
    @Size(min = 30, max = 255, message = "A descrição deve ter entre 30 e 255 caracteres.")
    private String descricao;

    //a validacao da imagem sera feita no front.
    private String imagem;

}