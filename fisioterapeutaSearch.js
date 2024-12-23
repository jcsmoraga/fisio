function searchFisioterapeuta() {
    const inputId = 'fisioterapeutaId';
    const resultsListId = 'fisioterapeutaResultsList';
    const url = 'http://localhost:8082/fisioterapeutas/search';

    const query = document.getElementById(inputId).value.trim();
    const resultsList = document.getElementById(resultsListId);

    // Hide the results list if input is empty or less than 3 characters
    if (query.length < 3) {
        resultsList.innerHTML = '';
        resultsList.style.display = 'none'; // Hide the dropdown
        return;
    }

    fetch(`${url}?query=${query}`)
        .then(response => response.json())
        .then(responseData => {
            resultsList.innerHTML = '';  // Clear the current list

            const fisioterapeutas = responseData.data;

            if (Array.isArray(fisioterapeutas) && fisioterapeutas.length > 0) {
                fisioterapeutas.forEach(fisioterapeuta => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${fisioterapeuta.nombre} ${fisioterapeuta.apellido}`;
                    listItem.setAttribute('data-id', fisioterapeuta.id);
                    listItem.onclick = () => selectFisioterapeuta(fisioterapeuta.id, fisioterapeuta.nombre, fisioterapeuta.apellido, inputId, resultsListId);
                    resultsList.appendChild(listItem);
                });
                resultsList.style.display = 'block'; // Show the dropdown
            } else {
                resultsList.innerHTML = '<li>No se encontraron resultados</li>';
                resultsList.style.display = 'block'; // Show the dropdown with message
            }
        })
        .catch(error => {
            console.error('Error fetching fisioterapeutas:', error);
            resultsList.innerHTML = '<li>Error al buscar fisioterapeutas</li>';
            resultsList.style.display = 'block'; // Show the dropdown with error message
        });
}

function selectFisioterapeuta(id, nombre, apellido, inputId, resultsListId) {
    document.getElementById(inputId).setAttribute('data-id', id);
    document.getElementById(inputId).value = `${nombre} ${apellido}`; 
    document.getElementById(resultsListId).innerHTML = '';
    document.getElementById(resultsListId).style.display = 'none'; // Hide the dropdown after selection
}
