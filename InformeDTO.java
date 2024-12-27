package com.pf.fisioterapia.dto;

public class InformeDTO {

    private String fisioterapeutaNombre;
    private String detallesInforme;
    private String resumenInforme;
    private String fechaInforme;

   
    public InformeDTO(String fisioterapeutaNombre, 
    				  String detallesInforme, 
    				  String resumenInforme, 
    				  String fechaInforme) {
        this.fisioterapeutaNombre = fisioterapeutaNombre;
        this.detallesInforme = detallesInforme;
        this.resumenInforme = resumenInforme;
        this.fechaInforme = fechaInforme;
    }


    public String getFisioterapeutaNombre() {
        return fisioterapeutaNombre;
    }

    public void setFisioterapeutaNombre(String fisioterapeutaNombre) {
        this.fisioterapeutaNombre = fisioterapeutaNombre;
    }


	public String getDetallesInforme() {
		return detallesInforme;
	}


	public void setDetallesInforme(String detallesInforme) {
		this.detallesInforme = detallesInforme;
	}


	public String getResumenInforme() {
		return resumenInforme;
	}


	public void setResumenInforme(String resumenInforme) {
		this.resumenInforme = resumenInforme;
	}


	public String getFechaInforme() {
		return fechaInforme;
	}


	public void setFechaInforme(String fechaInforme) {
		this.fechaInforme = fechaInforme;
	}
}
