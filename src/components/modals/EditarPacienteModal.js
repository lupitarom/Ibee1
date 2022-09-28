import { IonButton, IonFabButton } from '@ionic/react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { config } from '../../env'
import { Camera, CameraResultType } from '@capacitor/camera'
import './editarPacienteModal.css'
import axios from 'axios'

const estadosDeMexico = ['Aguascalientes','Baja California','Baja California Sur','Campeche','Chiapas','Chihuahua','Coahuila de Zaragoza','Colima','Ciudad de México','Durango','Guanajuato',
	'Guerrero','Hidalgo','Jalisco','Estado de Mexico','Michoacan de Ocampo','Morelos','Nayarit','Nuevo Leon','Oaxaca','Puebla','Queretaro de Arteaga','Quintana Roo','San Luis Potosi',
	'Sinaloa','Sonora','Tabasco','Tamaulipas','Tlaxcala','Veracruz de Ignacio de la Llave','Yucatan','Zacatecas',]

export const EditarPacienteModal = ({ paciente, df, setPaciente, setShowModal }) => {
	const [values, setValues] = useState({
		foto: paciente.url,
		nombre: paciente.nombre,
		ap_materno: paciente.ap_materno,
		ap_paterno: paciente.ap_paterno,
		rfc: paciente.rfc,
		telefono: paciente.telefono?.telefono, // TODO
		whatsapp: paciente.telefono?.whatsapp,
		edad: paciente.edad	,
		estado: paciente.estado,
		ciudad: paciente.ciudad,
		colonia: paciente.colonia,
		calle: paciente.calle,
		numero: paciente.numero,
		cp: paciente.cp,
		regimen_fiscal: paciente.df?.regimen_fiscal,
		nif:paciente.df?.nif,
		razon_social:paciente.df?.razon_social,
		correo:paciente.correo,
		estado2: paciente.df?.estado2,
		ciudad2: paciente.df?.ciudad2,
		colonia2: paciente.df?.colonia2,
		calle2: paciente.df?.calle2,
		numero2: paciente.df?.numero2,
		cp2: paciente.df?.cp2,
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
				...df,
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
	const limpiarCampo = (e) => {
        e.preventDefault();
        setValues({
            ...values,
            [e.target.name]: ''
        })
	}

	return (
		<>

		<button className="boton-x" onClick={() => setShowModal(false)}>x</button>
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
				<div className='datos'><label>DATOS PERSONALES</label></div>
				<div className='b'>
					<input 
					type="text"
					name='nombre'
					value={values.nombre}
					onChange={handleChanges}
					placeholder="Nombre" />
					<button  className='borrar'
					 name="nombre"
					 onClick={limpiarCampo}
					>x</button>
					</div>
					<div className='b'>
                    <input 
					type="text"
					name='ap_paterno'
					value={values.ap_paterno}
					onChange={handleChanges}
					placeholder="Apellido Paterno" />
					<button className='borrar'
					 name="ap_paterno"
					 onClick={limpiarCampo}
					>x</button>
                    </div>
					<div className='b'>
                    <input 
					type="text"
					name='ap_materno'
					value={values.ap_materno}
					onChange={handleChanges}
					placeholder="Apellido Materno" />
					<button className='borrar'
					name="ap_materno"
					onClick={limpiarCampo}
					>x</button>
					</div>
					<div className='a'>
					<input
						type="tel"
						name="telefono"
						placeholder='Teléfono'
						value={values.telefono}
						onChange={handleChanges}
					/>

					<input
						type="text"
						name="whatsapp"
						value={values.whatsapp}
						placeholder='whatsApp'
						onChange={handleChanges}
					/>

						<input
						type="text"
						name="edad"
						value={values.edad}
						placeholder='Edad'
						onChange={handleChanges}
					/>
					</div>
					<div className='a'>

						<select 
                            name="estado"
                            value={values.estado}
                            onChange={handleChanges}
                            >
							{estadosDeMexico.map((estado) => (
								<option 
                                    value={estado}>{estado}</option>
							))}
						</select>

						<input
							type="text"
							name="ciudad"
							value={values.ciudad}
							placeholder='Ciudad'
							onChange={handleChanges}
						/>
						</div>

					<div className='a'>

						<input
							type="text"
							name="colonia"
							value={values.colonia}
							placeholder='Colonia'
							onChange={handleChanges}
						/>

						<input
							type="text"
							name="calle"
							value={values.calle}
							placeholder='Calle'
							onChange={handleChanges}
						/>
					</div>
					<div className='a'>
						<input
							type="number"
							name="numero"
							value={values.numero}
							placeholder='Número'
							onChange={handleChanges}
						/>
						<input
							type="number"
							name="cp"
							value={values.cp}
							placeholder='Código Postal'
							onChange={handleChanges}
						/>
					</div>
					<div className='datos'><label>DATOS FISCALES</label></div>
					<div className='b'>
					<input 
					type="text"
					name='regimen_fiscal'
					value={values.regimen_fiscal}
					onChange={handleChanges}
					placeholder="Regimen fiscal" />
					<button className='borrar'
					name="regimen_fiscal"
					onClick={limpiarCampo}
					>x</button>
					</div>
					<div className='b'>
					<input 
					type="text"
					name='nif'
					value={values.nif}
					onChange={handleChanges}
					placeholder="NIF" />
					<button className='borrar'
					name="nif"
					onClick={limpiarCampo}
					>x</button>
					</div>
						<div className='a'>
						<input
							type="text"
							name="rfc"
							value={values.rfc}
							placeholder='RFC'
							onChange={handleChanges}
						/>
						<input
							type="text"
							name="razon_social"
							value={values.razon_social}
							placeholder='Razón Social'
							onChange={handleChanges}
						/>
						</div>
						<div className='b'>
					<input 
					type="text"
					name='correo'
					value={values.correo}
					onChange={handleChanges}
					placeholder="Correo electronico" />
					<button className='borrar'
					name="correo"
					onClick={limpiarCampo}
					>x</button>
					</div>
						<div className='a'>

						<select 
                            name="estado2"
                            value={values.estado2}
                            onChange={handleChanges}
                            >
							{estadosDeMexico.map((estado2) => (
								<option 
                                    value={estado2}>{estado2}</option>
							))}
						</select>

						<input
							type="text"
							name="ciudad2"
							value={values.ciudad2}
							placeholder='Ciudad'
							onChange={handleChanges}
						/>
						</div>

					<div className='a'>

						<input
							type="text"
							name="colonia2"
							value={values.colonia2}
							placeholder='Colonia'
							onChange={handleChanges}
						/>

						<input
							type="text"
							name="calle2"
							value={values.calle2}
							placeholder='Calle'
							onChange={handleChanges}
						/>
					</div>
					<div className='a'>
						<input
							type="number"
							name="numero2"
							value={values.numero2}
							placeholder='Número'
							onChange={handleChanges}
						/>
						<input
							type="number"
							name="cp2"
							value={values.cp2}
							placeholder='Código Postal'
							onChange={handleChanges}
						/>
					</div>
				<IonButton onClick={actualizar}>actualizar</IonButton>
			</form>

		</>
	)
}
