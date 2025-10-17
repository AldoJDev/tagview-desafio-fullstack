// ApiKeyInterceptor.java

package com.tagview.challenge_api.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.HandlerMapping; // Adicione se necessário

//interceptor responsavel por validar a chave da API antes de processar as requisicoes
@Component
public class ApiKeyInterceptor implements HandlerInterceptor {


    private static final String API_KEY_HEADER = "X-API-KEY";
    //penso que seria 2025, mas optei por deixar exatamente como a descrição do projeto.
    private static final String API_KEY_VALUE = "tagview-desafio-2024";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        //devido ao um erro de cors, no frontend tive que adicionar essa linha ela deixa passar sem verificar a api key. Devo mudar isso.
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            return true;
        }

        //pega o valor da chave passada pelo cabeçalho da requisicao
        String apiKey = request.getHeader(API_KEY_HEADER);

        if (API_KEY_VALUE.equals(apiKey)) {
            return true;
        }
        else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }
    }
}