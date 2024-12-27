package com.pf.fisioterapia.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pf.fisioterapia.model.Informe;

@Repository
public interface InformeRepository extends JpaRepository<Informe, Long> {
	List<Informe> findByPacienteId(Long pacienteId);
}
