function fetchInformes() {
	const pacienteId = document.getElementById('pacienteId').getAttribute('data-id').trim();  
    const informesTable = document.getElementById('informesTable');
    const informesTableBody = document.getElementById('informesTableBody');
    const errorMessageDiv = document.getElementById('errorMessage');
    
    informesTable.classList.add('hidden');
    errorMessageDiv.classList.add('hidden');
    
    if (!pacienteId) {
        errorMessageDiv.textContent = 'Por favor, selecciona un paciente.';
        errorMessageDiv.classList.remove('hidden');
        return;
    }

    fetch(`http://localhost:8082/informes/search?pacienteId=${pacienteId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa('admin:F1510Ter@p145!') 
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('No autorizado o error en el servidor');
        }
        return response.json();
    })
    .then(data => {
        if (data && data.length > 0) {
            informesTableBody.innerHTML = ''; 

            data.forEach(informe => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${informe.fisioterapeutaNombre}</td>
                    <td>${informe.detallesInforme}</td>
					<td>${informe.resumenInforme}</td>
                    <td>${new Date(informe.fechaInforme).toLocaleDateString()}</td>
                `;
                informesTableBody.appendChild(row);
            });

            informesTable.classList.remove('hidden');
            document.getElementById('exportCsvButton').classList.remove('hidden');
            document.getElementById('exportPdfButton').classList.remove('hidden');
        } else {
            errorMessageDiv.textContent = 'No se encontraron informes para este paciente.';
            errorMessageDiv.classList.remove('hidden');
        }
    })
    .catch(error => {
        errorMessageDiv.textContent = 'Ocurrió un error al consultar los informes: ' + error.message;
        errorMessageDiv.classList.remove('hidden');
    });
}
function exportToCsv() {
    const informesTableBody = document.getElementById('informesTableBody');
    let csvContent = "Fisioterapeuta, Detalles Informe, Resumen Informe, Fecha Informe\n";

  
    Array.from(informesTableBody.rows).forEach(row => {
        const rowData = Array.from(row.cells).map(cell => cell.textContent);
        csvContent += rowData.join(",") + "\n";
    });

  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'informes.csv';
    link.click();
}

function exportToPdf() {
    const { jsPDF } = window.jspdf; 

    const informesTable = document.getElementById('informesTable');
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Lista de Informes', 14, 20);

    const headers = ["Fisioterapeuta", "Detalles Informe", "Resumen Informe", "Fecha Informe"];

    const tableData = [];
    Array.from(informesTable.rows).slice(1).forEach(row => {
        const rowData = Array.from(row.cells).map(cell => cell.textContent);
        tableData.push(rowData);
    });

   
    doc.autoTable({
        head: [headers],
        body: tableData,
        startY: 30, 
        theme: 'grid', 
    });

    
    doc.save('informes.pdf');
}


