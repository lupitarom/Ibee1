import { IonToast } from '@ionic/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { Layout } from '../components/layout/Layout';
import { config } from '../env';
import "./InterrogatorioAparatosSistemas.css";

const limpiar = () => {
    let idAp = document.getElementById("aDigestivo");
}

export const InterrogatorioAparatosSistemas = () => {

    const initialValues = {
        apar_digestivo: "",
        apar_respiratorio: "",
        apar_cardiovascular: "",
        apar_genitourinario: "",
        sist_endocrino: "",
        sist_hemopoyetico: "",
        sist_nervioso: "",
        sist_musculoesquel: "",
        apar_tegumentario: "",
        hab_ext: "",
        peso: "",
        talla: "",
        complexion: "",
        tension_art: "",
        frec_cardiaca: "",
        frec_resp: "",
        temperatura: "",
    }

    const [values, setValues] = useState(initialValues)
    const [showToast, setShowToast] = useState(false);
    const params: any = useParams();

    useEffect(() => {
        getInterrogatorioAparatosSistemas()
    }, [])

    const getInterrogatorioAparatosSistemas = async() => {
        try {
            const {data} = await axios.get(`${config.baseUrl}/api/aparatosSistemas/${params.pacienteId}`)
            console.log('AQUI ============');
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e: any) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const guardarDatos = (e:any) => {
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify( values );

        fetch(`${config.baseUrl}/api/aparatosSistemas/${params.pacienteId}`,{
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setShowToast( true )
            })
            .catch(error => console.log('error', error));
    }

    return (
        <>
            <div className="contenedorInterrogatorioAparatosSistemas">
                <h1>Interrogatorio por Aparatos y Sistemas</h1>
                <form onSubmit={ guardarDatos } >
                    <div className="bloque">
                        <div>
                            <p>Aparato digestivo*</p>
                            <button onClick={() => limpiar()}>x</button>
                        </div>
                        <input
                            type="text"
                            id="aDigestivo"
                            placeholder="Ingresa texto"
                            name="apar_digestivo"
                            value={values.apar_digestivo}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="bloque">
                        <div>
                            <p>Aparato respiratorio*</p>
                            <button>x</button>
                        </div>
                        <input
                            type="text"
                            placeholder="Ingresa texto"
                            name="apar_respiratorio"
                            value={values.apar_respiratorio}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="bloque">
                        <div>
                            <p>Aparato cardiovascular*</p>
                            <button>x</button>
                        </div>
                        <input
                            type="text"
                            placeholder="Ingresa texto"
                            name="apar_cardiovascular"
                            value={values.apar_cardiovascular}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="bloque">
                        <div>
                            <p>Aparato genitorinario*</p>
                            <button>x</button>
                        </div>
                        <input
                            type="text"
                            placeholder="Ingresa texto"
                            name="apar_genitourinario"
                            value={values.apar_genitourinario}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="bloque">
                        <div>
                            <p>Aparato endocrino*</p>
                            <button>x</button>
                        </div>
                        <input
                            type="text"
                            placeholder="Ingresa texto"
                            name="sist_endocrino"
                            value={values.sist_endocrino}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="bloque">
                        <div>
                            <p>Aparato hernopoyético*</p>
                            <button>x</button>
                        </div>
                        <input
                            type="text"
                            placeholder="Ingresa texto"
                            name="sist_hemopoyetico"
                            value={values.sist_hemopoyetico}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="bloque">
                        <div>
                            <p>Aparato nervioso*</p>
                            <button>x</button>
                        </div>
                        <input
                            type="text"
                            placeholder="Ingresa texto"
                            name="sist_nervioso"
                            value={values.sist_nervioso}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="bloque">
                        <div>
                            <p>Aparato musculoesqueletico*</p>
                            <button>x</button>
                        </div>
                        <input
                            type="text"
                            placeholder="Ingresa texto"
                            name="sist_musculoesquel"
                            value={values.sist_musculoesquel}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="bloque">
                        <div>
                            <p>Aparato tegumentario*</p>
                            <button>x</button>
                        </div>
                        <input
                            type="text"
                            placeholder="Ingresa texto"
                            name="apar_tegumentario"
                            value={values.apar_tegumentario}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="bloque">
                        <div>
                            <p>Habitus exterior*</p>
                            <button>x</button>
                        </div>
                        <input
                            type="text"
                            placeholder="Ingresa texto"
                            name="hab_ext"
                            value={values.hab_ext}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="bloqueTres">
                        <div>
                            <input
                                type="number"
                                name="peso"
                                value={values.peso}
                                placeholder="Peso"
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="talla"
                                value={values.talla}
                                placeholder="Talla"
                                onChange={handleChange}
                            />
                        </div>
                        <input
                            type="text"
                            name="complexion"
                            value={values.complexion}
                            placeholder="Complexión"
                            onChange={handleChange}
                        />
                    </div>

                    <label htmlFor="">Signos vitales</label>
                    <div className="bloqueCuatro">
                        <input
                            type="text"
                            name="frec_cardiaca"
                            value={values.frec_cardiaca}
                            placeholder="Frecuencia Cardiaca"
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            placeholder="Tensión arterial"
                            name="tension_art"
                            value={values.tension_art}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            placeholder="Frecuencia respiratoria"
                            name="apar_respiratorio"
                            value={values.apar_respiratorio}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            placeholder="Temperatura"
                            name="temperatura"
                            value={values.temperatura}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="btnGuardar">
                        <button>Guardar</button>
                    </div>
                </form>
                <IonToast
                        isOpen={ showToast }
                        onDidDismiss={() => setShowToast(false)}
                        message={`actualizado correctamente`}
                        duration={3000}
                    />
            </div>
        </>
    )
}
