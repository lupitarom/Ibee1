export const agregarPacienteAlHistorial = (paciente) => {
	const pacientesStorage = localStorage.getItem('pacientes')
	let pacientesHistorial = pacientesStorage ? JSON.parse(pacientesStorage) : []

	pacientesHistorial = pacientesHistorial.filter(
		(p) => p.id_paciente !== paciente.id_paciente
	)
	pacientesHistorial.unshift(paciente)

	if (pacientesHistorial.length > 10) {
		pacientesHistorial.pop()
	}
	localStorage.setItem('pacientes', JSON.stringify(pacientesHistorial))
}
