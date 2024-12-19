document.getElementById('evaluacionForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const messageDiv = document.getElementById('message');
    messageDiv.className = 'hidden';
    messageDiv.textContent = '';

   
	const pacienteId = document.getElementById('pacienteId').getAttribute('data-id');
    const fisioterapeutaId = document.getElementById('fisioterapeutaId').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();
    const objetivos = document.getElementById('objetivos').value.trim();

   
    const fechaEvaluacion = new Date().toISOString().slice(0, 19);

  
    if (!pacienteId || !fisioterapeutaId || !descripcion || !objetivos) {
        messageDiv.textContent = 'Por favor, completa todos los campos obligatorios.';
        messageDiv.className = 'error';
        return;
    }

 
    const evaluacionData = {
        paciente: { id: pacienteId },
        fisioterapeuta: { id: fisioterapeutaId },
        fechaEvaluacion: fechaEvaluacion,  
        descripcion: descripcion,
        objetivos: objetivos
    };

    
    console.log('Sending data:', evaluacionData);

    
    fetch('http://localhost:8082/evaluaciones', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa('admin:F1510Ter@p145!') 
        },
        body: JSON.stringify(evaluacionData)
    })
    .then(response => response.json())  
	.then(response => {
	    console.log('Response data:', response);  
	    if (response && response.data) {
	        messageDiv.textContent = `¡Evaluación registrada exitosamente con ID ${response.data.id || 'Unknown'}!`;
	        messageDiv.className = 'success';

	        document.getElementById('evaluacionForm').reset();
	    } else {
	        messageDiv.textContent = 'Ocurrió un error al registrar la evaluación.';
	        messageDiv.className = 'error';
	    }
	})
    .catch(error => {
        messageDiv.textContent = 'Ocurrió un error al registrar la evaluación: ' + error.message;
        messageDiv.className = 'error';
    });
});
