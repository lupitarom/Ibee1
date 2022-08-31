import { IonButton, IonFabButton } from '@ionic/react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { config } from '../../env'
import { Camera, CameraResultType } from '@capacitor/camera'
import './editarPacienteModal.css'
import axios from 'axios'

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

export const EditarPacienteModal = ({ paciente, setPaciente, setShowModal }) => {
	const [values, setValues] = useState({
		foto: paciente.url,
		nombre: paciente.nombre,
		ap_materno: paciente.ap_materno,
		ap_paterno: paciente.ap_paterno,
		rfc: paciente.rfc,
		telefono: paciente.telefono?.telefono, // TODO
		estado: paciente.estado,
		ciudad: paciente.ciudad,
		colonia: paciente.colonia,
		calle: paciente.calle,
		numero: paciente.numero,
		cp: paciente.cp,
	})

	const [imagenPreview, setImagenPreview] = useState(
		`${config.baseUrlImagenes}/${paciente.url}`
	)

	const handleChanges = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		})
	}

	const actualizar = async () => {
		console.log(values)
		try {
            await axios.put(`${config.baseUrl}/api/paciente/${paciente.id_paciente}`, values)
            setPaciente({
                ...paciente,
                ...values,
                telefono: {...paciente.telefono,telefono:values.telefono}
            })
			setShowModal(false)
			toast.success('actualizado correctamente')
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
			<h1>Editar paciente</h1>

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
				<div>
					<label>Foto:</label>
				</div>
				<div>
					<label>Nombre:</label>
					<input
						type="text"
						name="nombre"
						value={values.nombre}
						onChange={handleChanges}
					/>
				</div>
				
				<div>
					<label>Apellido paterno:</label>
					<input
						type="text"
						name="ap_paterno"
						value={values.ap_paterno}
						onChange={handleChanges}
					/>
				</div>
				<div>
					<label>Apellido materno:</label>
					<input
						type="text"
						name="ap_materno"
						value={values.ap_materno}
						onChange={handleChanges}
					/>
				</div>
				
				<div>
					<label>RFC:</label>
					<input
						type="text"
						name="rfc"
						value={values.rfc}
						onChange={handleChanges}
					/>
				</div>

				<div>
					<label>telefono:</label>
					<input
						type="tel"
						name="telefono"
						value={values.telefono}
						onChange={handleChanges}
					/>
				</div>

				<div>
					<div>
						<label>Estado:</label>
						<select 
                            name="estado"
                            value={paciente.estado}
                            onChange={handleChanges}
                            >
							{estadosDeMexico.map((estado) => (
								<option 
                                    value={estado}>{estado}</option>
							))}
						</select>
					</div>

					<div>
						<label>Ciudad:</label>
						<input
							type="text"
							name="ciudad"
							value={values.ciudad}
							onChange={handleChanges}
						/>
					</div>

					<div>
						<label>Colonia:</label>
						<input
							type="text"
							name="colonia"
							value={values.colonia}
							onChange={handleChanges}
						/>
					</div>

					<div>
						<label>calle:</label>
						<input
							type="text"
							name="calle"
							value={values.calle}
							onChange={handleChanges}
						/>
					</div>

					<div>
						<label>numero:</label>
						<input
							type="number"
							name="numero"
							value={values.numero}
							onChange={handleChanges}
						/>
					</div>

					<div>
						<label>cp:</label>
						<input
							type="number"
							name="cp"
							value={values.cp}
							onChange={handleChanges}
						/>
					</div>
				</div>
				<IonButton onClick={actualizar}>actualizar</IonButton>
			</form>

			<IonButton onClick={() => setShowModal(false)}>cerrar</IonButton>
		</>
	)
}
