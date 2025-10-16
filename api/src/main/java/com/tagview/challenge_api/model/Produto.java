package com.tagview.challenge_api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "produtos")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "nome", nullable = false, length = 50)
    private String nome;

    @Column(name = "preco", nullable = false)
    private BigDecimal preco;

    @Column(name = "descricao", nullable = false, length = 255)
    private String descricao;

    @Column(name = "imagem", columnDefinition = "TEXT")
    private String imagem;

    @CreationTimestamp // Marca o campo para ser preenchido com a data/hora de criação
    @Column(name = "data_criacao", nullable = false, updatable = false)
    private LocalDateTime dataCriacao;

    @UpdateTimestamp // Marca o campo para ser atualizado com a data/hora da última modificação
    @Column(name = "data_modificacao", nullable = false)
    private LocalDateTime dataModificacao;
}