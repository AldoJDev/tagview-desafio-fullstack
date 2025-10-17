package com.tagview.challenge_api.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

//interceptor responsavel por validar a chave da API antes de processar as requisicoes
@Component
public class ApiKeyInterceptor implements HandlerInterceptor {


    private static final String API_KEY_HEADER = "X-API-KEY";
    private static final String API_KEY_VALUE = "tagview-desafio-2024";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

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