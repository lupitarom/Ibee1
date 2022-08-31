import { monthsToQuarters } from 'date-fns/esm';
import React from 'react'
import { Layout } from '../components/layout/Layout';
import "./AntecedentesPersonalesPatologicos.css"
import { useEffect, useState } from 'react';

export const AntecedentesPersonalesPatologicos = () => {

    const [mostrar, setmostrar] = useState({
        infecciosas: false,
        sexual: false,
        degenerativas: false,
        neoplasticas: false,
        neoplasticas2: false
    });

    const initialValues = {
        enfermedades_IeINT: '',
        enfermedadesTS: '',
        enf_degenerativas: '',
        enf_neoplasticas: '',
        enf_congenitas: '',
        otras: ''
    }
    
    const [values, setValues] = useState( initialValues )

    const maneSubmit = (e: any) => {
        e.preventDefault()
        console.log({ values })
    }

    const handleChange = (e: any) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <div className="contenedorAntecedentesPersonalesP">
                <h1>Antecedentes Personales Patologicos</h1>
                <form onSubmit={
                    maneSubmit
                }>
                    <div className="bloque">
                        <label htmlFor="" className="obligatorio">Enfermedades inflamatorias e infecciosas no trasmisibles*</label>
                        <div>
                            <button onClick={
                                () => setmostrar({ ...mostrar, infecciosas: true })
                            }>Si</button>
                            <button onClick={
                                () => setmostrar({ ...mostrar, infecciosas: false })
                            }>No</button>
                        </div>
                    </div>
                    {
                        mostrar.infecciosas ? (
                            <>
                                <div className="limpiar">
                                    <input 
                                        type="text" 
                                        placeholder="" 
                                        />
                                    <button>x</button>
                                </div>
                            </>
                        ) : null
                    }
                    <div className="bloque">
                        <label htmlFor="">Enfermedades de tranmisión sexual</label>
                        <div>
                            <button onClick={
                                () => setmostrar({ ...mostrar, sexual: true })
                            }>Si</button>
                            <button onClick={
                                () => setmostrar({ ...mostrar, sexual: false })
                            }>No</button>
                        </div>
                    </div>
                    {
                        mostrar.sexual ? (
                            <>
                                <div className="limpiar">
                                    <input 
                                        type="text" 
                                        placeholder="" 
                                        name="enfermedadesTS"
                                        value={ values.enfermedadesTS  }
                                        onChange={ handleChange }
                                        />
                                    <button>x</button>
                                </div>
                            </>
                        ) : null
                    }

                    <div className="bloque">
                        <label htmlFor="" className="obligatorio">Enfermedades degenerativas*</label>
                        <div>
                            <button onClick={
                                () => setmostrar({ ...mostrar, degenerativas: true })
                            }>Si</button>
                            <button onClick={
                                () => setmostrar({ ...mostrar, degenerativas: false })
                            }>No</button>
                        </div>
                    </div>
                    {
                        mostrar.degenerativas ? (
                            <>
                                <div className="limpiar">
                                    <input 
                                        type="text" 
                                        placeholder="" 
                                        name="enf_degenerativas"
                                        value={ values.enf_degenerativas }
                                        onChange={ handleChange }
                                        />
                                    <button>x</button>
                                </div>
                            </>
                        ) : null
                    }
                    <div className="bloque">
                        <label htmlFor="">Enfermedades neoplásticas</label>
                        <div>
                            <button onClick={
                                () => setmostrar({ ...mostrar, neoplasticas: true })
                            }>Si</button>
                            <button onClick={
                                () => setmostrar({ ...mostrar, neoplasticas: false })
                            }>No</button>
                        </div>
                    </div>
                    {
                        mostrar.neoplasticas ? (
                            <>
                                <div className="limpiar">
                                    <input 
                                        type="text" 
                                        placeholder=""
                                        name="enf_neoplasticas"
                                        value={ values.enf_neoplasticas } 
                                        onChange={ handleChange }
                                        />
                                    <button>x</button>
                                </div>
                            </>
                        ) : null
                    }

                    <div className="bloque">
                        <label htmlFor="">Enfermedades congenitas</label>
                        <div>
                            <button onClick={
                                () => setmostrar({ ...mostrar, neoplasticas2: true })
                            }>Si</button>
                            <button onClick={
                                () => setmostrar({ ...mostrar, neoplasticas2: false })
                            }>No</button>
                        </div>
                    </div>
                    {
                        mostrar.neoplasticas2 ? (
                            <>
                                <div className="limpiar">
                                    <input 
                                        type="text" 
                                        placeholder=""
                                        name="enf_congenitas"
                                        value={ values.enf_congenitas }
                                        onChange={ handleChange }
                                        />
                                    <button>x</button>
                                </div>
                            </>
                        ) : null
                    }
                    <textarea 
                        id="" 
                        placeholder="Otras"
                        name="otras"
                        value={ values.otras }
                        onChange={ handleChange }
                        ></textarea>
                    <div className="btnGuardar">
                        <button type="submit">Guardar</button>
                    </div>
                </form>
            </div>
        </>
    )
}
