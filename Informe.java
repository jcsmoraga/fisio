package com.pf.fisioterapia.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "informes")
public class Informe {
	
	
	public Informe() {
		
	}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_informe")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_paciente", nullable = false)
    private Paciente paciente;

    @ManyToOne
    @JoinColumn(name = "id_fisioterapeuta", nullable = false)
    private Fisioterapeuta fisioterapeuta;

    @Column(name = "fecha_informe", updatable = false)
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime fechaInforme;

    @Column(name = "resumen_informe") 
    private String resumenInforme;

    @Column(name = "detalles_informe") 
    private String detallesInforme;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Paciente getPaciente() {
		return paciente;
	}

	public void setPaciente(Paciente paciente) {
		this.paciente = paciente;
	}

	public Fisioterapeuta getFisioterapeuta() {
		return fisioterapeuta;
	}

	public void setFisioterapeuta(Fisioterapeuta fisioterapeuta) {
		this.fisioterapeuta = fisioterapeuta;
	}

	public LocalDateTime getFechaInforme() {
		return fechaInforme;
	}

	public void setFechaInforme(LocalDateTime fechaInforme) {
		this.fechaInforme = fechaInforme;
	}

	public String getResumenInforme() {
		return resumenInforme;
	}

	public void setResumenInforme(String resumenInforme) {
		this.resumenInforme = resumenInforme;
	}

	public String getDetallesInforme() {
		return detallesInforme;
	}

	public void setDetallesInforme(String detallesInforme) {
		this.detallesInforme = detallesInforme;
	}
}
