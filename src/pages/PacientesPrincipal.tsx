import React, { useEffect, useState } from 'react'
import { Layout } from '../components/layout/Layout'
import busca from './../assets/img/Lupa.svg'
import { ListaPacientes } from '../components/pacientes/ListaPacientes'
import { config } from '../env'
import plus from './../assets/img/plus-circle.svg'
import { useHistory } from 'react-router'
import './PacientesPrincipal.css'
import { IonButton, IonModal } from '@ionic/react'
import { CrearPacienteModal } from '../components/modals/CrearPacienteModal'
import { agregarPacienteAlHistorial } from '../utils/agregarPacienteAlHistorial'

export const PacientesPrincipal = () => {
	// gets pacientes from localstorage
	const pacientesStorage = localStorage.getItem('pacientes')
	const pacientesHistorial = pacientesStorage
		? JSON.parse(pacientesStorage)
		: []
	const [pacientes, setPacientes] = useState(pacientesHistorial)
	const [termino, setTermino] = useState('')
	const [mostrarBoton, setmostrarBoton] = useState(false)
	const [showModal, setShowModal] = useState(false)
	const history = useHistory()

	useEffect(() => {
		buscarPacientes()
	}, [])

	const buscarPacientes = () => {
		fetch(`${config.baseUrl}/api/pacientes/${termino}`, {
			method: 'GET',
			redirect: 'follow',
		})
			.then((response) => response.json())
			.then(({ results }) => {
				console.log(results)
				setPacientes(results)
			})
			.catch((error) => console.log('error', error))
	}

	const buscar = (e: any) => {
		e.preventDefault()
		buscarPacientes()
	}

	const mostrar = (e: any) => {
		e.preventDefault()
		setmostrarBoton(!mostrarBoton)
	}

	const handlePacienteClick = (paciente: any): void => {
		agregarPacienteAlHistorial( paciente )
		history.push(`/paciente/${paciente.id_paciente}`)
	}

	return (
		<Layout>
			<div className="contenedorPacientesPrincipal">
				<IonModal
					isOpen={showModal}
					cssClass="my-custom-class"
					swipeToClose={true}
					animated
					onDidDismiss={() => {
						setShowModal(false)
					}}
				>
					<CrearPacienteModal 
            setShowModal={setShowModal}
          />
				</IonModal>

				<div className="contenido">
					<form className="busqueda">
						<div className="textoBusqueda">
							<div id="text">
								<h1>Pacientes</h1>
								<p>Información, tratamientos, servicion</p>
							</div>
							<input
								id="campoBuscar"
								autoComplete="off"
								type="text"
								placeholder="Buscar"
								name="buscar"
								value={termino}
								onChange={(e) => {
									setTermino(e.target.value)
									buscar(e)
								}}
							/>
						</div>
						<div className="contenedorBtn">
							<button id="btnBuscar" onClick={mostrar}>
								<img src={busca} alt="" />
							</button>
						</div>
						<div className="contenedorBtn">
							<IonButton
                onClick={ ()=>setShowModal(true) }
              >+</IonButton>
						</div>
					</form>

					<div className="listPacientesP">
						<ListaPacientes
							pacientes={pacientes}
							handlePacienteClick={handlePacienteClick}
						/>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default PacientesPrincipal
