import { IonToast } from '@ionic/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { Layout } from '../components/layout/Layout'
import { config } from '../env';
import "./ExploracionCabezaCuello.css";

export const ExploracionCabezaCuello = () => {

    const params: any = useParams();
    const initialValues = {
        braquicefalico: "",
        cianotica: "",
        concavo: "",
        convexo: "",
        dolicocefalico: "",
        endostosis: "",
        enrojecida: "",
        espasticos: "",
        exostosis: "",
        ganglionar_no: "",
        ganglionar_si: "",
        hipertonicos: "",
        hipotonicos: "",
        id_expcab: "",
        longitudinales: "",
        mesocefalico: "",
        normal: "",
        otros: "",
        paciente_id2: "",
        palida: "",
        recto: "",
        transversales: ""
    }
    const [values, setValues] = useState(initialValues);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        getExploracionCabezaCuello()
    }, [])

    const getExploracionCabezaCuello = async() => {
        try {
            const {data} = await axios.get(`${config.baseUrl}/api/ExpCabCuello/${params.pacienteId}`);
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

    const handleSubmit = (e: any) => {
        e.preventDefault()
    }

    return (
        <>
            <div className="contenedorExploracionCabezaCuello">
                <h1>Exploración de cabeza y cuello</h1>

                <form onSubmit={handleSubmit} >
                    <p>Cabeza:</p>
                    <div className="bloque">
                        <div>
                            <label htmlFor="">Exostosis </label>
                            <input
                                type="radio"
                                name="extosis"
                                radioGroup="cabeza"
                                value={values.exostosis}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="">Endostosis </label>
                            <input
                                type="radio"
                                radioGroup="cabeza"
                                name="extosis"
                                value={values.endostosis}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <p className="obligatorio">Cráneo:</p>
                    <div className="bloque">
                        <div>
                            <label>Dolicocefalico </label>
                            <input
                                type="radio"
                                name="dolicocefalico"
                                value={values.dolicocefalico}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Mesocefálico </label>
                            <input
                                type="radio"
                                name="mesocefalico"
                                value={values.mesocefalico}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="">Braquicefalico </label>
                            <input
                                type="radio"
                                name="braquicefalico"
                                value={values.braquicefalico}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <p>Cara Asimetrías:</p>
                    <div className="bloque">
                        <div>
                            <label htmlFor="">Tranversales </label>
                            <input
                                type="radio"
                                name="transversales"
                                value={values.transversales}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="">Longitudinales </label>
                            <input
                                type="radio"
                                name="longitudinales"
                                value={values.longitudinales}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <p>Perfil:</p>
                    <div className="bloque">
                        <div>
                            <label htmlFor="">Cóncavo </label>
                            <input
                                type="radio"
                                name="concavo"
                                value={values.concavo}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="">Convexo </label>
                            <input
                                type="radio"
                                name="Perfil"
                                value={values.convexo}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="">Recto </label>
                            <input
                                type="radio"
                                name="recto"
                                value={values.recto}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <p>Piel:</p>
                    <div className="bloque">
                        <div>
                            <label htmlFor="">Normal </label>
                            <input
                                type="radio"
                                name="normal"
                                value={values.normal}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="">Palida </label>
                            <input
                                type="radio"
                                name="palida"
                                value={values.palida}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="">Cianótica </label>
                            <input
                                type="radio"
                                name="cianotica"
                                value={values.cianotica}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="">Enrojecida </label>
                            <input
                                type="radio"
                                name="enrojecida"
                                value={values.enrojecida}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <p className="obligatorio">Perfil:</p>
                    <div className="bloque">
                        <div>
                            <label htmlFor="">Cóncavo </label>
                            <input
                                type="radio"
                                name="concavo"
                                value={values.concavo}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="">Convexo </label>
                            <input
                                type="radio"
                                name="convexo"
                                value={values.convexo}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="">Recto </label>
                            <input
                                type="radio"
                                name="recto"
                                value={values.recto}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <p>Músculos:</p>
                    <div className="bloque">
                        <div>
                            <label htmlFor="">Hipotónicos </label>
                            <input
                                type="radio"
                                name="hipotonicos"
                                value={values.hipotonicos}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="">Hipertónicos </label>
                            <input
                                type="radio"
                                name="hipertonicos"
                                value={values.hipertonicos}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="">Espásticos </label>
                            <input
                                type="radio"
                                name="espasticos"
                                value={values.espasticos}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <p>Cuello: Se palpa la cadena ganglionar</p>
                    <div className="bloque">
                        <button
                            type="button"
                        >Si</button>
                        <button
                            type="button"
                        >No</button>
                    </div>
                    <textarea
                        name=""
                        id=""
                        placeholder="Otros"
                    ></textarea>

                    <h1>Exploración del aparato estomago</h1>

                    <label>Articulación temporomandibular</label>

                    <p>Ruidos</p>
                    <div className="bloque">
                        <button
                            type="button"
                        >Si</button>
                        <button
                            type="button"
                        >No</button>
                    </div>
                    <br />
                    <div className="bloque">
                        <div>
                            <label htmlFor="">Lateral</label>
                            <input
                                type="radio"
                                name="transversales"
                                value={values.transversales}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="">Apertura</label>
                            <input
                                type="radio"
                                name="longitudinales"
                                value={values.longitudinales}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <p>Chasquidos</p>
                    <div className="bloque">
                        <button
                            type="button"
                        >Si</button>
                        <button
                            type="button"
                        >No</button>
                    </div>
                    <p>Crepitacion</p>
                    <div className="bloque">
                        <button
                            type="button"
                        >Si</button>
                        <button
                            type="button"
                        >No</button>
                    </div>
                    <p>Dificultal para abrir la boca</p>
                    <div className="bloque">
                        <button
                            type="button"
                        >Si</button>
                        <button
                            type="button"
                        >No</button>
                    </div>
                    <p>Dolor a la abertura o movimientos de lateral</p>
                    <div className="bloque">
                        <button
                            type="button"
                        >Si</button>
                        <button
                            type="button"
                        >No</button>
                    </div>
                    <p>Fatiga o dolor muscular</p>
                    <div className="bloque">
                        <button
                            type="button"
                        >Si</button>
                        <button
                            type="button"
                        >No</button>
                    </div>
                    <p>Disminución de la abertura o movimientos de lateral</p>
                    <div className="bloque">
                        <button
                            type="button"
                        >Si</button>
                        <button
                            type="button"
                        >No</button>
                    </div>
                    <p>Desviacion a la abertura cierre</p>
                    <div className="bloque">
                        <button
                            type="button"
                        >Si</button>
                        <button
                            type="button"
                        >No</button>
                    </div>
                    <div className="btnGuardar">
                        <button>Guardar</button>
                    </div>
                </form>
                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message={`actualizado correctamente`}
                    duration={3000}
                />
            </div>
        </>
    )
}
