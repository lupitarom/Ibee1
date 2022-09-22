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
				<div className='datos'><label>DATOS PERSONALES</label></div>
                    <div className='b'>
					<input 
					type="text"
					name='nombre'
					value={values.nombre}
					onChange={handleChanges}
					placeholder="Nombre" />
					</div>
					<div className='b'>
                    <input 
					type="text"
					name='ap_paterno'
					value={values.ap_paterno}
					onChange={handleChanges}
					placeholder="Apellido Paterno" />
                    </div>
					<div className='b'>
                    <input 
					type="text"
					name='ap_materno'
					value={values.ap_materno}
					onChange={handleChanges}
					placeholder="Apellido Materno" />
					</div>
					<div className='a'>
					<input 
					type="text"
					name='telefono'
					value={values.telefono}
					onChange={handleChanges}
					placeholder="Telefono fijo" />
                    <input 
					type="text"
					name='whatsApp'
					value={values.whatsApp}
					onChange={handleChanges}
					placeholder="WhatsApp" />
					<input 
					type="text"
					name='edad'
					value={values.edad}
					onChange={handleChanges}
					placeholder="Edad" />
                    </div>
					<div className='a'>
                    <select
							name="estado1"
							value={values.estado1}
							onChange={handleChanges}
						>
							{estadosDeMexico.map((estado) => (
								<option value={estado}>{estado}</option>
							))}
						</select>
					<input 
					type="text"
					name='ciudad1'
					value={values.ciudad1}
					onChange={handleChanges}
					placeholder="ciudad" />
                    </div>
					<div className='a'>
                    <input 
					type="text"
					name='colonia1'
					value={values.colonia1}
					onChange={handleChanges}
					placeholder="Colonia" />
					<input 
					type="text"
					name='calle1'
					value={values.calle1}
					onChange={handleChanges}
					placeholder="Calle" />
                    </div>
					<div className='a'>
                    <input 
					type="text"
					name='numero1'
					value={values.numero1}
					onChange={handleChanges}
					placeholder="Número" />
					<input 
					type="text"
					name='cp1'
					value={values.cp1}
					onChange={handleChanges}
					placeholder="CP" />
                    </div>
					<div>
					<div className='datos'><label>DATOS FISCALES</label></div>
					<div className='b'>
					<input 
					type="text"
					name='regimen'
					value={values.regimen}
					onChange={handleChanges}
					placeholder="Regimen fiscal" />
					</div>
					<div className='b'>
					<input 
					type="text"
					name='NIF'
					value={values.nif}
					onChange={handleChanges}
					placeholder="NIF" />
					</div>
					<div className='a'>
					<input 
					type="text"
					name='rfc'
					value={values.rfc}
					onChange={handleChanges}
					placeholder="RFC" />
                    <input 
					type="text"
					name='razon'
					value={values.razon}
					onChange={handleChanges}
					placeholder="Razon social" />
					</div>
					<div className='b'>
					<input 
					type="text"
					name='correo'
					value={values.correo}
					onChange={handleChanges}
					placeholder="Correo electronico" />
					</div>
					<div className='a'>
                    <select
							name="estado"
							value={values.estado}
							onChange={handleChanges}
						>
							{estadosDeMexico.map((estado) => (
								<option value={estado}>{estado}</option>
							))}
						</select>
					<input 
					type="text"
					name='ciudad'
					value={values.ciudad}
					onChange={handleChanges}
					placeholder="ciudad" />
                    </div>
					<div className='a'>
                    <input 
					type="text"
					name='colonia'
					value={values.colonia}
					onChange={handleChanges}
					placeholder="Colonia" />
					<input 
					type="text"
					name='calle'
					value={values.calle}
					onChange={handleChanges}
					placeholder="Calle" />
                    </div>
					<div className='a'>
                    <input 
					type="text"
					name='numero'
					value={values.numero}
					onChange={handleChanges}
					placeholder="Número" />
					<input 
					type="text"
					name='cp'
					value={values.cp}
					onChange={handleChanges}
					placeholder="CP" />
                    </div>
					</div>
				<IonButton onClick={crear}>Crear</IonButton>
			</form>
			
		</>
	)
}
