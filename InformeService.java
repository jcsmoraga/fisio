package com.pf.fisioterapia.service;

import java.util.List;

import com.pf.fisioterapia.dto.InformeDTO;
import com.pf.fisioterapia.model.Informe;

public interface InformeService {
    Informe save(Informe informe);
    Informe getById(Long id);
    List<Informe> getAll();
    void deleteById(Long id);
    List<InformeDTO> getInformes(Long idPaciente);
}