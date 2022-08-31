import { IonToast } from '@ionic/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { Layout } from '../components/layout/Layout';
import { config } from '../env';
import "./AntecedentesPatologicos.css";

export const AntecedentesPatologicos = () => {

    const initialValues = {
        madre: "",
        padre: "",
        hermanos: "",
        hijos: "",
        esposo_a: "",
        tios: "",
        abuelos: "",
        enf_congenitas: "",
        enf_degenerativas: "",
        enf_neoplasticas: "",
        enfermedadesTS: "",
        enfermedades_IeINT: "",
        otras: "",
    }

    const [values, setvalues] = useState(initialValues);
    const [showToast, setShowToast] = useState(false);
    const params: any = useParams();

    useEffect(() => {
        getAntecentesPatologicos()
    }, [])

    const getAntecentesPatologicos = async() => {
        // TODO change url
        /*
        fetch(`${config.baseUrl}/api/antecedentesPatologicos/${params.pacienteId}`, {
            method: 'GET',
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(result => setvalues(result.antecedentesPatologicos))
            .catch(error => {
                setvalues(initialValues);
                console.log('error obteniendo antecedentesPatologicos', error);
            }); */
        try {
            const {data} = await axios.get(`${config.baseUrl}/api/antecedentesPatologicos/${params.pacienteId}`)
            console.log('AQUI ============');
            console.log(data);
            
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(values);

        fetch(`${config.baseUrl}/api/antecedentesPatologicos/${params.pacienteId}`, {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(result =>{
                setShowToast( true )
            })
            .catch(error => console.log('error', error));
    }

    const handleChange = (e: any) => {
        setvalues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const limpiarCampo = (e: any) => {
        e.preventDefault();
        setvalues({
            ...values,
            [e.target.name]: ''
        })
    }

    return (
        <>
            <div className="contenedorAntecedentesP">
                <h1>Antecedentes Patológicos Hereditarios</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="">Padecimientos de familiares en línea directa</label>
                    <div className="limpiar">
                        <input
                            type="text"
                            placeholder="Madre"
                            name="madre"
                            value={values.madre}
                            onChange={handleChange}
                        />
                        <button
                            name="madre"
                            onClick={limpiarCampo}
                        >x</button>
                    </div>
                    <div className="limpiar">
                        <input
                            type="text"
                            placeholder="Padre"
                            name="padre"
                            value={values.padre}
                            onChange={handleChange}
                        />
                        <button
                            name="padre"
                            onClick={limpiarCampo}
                        >x</button>
                    </div>
                    <div className="limpiar">
                        <input
                            type="text"
                            placeholder="Hermanos"
                            name="hermanos"
                            value={values.hermanos}
                            onChange={handleChange}
                        />
                        <button
                            name="hermanos"
                            onClick={limpiarCampo}
                        >x</button>
                    </div>
                    <div className="limpiar">
                        <input
                            type="text"
                            placeholder="Hijos"
                            name="hijos"
                            value={values.hijos}
                            onChange={handleChange}
                        />
                        <button
                            name="hijos"
                            onClick={limpiarCampo}
                        >x</button>
                    </div>
                    <div className="limpiar">
                        <input
                            type="text"
                            placeholder="Esposo(a)"
                            name="esposo_a"
                            value={values.esposo_a}
                            onChange={handleChange}
                        />
                        <button
                            name="esposo_a"
                            onClick={limpiarCampo}
                        >x</button>
                    </div>
                    <div className="limpiar">
                        <input
                            type="text"
                            placeholder="Tíos"
                            name="tios"
                            value={values.tios}
                            onChange={handleChange}
                        />
                        <button
                            name="tios"
                            onClick={limpiarCampo}
                        >x</button>
                    </div>
                    <div className="limpiar">
                        <input
                            type="text"
                            placeholder="Abuelos"
                            name="abuelos"
                            value={values.abuelos}
                            onChange={handleChange}
                        />
                        <button
                            name="abuelos"
                            onClick={limpiarCampo}
                        >x</button>
                    </div>
                    <div className="btnGuardar">
                        <button type="submit">Guardar</button>
                    </div>

                    <IonToast
                        isOpen={ showToast }
                        onDidDismiss={() => setShowToast(false)}
                        message={`actualizado correctamente`}
                        cssClass='bg-blue'
                        duration={3000}
                    />
                </form>
            </div>
        </>
    )
}
