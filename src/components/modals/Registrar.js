import './registrar.css'
import { size } from 'lodash'
import { IonButton } from '@ionic/react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { config } from '../../env'
import axios from 'axios';
import userImage from '../../assets/img/woman-gfec6923be_640.jpg'
import { Camera, CameraResultType } from '@capacitor/camera'
import {DeviceCameraIcon} from '@primer/octicons-react';
import { validateEmail } from '../../utils/helpers'


export const Registrar=({setShowModal})=>{
const[errorEmail, setErrorEmail]=useState("")
const[errorPassword, setErrorPassword]=useState("")
const[errorConfirm, setErrorConfirm]=useState("")

const[values,setValues]=useState({
    nombre: '',
	ap_paterno:'',
	ap_materno:'',
	correo: '',
    password: '',
	confirm: ''
})
const [imagenPrevia, setImagenPrevia] = useState(userImage)

const handleChanges = (e) => {
    setValues({
        ...values,
        [e.target.name]: e.target.value,
    })
}
const takePicture = async () => {
	try {
		const image = await Camera.getPhoto({
			quality: 90,
			allowEditing: true,
			resultType: CameraResultType.Uri,
		})
		var imageUrl = image.webPath
		setImagenPrevia(imageUrl)
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



const crear = async () => {
	console.log(values)
	if(!validateEmail(values.correo)){
		toast.error('Ingresa un correo valido')
	}
	
	else if(size(values.password) < 6 ){
		toast.error("Ingresa una contraseña de almenos 6 caracteres")
	}

	else if(values.password !== values.confirm){
		toast.error("Las contraseñas no coinsiden")
	}

	else{
	try {
		const { data } = await axios.post(
			`${config.baseUrl}/api/registrar`,
			values
		)
		setShowModal(false)
		toast.success('usuario creado  correctamente')
	} catch (error) {
		console.log(error)
		toast.error('error al crear usuario')
	}}
}

	
    return (
		<>
		<button className="boton-x1" onClick={() => setShowModal(false)}>x</button>
        
		<div className='conWrap'>

			<div className='ibee'></div>
			<h3 className='CrearUsuario'>Crear usuario</h3>
		
		<div className="imagen-previa-container">
				<img
					className="imagen-previa"
					src={imagenPrevia}
					alt="imagen del paciente"
				/>
				<button className="take-button" onClick={takePicture}>
				<DeviceCameraIcon size={20} />
				</button>
			</div>

			
		
			<form className="form-container1">
                    <div className='b'>
					<input 
					type="text"
					name='nombre'
					value={values.nombre}
					onChange={handleChanges}
					placeholder="Nombre (s)"  /> 
                    </div>
                    <div className='b'>
                    <input 
					type="text"
					name='ap_paterno'
					value={values.ap_paterno}
					onChange={handleChanges}
					placeholder="Apellido paterno" />
                    </div>
					<div className='b'>
					<input 
					type="text"
					name='ap_materno'
					value={values.ap_materno}
					onChange={handleChanges}
					placeholder="Apellido materno" />
                    </div>
					<div className='b'>
					<input 
					type="text"
					name='correo'
					defaultValue={values.correo}
					onChange={handleChanges}
					placeholder="Correo electronico" />
                    </div>
                    
                    <input 
					type="password"
					name='password'
					defaultValue={values.password}
					onChange={handleChanges}
					placeholder="Contraseña"
					erroMessage={"errorPassword"} />

 					<input 
					type="password"
					name='confirm'
					defaultValue={values.confirm}
					onChange={handleChanges}
					placeholder="Confirmar contraseña"
					erroMessage={errorConfirm} />
                   
                    <button type='button' onClick={crear} className='btn'>Crear</button>
			</form>
			</div>
      </>
	)
}
