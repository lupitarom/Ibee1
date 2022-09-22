import { IonLabel, IonSegment, IonSegmentButton } from '@ionic/react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { config } from '../env';
import "./FichaIdentificacion.css";

export const FichaIndentificacion = () => {

    const params: any = useParams()

    const [values, setValues] = useState({
        fecha: '', 
        masculino: '', 
        femenino: '', 
        lugar_naci: '', 
        f_nacimiento: '', 
        ocupacion: '', 
        escolaridad: '', 
        estado_civil: '', 
        num_inter: '', 
        delegacion: '',
        nom_med_fam: '', 
        tel_medico: '', 
        fecha_cita: '', 
        motivo: '' 
    });

    useEffect(()=>{
        getFichaIndentificacion()
    },[])

    const getFichaIndentificacion = async() =>{

        const res = await fetch(`${config.baseUrl}/api/fichaDeIdentificacion/${ params.pacienteId }`,{
            method: 'GET',
            redirect: 'follow'
        })
        const data = await res.json();

        if( data.error ) return console.error('hubo un error!');
        console.log( data.results[0] );
        setValues({...data.results[0]})
    }

    const handleChange = (e:any) =>{
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }


    return (
        <>
            <div className="contenedorFicha">
                <h1>Ficha de identificación</h1>
                <form className="nombre">
                    <label htmlFor="">Nombre:</label>
                    <div className="limpiar">
                        <input
                            className="obligatorio" 
                            type="text" 
                            placeholder="Nombre*" 
                            />
                        <button>x</button>
                    </div>
                    <div className="limpiar">
                    <input className="obligatorio" type="text" placeholder="Apellido Paterno*" />
                        <button >x</button>
                    </div>
                    <div className="limpiar">
                    <input className="obligatorio" type="text" placeholder="Apellido Materno*" />
                        <button>x</button>
                    </div>
                    <div className="edadGenero">
                        <div className="edad">
                            <label htmlFor="">Edad:</label>
                            <input type="text" placeholder="Años" />
                        </div>
                        <div className="genero">
                            <label htmlFor="">Genero</label>
                            <div>
                                <button>Masculino</button>
                                <button>Femenino</button>
                            </div>
                        </div>
                    </div>
                    <div className="lugarFecha">
                        <label htmlFor="">Lugar y fecha de nacimiento:</label>
                        <div className="estadoCiudad">
                            <input 
                                type="text" 
                                placeholder="Estado" 
                                name="lugar_naci"
                                value={ values.lugar_naci }
                                onChange={ handleChange }
                                />
                            <input 
                                type="text" 
                                placeholder="Ciudad" 
                                />
                        </div>
                        <div className="estadoCiudad">
                            <input type="number" placeholder="Día" />
                            <input type="number" placeholder="Mes" />
                            <input type="number" placeholder="Año" />
                        </div>
                        <div className="estado">
                            <input type="text" placeholder="Ocupación" />
                            <input type="text" placeholder="Escolaridad" />
                        </div>
                        <div className="estado">
                            <input 
                                type="text" 
                                placeholder="Estado civil"
                                name="estado_civil"
                                value={ values.estado_civil }
                                onChange={ handleChange }
                                />
                            <input type="text" placeholder="Calle" />
                        </div>
                        <div className="estado">
                            <input type="text" placeholder="Núm. exterior" />
                            <input type="text" placeholder="Núm. interno" />
                        </div>
                        <div className="estado">
                            <input type="text" placeholder="Colonia" />
                            <input type="text" placeholder="Estado" />
                        </div>
                        <div className="estado">
                            <input type="text" placeholder="Municipio" />
                            <input type="text" placeholder="Delegacion" />
                        </div>
                        <div className="estado">
                            <input 
                                type="text" 
                                placeholder="Telefono" 
                                name="tel_medico"
                                value={ values.tel_medico }
                                onChange={ handleChange }
                                />
                            <input type="text" placeholder="Telefono Oficina" />
                        </div>
                    <div className="limpiar">

                    <input 
                        className="obligatorio" 
                        type="text" 
                        placeholder="Nombre del médico familiar*" 
                        
                        />
                        <button>x</button>
                    </div>
                    <input className="obligatorio" type="text" placeholder="Fecha y motivo de la ultima consulta médica odontologíca*" />

                    </div>
                    <button type="submit" className="btnGuardar">Guardar</button>
                </form>
            </div>
        </>
    )
}
