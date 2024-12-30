$(document).ready(function() {
	const form = $('#usuarioForm');
	const messageDiv = $('#message');
	const userTable = $('#userTable tbody');
	let editingUserEmail = null;
	let users = [];

	function fetchUsers() {
		$.ajax({
			url: `http://localhost:8082/usuarios`,
			method: 'GET',
			headers: {
				'Authorization': 'Basic ' + btoa('admin:F1510Ter@p145!')
			},
			success: function(data) {
				console.log(data);
				if (Array.isArray(data)) {
					users = data;
					updateUserTable(users);
				} else {
					messageDiv.text('No se pudieron cargar los usuarios.').addClass('error');
				}
			},
			error: function() {
				messageDiv.text('Ocurrió un error al cargar los usuarios.').addClass('error');
			}
		});
	}


	function updateUserTable(users) {
		userTable.empty();
		users.forEach(user => {
			addUserToTable(user);
		});
	}

	function addUserToTable(user) {
		const userTypeText = {
			1: 'Paciente',
			2: 'Fisioterapeuta',
			3: 'Administrador'
		};

		const row = `<tr data-id="${user.email}">
            <td>${user.nombre}</td>
            <td>${user.email}</td>
			<td>${userTypeText[user.tipoUsuario] || 'Desconocido'}</td>
            <td>${user.enabled ? 'Sí' : 'No'}</td>
            <td>
                <a href="#" class="btn btn-edit" onclick="editUser('${user.email}')">
                    <i class="fas fa-edit"></i>
                </a>
                <a href="#" class="btn btn-delete" onclick="deleteUser('${user.email}')">
                    <i class="fas fa-trash-alt"></i>
                </a>
            </td>
        </tr>`;
		userTable.append(row);
	}

	function updateUserInTable(user) {
		const row = $(`tr[data-id="${user.email}"]`);
		row.find('td').eq(0).text(user.nombre);  
		row.find('td').eq(1).text(user.email);  
		row.find('td').eq(2).text(user.tipoUsuario == 1 ? 'Paciente' : user.tipoUsuario == 2 ? 'Fisioterapeuta' : 'Administrador');  // Update the type
		row.find('td').eq(3).text(user.enabled ? 'Sí' : 'No');  
	}

	window.editUser = function(email) {
		const user = users.find(u => u.email === email);

		if (user) {
			$('#nombre').val(user.nombre);
			$('#email').val(user.email);
			$('#tipoUsuario').val(user.tipoUsuario);
			$('#enabled').prop('checked', user.enabled);

			editingUserEmail = user.email;
			$('.btn-register').text('Actualizar Usuario');
		} else {
			console.error(`User with email ${email} not found.`);
			messageDiv.text('Usuario no encontrado.').addClass('error');
		}
	};

	window.deleteUser = function(email) {
		const user = users.find(u => u.email === email);
		const userName = user ? user.nombre : "Este usuario";

		const confirmDelete = confirm(`¿Estás seguro de que quieres eliminar el usuario con el correo electrónico: ${email}?`);


		if (confirmDelete) {
			$.ajax({
				url: `http://localhost:8082/usuarios/${email}`,
				method: 'DELETE',
				headers: {
					'Authorization': 'Basic ' + btoa('admin:F1510Ter@p145!')
				},
				success: function() {
					$(`tr[data-id="${email}"]`).remove();  
					messageDiv.text(`Usuario ${userName} eliminado exitosamente`).removeClass('error').addClass('success');
				},
				error: function() {
					messageDiv.text('Ocurrió un error al eliminar el usuario.').addClass('error');
				}
			});
		} else {
			console.log(`Eliminación de usuario ${email} cancelada.`);
		}
	};

	form.submit(function(e) {
		e.preventDefault();
		messageDiv.removeClass('hidden').text('');

		const nombre = $('#nombre').val().trim();
		const email = $('#email').val().trim();
		const password = $('#password').val().trim();
		const confirmPassword = $('#confirmPassword').val().trim();
		const tipoUsuario = $('#tipoUsuario').val().trim();
		const enabled = $('#enabled').prop('checked');

		if (!nombre || !email || !password || !confirmPassword || !tipoUsuario) {
			messageDiv.text('Por favor, completa todos los campos obligatorios.').addClass('error');
			return;
		}

		if (password !== confirmPassword) {
			messageDiv.text('Las contraseñas no coinciden.').addClass('error');
			return;
		}

		const usuarioData = {
			nombre: nombre,
			email: email,
			password: password,
			tipoUsuario: tipoUsuario,
			enabled: enabled,
		};

		const method = editingUserEmail ? 'PUT' : 'POST';
		const url = editingUserEmail ? `http://localhost:8082/usuarios/${editingUserEmail}` : 'http://localhost:8082/usuarios';

		$.ajax({
			url: url,
			method: method,
			contentType: 'application/json',
			headers: {
				'Authorization': 'Basic ' + btoa('admin:F1510Ter@p145!')
			},
			data: JSON.stringify(usuarioData),
			success: function(data) {
				if (data && data.data) {
					if (editingUserEmail) {
						messageDiv.text(`¡Usuario ${data.data.nombre} actualizado exitosamente!`).removeClass('error').addClass('success');
						updateUserInTable(data.data);
						users = users.map(user => user.email === data.data.email ? data.data : user);
					} else {
						messageDiv.text(`¡Usuario ${data.data.nombre} registrado exitosamente!`).removeClass('error').addClass('success');
						addUserToTable(data.data);
						users.push(data.data);
					}
					form[0].reset();
					editingUserEmail = null;
					$('.btn-register').text('Registrar Usuario');
				} else {
					messageDiv.text('Ocurrió un error al registrar o actualizar el usuario.').addClass('error');
				}
			},
			error: function() {
				messageDiv.text('Ocurrió un error al registrar o actualizar el usuario.').addClass('error');
			}
		});
	});
	fetchUsers();
});
