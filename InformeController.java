package com.pf.fisioterapia.controller;

import java.util.List;
import java.util.Locale;

import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pf.fisioterapia.model.Informe;
import com.pf.fisioterapia.response.ResponseHandler;
import com.pf.fisioterapia.service.InformeService;

@RestController
@RequestMapping("/informes")
public class InformeController {

    private final InformeService informeService;
    private final MessageSource messageSource;

    public InformeController(InformeService informeService, MessageSource messageSource) {
        this.informeService = informeService;
        this.messageSource = messageSource;
    }

    @GetMapping("/{id}")
    public Informe getInforme(@PathVariable Long id) {
        return informeService.getById(id);
    }

    @GetMapping
    public List<Informe> getAllInformes() {
        return informeService.getAll();
    }

    @PostMapping
    public ResponseEntity<Object> createInforme(@RequestBody Informe informe, Locale locale) {
    	Informe createdInforme = informeService.save(informe);
    	String successMessage = messageSource.getMessage("informe.creation.success", null, locale);
        return ResponseHandler.responseBuilder(successMessage, HttpStatus.CREATED, createdInforme);
    }
    
    @PutMapping("/{id}")
    public Informe updateInforme(@PathVariable Long id, @RequestBody Informe informe) {
        return informeService.save(informe);
    }

    @DeleteMapping("/{id}")
    public void deleteInforme(@PathVariable Long id) {
        informeService.deleteById(id);
    }
}
