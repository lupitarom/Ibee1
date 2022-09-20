import './registrar.css'
import { IonButton } from '@ionic/react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { config } from '../../env'
import { Camera, CameraResultType } from '@capacitor/camera'




export const Registrar=({setShowModal})=>{
const[values,setValues]=useState({
    usuario: '',
    password: ''
})

const handleChanges = (e) => {
    setValues({
        ...values,
        [e.target.name]: e.target.value,
    })
}




	
    return (
		<>
		<button className="boton-x" onClick={() => setShowModal(false)}>x</button>
        <div className='conWrap'>
		<div className='ibee'></div>
		<h3 className='CrearUsuario'>Crear nuevo usuario</h3>
			
		
			<form className="form-container1">
                    <div className='b'>
					<input 
					type="text"
					name='nombre'
					value={values.nombre}
					onChange={handleChanges}
					placeholder="Nombre (s)" />   
                    </div>
                    <div className='b'>
                    <input 
					type="text"
					name='ap_paterno'
					value={values.ap_paterno}
					onChange={handleChanges}
					placeholder="Apellidos" />
                    </div>
					<div className='b'>
					<input 
					type="text"
					name='ap_materno'
					value={values.ap_materno}
					onChange={handleChanges}
					placeholder="correo electronico" />   
                    </div>
                    <div className='b'>
                    <input 
					type="text"
					name='user'
					value={values.user}
					onChange={handleChanges}
					placeholder="Usuario" />
					
                    </div>
					<div className='b'>
                    <input 
					type="text"
					name='password'
					value={values.password}
					onChange={handleChanges}
					placeholder="Contraseña" />
					
                    </div>
                    <button className='btn'>Crear</button>
			</form>
			</div>
      </>
	)
}
