import { IonButton } from '@ionic/react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { config } from '../../env'
import { Camera, CameraResultType } from '@capacitor/camera'
import './editarPacienteModal.css'
import axios from 'axios'
import userImage from '../../assets/img/woman-gfec6923be_640.jpg'
import { agregarPacienteAlHistorial } from '../../utils/agregarPacienteAlHistorial'
import { link } from 'fs'

const estadosDeMexico = [
	'Aguascalientes',
	'Baja California',
	'Baja California Sur',
	'Campeche',
	'Chiapas',
	'Chihuahua',
	'Coahuila de Zaragoza',
	'Colima',
	'Ciudad de México',
	'Durango',
	'Guanajuato',
	'Guerrero',
	'Hidalgo',
	'Jalisco',
	'Estado de Mexico',
	'Michoacan de Ocampo',
	'Morelos',
	'Nayarit',
	'Nuevo Leon',
	'Oaxaca',
	'Puebla',
	'Queretaro de Arteaga',
	'Quintana Roo',
	'San Luis Potosi',
	'Sinaloa',
	'Sonora',
	'Tabasco',
	'Tamaulipas',
	'Tlaxcala',
	'Veracruz de Ignacio de la Llave',
	'Yucatan',
	'Zacatecas',
]

export const CrearPacienteModal = ({ setShowModal }) => {
	const [values, setValues] = useState({
		//foto: paciente.url,
		nombre: '',
		ap_materno: '',
		ap_paterno: '',
		edad: '',
		rfc: '',
		telefono: '',
		estado: '',
		ciudad: '',
		colonia: '',
		calle: '',
		numero: '',
		cp: '',
	})

	const [imagenPreview, setImagenPreview] = useState(userImage)

	const handleChanges = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		})
	}

	const crear = async () => {
		console.log(values)
		try {
			const { data } = await axios.post(
				`${config.baseUrl}/api/paciente`,
				values
			)
			agregarPacienteAlHistorial( data.paciente )
			setShowModal(false)
			toast.success('paciente creado  correctamente')
		} catch (error) {
			console.log(error)
			toast.error('error actualizando paciente')
		}
	}

	const takePicture = async () => {
		try {
			const image = await Camera.getPhoto({
				quality: 90,
				allowEditing: true,
				resultType: CameraResultType.Uri,
			})
			var imageUrl = image.webPath
			setImagenPreview(imageUrl)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			
			<button className="boton-x" onClick={() => setShowModal(false)}>x</button>
			<h1 className='CrearNuevoPaciente'>Crear nuevo paciente</h1>
			<div className="imagen-preview-container">
				<img
					className="imagen-preview"
					src={imagenPreview}
					alt="imagen del paciente"
				/>
				<button className="take-image-button" onClick={takePicture}>
					Tomar o elegir foto
				</button>
			</div>
			<form className="form-container">
                    <div className='a'>
					<input placeholder="Nombre" />
                    <input placeholder="Apellido Paterno" />
                    </div>
					<div className='a'>
                    <input placeholder="Apellido Materno" />
					<input placeholder="Telefono" />
                    </div>
					<div className='b'>
                    <input className='c' placeholder="RFC" />
					<input className='d' placeholder="Edad" />
                    </div>
					<div className='a'>
                    <input placeholder="Estado" />
					<input placeholder="cuidad" />
                    </div>
					<div className='a'>
                    <input placeholder="Colonia" />
					<input placeholder="Calle" />
                    </div>
					<div className='a'>
                    <input placeholder="Número" />
					<input placeholder="CP" />
                    </div>
				<IonButton onClick={crear}>Crear</IonButton>
			</form>
			
		</>
	)
}
