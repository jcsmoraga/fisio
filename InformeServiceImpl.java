package com.pf.fisioterapia.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.pf.fisioterapia.dto.InformeDTO;
import com.pf.fisioterapia.model.Informe;
import com.pf.fisioterapia.repository.InformeRepository;
import com.pf.fisioterapia.service.InformeService;

@Service
public class InformeServiceImpl implements InformeService {

    private final InformeRepository informeRepository;

    public InformeServiceImpl(InformeRepository informeRepository) {
        this.informeRepository = informeRepository;
    }

    @Override
    public Informe save(Informe informe) {
        return informeRepository.save(informe);
    }

    @Override
    public Informe getById(Long id) {
        return informeRepository.findById(id).orElse(null);
    }

    @Override
    public List<Informe> getAll() {
        return informeRepository.findAll();
    }

    @Override
    public void deleteById(Long id) {
        informeRepository.deleteById(id);
    }

	@Override
	public List<InformeDTO> getInformes(Long idPaciente) {
	    List<Informe> informes = informeRepository.findByPacienteId(idPaciente);
	    return informes.stream()
	        .map(informe -> {
	            return new InformeDTO(
	            		informe.getFisioterapeuta().getNombre(),
	            		informe.getDetallesInforme(),
	            		informe.getResumenInforme(),  
		                informe.getFechaInforme().toString()
	            );
	        })
	        .collect(Collectors.toList());
	}
}