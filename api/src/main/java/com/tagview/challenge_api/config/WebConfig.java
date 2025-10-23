package com.tagview.challenge_api.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//classe de configuracao onde registramos os interceptors do projeto
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private ApiKeyInterceptor apiKeyInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        //usa o interceptor e aplica em todos os endpoints que começam com /api/v1/ (todos as rotas do projeto)
        registry.addInterceptor(apiKeyInterceptor).addPathPatterns("/api/v1/**");
    }

    //devido ao erro de cors
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/v1/**") //todas as rotas do projeto
                .allowedOrigins("http://localhost:3000") //requisicoes do front.
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") //metodos HTTP permitidos
                .allowedHeaders("*"); //permite todos os cabeçalhos
    }

}