// Opciones del menú según el rol, ahora con iconos
const menuOptions = {
  paciente: [
    { name: "Consultar Tratamiento", link: "consultaTratamiento.html", icon: "fas fa-search" },
    { name: "Historial Médico", link: "historialMedico.html", icon: "fas fa-file-medical" },
  ],
  fisioterapeuta: [
    { name: "Registrar Paciente", link: "registrarPaciente.html", icon: "fas fa-user-plus" },
	{ name: "Evaluación", link: "registrarEvaluacion.html", icon: "fas fa-stethoscope" },
    { name: "Planificación de Tratamiento", link: "registrarTratamiento.html", icon: "fas fa-calendar-check" },
    { name: "Seguimiento de Tratamiento", link: "seguimiento.html", icon: "fas fa-notes-medical" },
  ],
  administrador: [
    { name: "Gestionar Usuarios", link: "usuarios.html", icon: "fas fa-users-cog" },
	{ name: "Registrar Fisioterapeuta", link: "registrarFisioterapeuta.html", icon: "fas fa-user-injured" },
    { name: "Reportes y Estadísticas", link: "resultadoseInformes.html", icon: "fas fa-chart-line" },
    { name: "Configuración del Sistema", link: "configuracionSistema.html", icon: "fas fa-cogs" },
	{ name: "Generar Informe", link: "generarInforme.html", icon: "fas fa-cogs" },
	{ name: "Consultar Informe", link: "consultaInforme.html", icon: "fas fa-search" },
  ],
  common: [
    { name: "Cerrar sesión", link: "javascript:void(0)", action: logout, icon: "fas fa-sign-out-alt" },
  ]
};

// Función para generar el menú dinámicamente
function generateMenu(role) {
  const menuList = document.getElementById("menu-list");
  menuList.innerHTML = ""; // Limpiar cualquier menú existente

  let options = [];
  if (role === "1") {
    options = menuOptions.paciente;
  } else if (role === "2") {
    options = [...menuOptions.fisioterapeuta, ...menuOptions.paciente];
  } else if (role === "3") {
    options = [
      ...menuOptions.administrador,
      ...menuOptions.fisioterapeuta,
      ...menuOptions.paciente,
    ];
  }

  options = [...options, ...menuOptions.common];

  options.forEach((option) => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    if (option.action) {
      a.href = option.link;
      a.onclick = function(event) {
        event.preventDefault();
        option.action();
      };
    } else {
      a.href = option.link;
    }

    const icon = document.createElement("span");
    icon.classList.add(...option.icon.split(" "));
    a.appendChild(icon);

    const text = document.createTextNode(` ${option.name}`);
    a.appendChild(text);
    li.appendChild(a);
    menuList.appendChild(li);
  });
}

function logout() {
  localStorage.removeItem("userRole");
  window.location.href = "login.html";
}

const userRole = localStorage.getItem("userRole");
if (userRole) {
  generateMenu(userRole);
} else {
  alert("No se ha iniciado sesión. Redirigiendo a login.");
  window.location.href = "login.html";
}
