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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pf.fisioterapia.model.Fisioterapeuta;
import com.pf.fisioterapia.response.ResponseHandler;
import com.pf.fisioterapia.service.FisioterapeutaService;

@RestController
@RequestMapping("/fisioterapeutas")
public class FisioterapeutaController {
    
    private final FisioterapeutaService fisioterapeutaService;
    
    private final MessageSource messageSource;

    public FisioterapeutaController(FisioterapeutaService fisioterapeutaService, MessageSource messageSource) {
        this.fisioterapeutaService = fisioterapeutaService;
        this.messageSource = messageSource;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getFisioterapeuta(@PathVariable("id") Long id, Locale locale) {
        String successMessage = messageSource.getMessage("fisioterapeuta.get.success", null, locale);
        return ResponseHandler.responseBuilder(successMessage, HttpStatus.OK, fisioterapeutaService.getFisioterapeuta(id));
    }
    

    @GetMapping
    public List<Fisioterapeuta> getAllFisioterapeutas() {
        return fisioterapeutaService.getAllFisioterapeutas();
    }
    

    @PostMapping
    public ResponseEntity<Object> createFisioterapeuta(@RequestBody Fisioterapeuta fisioterapeuta, Locale locale) {
    	Fisioterapeuta createdFisioterapeuta = fisioterapeutaService.saveFisioterapeuta(fisioterapeuta);
    	String successMessage = messageSource.getMessage("fisioterapeuta.creation.success", null, locale);
    	return ResponseHandler.responseBuilder(successMessage, HttpStatus.CREATED, createdFisioterapeuta); 
    }
    
 
    @PutMapping("/{id}")
    public Fisioterapeuta updateFisioterapeuta(@PathVariable Long id, @RequestBody Fisioterapeuta fisioterapeuta) {
        return fisioterapeutaService.saveFisioterapeuta(fisioterapeuta);
    }

    @DeleteMapping("/{id}")
    public void deleteFisioterapeuta(@PathVariable Long id) {
        fisioterapeutaService.deleteFisioterapeuta(id);
    }
    
    @GetMapping("/search")
    public ResponseEntity<Object> searchFisioterapeutas(@RequestParam String query, Locale locale) {
        List<Fisioterapeuta> fisioterapeutas = fisioterapeutaService.searchFisioterapeutas(query);
        String successMessage = messageSource.getMessage("fisioterapeutas.search.success", null, locale);
        return ResponseHandler.responseBuilder(successMessage, HttpStatus.OK, fisioterapeutas);
    }
}
