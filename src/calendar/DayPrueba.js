import React, { useEffect, useState } from 'react';
import { Layout } from '../components/layout/Layout';
import './DayPrueba.css';
import flechaD from './../assets/img/arrow-derecha.png'
import flechaI from './../assets/img/arrow-izquierda.png'
import consultorio from './../assets/img/consultorio.svg'
import { config } from '../env';
import { sanitizeFecha } from './utils/sanitizeFecha';
import { format, subDays, addDays } from 'date-fns';
import { IonProgressBar, IonToast } from '@ionic/react';
import { getWeekNumber } from './utils/getNumberOfWeeks';

export const DayPrueba = () => {
    const espacios = [];
    const [citas, setCitas] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [fecha, setFecha] = useState(sanitizeFecha(new Date()));
    const [week, setWeek] = useState(getWeekNumber(new Date()));
    const [showToast1, setShowToast1] = useState(false);
    console.log(new Date().getDay());
    useEffect(() => {
        getCitas()
    }, [])
    useEffect(() => {
        getCitas()
    }, [fecha])
    console.log(getWeekNumber(new Date()));
    const makeEspacios = () => {
        let hora = 8;
        for (let i = 0; i < 26; i++) {
            espacios.push(hora);
            hora += .5;
        }
    }

    makeEspacios();

    const sanitizeHours = espacio => {
        if (typeof espacio !== 'number') espacio = 21
        return espacio % 1 == 0 ? `${espacio}:00` : `${espacio - .5}:30`
    }

    const getCitas = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        fetch(`${config.baseUrl}/api/citas?fromDate=${fecha}&toDate=${fecha}&consultorio=1`,
            {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            }
        )
            .then(response => response.json())
            .then((results) => {
                if (results.error) {
                    showToast1(true)
                    console.log(results.error);
                    return setError(true)
                }
                setTimeout(() => setLoading(false), 1000)
                setCitas(results.results);
                setError(false)
            })
            .catch(error => {
                setError(true)
                setLoading(false)
            });
    }

    const handleFechaChange = e => {
        setFecha(e.target.value)
    }
    return (
        <Layout>
            <IonToast
                isOpen={showToast1}
                onDidDismiss={() => setShowToast1(false)}
                message='error al cargar citas'
                duration={3000}
            />
            {
                loading && <IonProgressBar type="indeterminate"></IonProgressBar>
            }
            <div className="contenedorCitas">
                <div className="contenido">

                    <div className="calendar">
                        <div className="fecha">
                            <button
                                onClick={() => {
                                    setFecha(sanitizeFecha(subDays(new Date(fecha), 1)))
                                }}
                                className="flecha">
                                <img src={flechaI}></img>
                            </button>
                            <h1>
                                <input
                                    type="date"
                                    value={fecha}
                                    onChange={handleFechaChange}
                                />
                            </h1>
                            <button
                                onClick={() => {
                                    setFecha(sanitizeFecha(addDays(new Date(fecha), 1)))
                                }}
                                className="flecha">
                                <img src={flechaD}></img>
                            </button>
                        </div>
                        <div className="semana">
                            <div className="dia">
                                <p>L</p>
                                <p className="diaNum">23</p>
                            </div>
                            <div className="dia">
                                <p>M</p>
                                <p className="diaNum marca">24</p>
                            </div>
                            <div className="dia">
                                <p>M</p>
                                <p className="diaNum">25</p>
                            </div>
                            <div className="dia">
                                <p>J</p>
                                <p className="diaNum">26</p>
                            </div>
                            <div className="dia">
                                <p>V</p>
                                <p className="diaNum">27</p>
                            </div>
                            <div className="dia">
                                <p>S</p>
                                <p className="diaNum">28</p>
                            </div>
                        </div>
                    </div>

                    <h2>Consultorio 1</h2>
                    <div className="espacios">
                        {
                            espacios.map((espacio, index) => {
                                const [espacioTieneCita] = citas.filter(cita => cita.hora_inicio.includes(sanitizeHours(espacio)))
                                return (
                                    <div className={`dayPru ${espacioTieneCita && 'noDisponibleHoraPru'}`}
                                        key={index}
                                        onClick={() => console.log('click ', espacio)}>

                                        <div className="hora">
                                            <div className="horaText">
                                                <p> {sanitizeHours(espacio)} </p>
                                                <p> - </p>
                                                <p> {sanitizeHours(espacios[index + 1])} </p>
                                            </div>
                                        </div>
                                        <a href={
                                            !espacioTieneCita ? `/agregarcitas/${sanitizeHours(espacio)}/${sanitizeHours(espacios[index + 1])}/${fecha}`
                                                : `/cita/${espacioTieneCita.id_citas}`
                                        }>
                                            <div className={`citas citasPru ${espacioTieneCita && 'noDisponibleCita'}`}>
                                                <p> {espacioTieneCita ? `${espacioTieneCita.asunto}` : ' . '}</p>
                                                <p> <img src={consultorio}></img> {espacioTieneCita ? `: ${espacioTieneCita.Consultorio}` : 'sin cita'}</p>
                                            </div>

                                        </a>

                                        <a href="cita/2266">
                                            <div className="citas citasPru noMostrar" >
                                                <p>sin cita</p>
                                                <p> <img src={consultorio}></img></p>
                                            </div>
                                        </a>

                                        <a href="cita/2266">
                                            <div className="citas citasPru noMostrar" >
                                                <p>sin cita</p>
                                                <p> <img src={consultorio}></img></p>
                                            </div>
                                        </a>

                                        <a href="cita/2266">
                                            <div className="citas citasPru noMostrar" >
                                                <p>sin cita</p>
                                                <p> <img src={consultorio}></img></p>
                                            </div>
                                        </a>

                                        <a href="cita/2266">
                                            <div className="citas citasPru noMostrar" >
                                                <p>sin cita</p>
                                                <p> <img src={consultorio}></img></p>
                                            </div>
                                        </a>

                                        <a href="cita/2266">
                                            <div className="citas citasPru noMostrar" >
                                                <p>sin cita</p>
                                                <p> <img src={consultorio}></img></p>
                                            </div>
                                        </a>

                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="numCitas">

                        <p> <span>{citas.length}</span> citas para el dia de hoy</p>

                    </div>
                </div>
            </div>
        </Layout >
    )
}
