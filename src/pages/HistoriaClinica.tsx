import React from 'react'
import { Layout } from '../components/layout/Layout';
import imagen from '../assets/img/card.png'
import "./HistoriaClinica.css"
import flecha from '../assets/img/arrow-derecha.png'
import ficha from '../assets/img/Ficha de indentificación.svg'
import antePerPat from '../assets/img/Antecedentes Patológicos.svg'
import exploracion from '../assets/img/Exploración de cabeza y Cuello.svg'
import odonto from '../assets/img/Odontograma Diagnóstico.svg'
import plan from '../assets/img/Plan de Tratamiento.svg'
import ruta from '../assets/img/Ruta clínica.svg'
import odontoEvo from '../assets/img/Odontograma de evoluciónsvg.svg'
import trata from '../assets/img/tratamientos realizados.svg'
import { useParams } from 'react-router';

export const HistoriaClinica = () => {

    const params:any = useParams()
    const pacienteId = params.pacienteId

    return (
        <Layout>
            <div className="contenedorHistorial">
                <div className="titulo">
                    <img src={imagen} alt="" />
                    <h1>Historia Clinica</h1>
                </div>

                <div className="campos">
                    <a href={`/historiaclinica/${pacienteId}/0`}>
                        <div>
                            <img src={ficha} alt="" />
                            <p>Ficha de Identificación</p>
                        </div>
                            <img src={flecha} alt="" />
                    </a>
                    <a href={`/historiaclinica/${pacienteId}/1`}>
                        <div>
                            <img src={antePerPat} alt="" />
                            <p>Antecedentes Personales Patologicos</p>
                        </div>
                            <img src={flecha} alt="" />
                    </a>
                    <a href={`/historiaclinica/${pacienteId}/2`}>
                        <div>
                            <img src={exploracion} alt="" />
                            <p>Exploración de Cabeza y Cuello</p>
                        </div>
                            <img src={flecha} alt="" />
                    </a>
                    <a href={`/historiaclinica/${pacienteId}/3`}>
                        <div>
                            <img src={odonto} alt="" />
                            <p>Odontograma Diagnóstico</p>
                        </div>
                            <img src={flecha} alt="" />
                    </a>
                    <a href={`/historiaclinica/${pacienteId}/4`}>
                        <div>
                            <img src={plan} alt="" />
                            <p>Plan de Tratamiento</p>
                        </div>
                            <img src={flecha} alt="" />
                    </a>
                    <a href={`/historiaclinica/${pacienteId}/5`}>
                        <div>
                            <img src={ruta} alt="" />
                            <p>Ruta Clínica</p>
                        </div>
                            <img src={flecha} alt="" />
                    </a>
                    <a href={`/historiaclinica/${pacienteId}/6`}>
                        <div>
                            <img src={odontoEvo} alt="" />
                            <p>Odontograma de evolución</p>
                        </div>
                            <img src={flecha} alt="" />
                    </a>
                    <a href={`/historiaclinica/${pacienteId}/7`}>
                        <div>
                            <img src={trata} alt="" />
                            <p>Tratamientos Realizados</p>
                        </div>
                            <img src={flecha} alt="" />
                    </a>
                    <a href={`/historiaclinica/${pacienteId}/8`}>
                        <div>
                            <img src={ficha} alt="" />
                            <p>Interrogatorio por Aparatos y Sistemas</p>
                        </div>
                            <img src={flecha} alt="" />
                    </a>
                </div>
            </div>

        </Layout>
    )
}
