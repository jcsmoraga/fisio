document.getElementById('informeForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const messageDiv = document.getElementById('message');
    messageDiv.className = 'hidden';
    messageDiv.textContent = '';

	const pacienteId = document.getElementById('pacienteId').getAttribute('data-id');
	const fisioterapeutaId = document.getElementById('fisioterapeutaId').getAttribute('data-id');
    

	let fechaInforme = document.getElementById('fechaInforme').value.trim();

	if (fechaInforme) {
	    const currentTime = new Date().toISOString().split('T')[1].split('.')[0]; 
	    fechaInforme = fechaInforme + 'T' + currentTime;
	}
	
    const resumenInforme = document.getElementById('resumenInforme').value.trim();
    const detallesInforme = document.getElementById('detallesInforme').value.trim();

    if (!pacienteId || !fisioterapeutaId || !fechaInforme || !resumenInforme) {
        messageDiv.textContent = 'Por favor, completa todos los campos obligatorios.';
        messageDiv.className = 'error';
        return;
    }

    const informeData = {
        paciente: { id: pacienteId },
        fisioterapeuta: { id: fisioterapeutaId },
        fechaInforme: fechaInforme,
        resumenInforme: resumenInforme,
        detallesInforme: detallesInforme
    };

    fetch('http://localhost:8082/informes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa('admin:F1510Ter@p145!')
        },
        body: JSON.stringify(informeData)
    })
	.then(response => response.json())  
		.then(response => {
		    console.log('Response data:', response);  
		    if (response && response.data) {
		        messageDiv.textContent = `¡Informe registrado correctamente con ID ${response.data.id || 'Unknown'}!`;
		        messageDiv.className = 'success';

		        document.getElementById('informeForm').reset();
		    } else {
		        messageDiv.textContent = 'Ocurrió un error al registrar el informe.';
		        messageDiv.className = 'error';
		    }
		})
    .catch(error => {
        messageDiv.textContent = 'Ocurrió un error al registrar el informe: ' + error.message;
        messageDiv.className = 'error';
    });
});