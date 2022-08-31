import React, { useEffect, useState } from 'react';
import { Layout } from '../components/layout/Layout';
import './Day.css';
import flechaD from './../assets/img/arrow-derecha.png'
import flechaI from './../assets/img/arrow-izquierda.png'
import x from './../assets/img/x-circle-fill.svg'
import { config } from '../env';
import { sanitizeFecha } from './utils/sanitizeFecha';
import { format, subDays, addDays } from 'date-fns';
import { IonProgressBar, IonToast, IonModal, useIonRouter } from '@ionic/react';
import { getWeekNumber } from './utils/getNumberOfWeeks';
import { useParams } from 'react-router';

export const Day = () => {
    const espacios = [];
    const [citas, setCitas] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [week, setWeek] = useState(getWeekNumber(new Date()));
    const [showToast1, setShowToast1] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const router = useIonRouter();
    const params = useParams();
    const fechaInicial = params.fecha ? sanitizeFecha(new Date(params.fecha)) : sanitizeFecha(new Date());
    const [fecha, setFecha] = useState(fechaInicial);
    const [editarCita, setEditarCita] = useState({
        "id": "",
        "fecha_inicio": "",
        "fecha_fin": "",
        "hora_inicio": "",
        "hora_fin": "",
        "consultorio": "",
        "medico": "",
        "asunto": ""
    })

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

    const actualizarCita = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(editarCita);
        
        fetch("http://localhost:8081/api/citas", {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
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
        <IonModal
            isOpen={showModal}
            cssClass='my-custom-class'
            swipeToClose={true}
            presentingElement={router || undefined}
            onDidDismiss={() => setShowModal(false)}>
            <div className="modal">
                <button className="btnCerrar"
                    onClick={() => setShowModal(false)}
                >
                    <img src={x}></img>
                </button>
                <div className="contenido">
                    <div>
                        <p>Editar Cita</p>
                        <form>

                            <label>Hora:</label>
                            <input placeholder="08:30"></input>

                            <label>Nombre:</label>
                            <input placeholder="Nombre"></input>

                            <label>Asunto:</label>
                            <input placeholder="Asusto"></input>

                            <label>Consultorio:</label>
                            <input placeholder="Consultorio"></input>

                            <label>Dr.:</label>
                            <input placeholder="Nombre del Dr."></input>
                            <button className="btnGuardar"
                                onClick={() => setShowModal(false)}
                            >
                                Guardar Cambios
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </IonModal>
        {
            loading && <IonProgressBar type="indeterminate"></IonProgressBar>
        }
        <div className="contenedorCitas">
            <div className="contenido">
                <button className="xxx"
                    onClick={() => setShowModal(true)}
                >modal</button>
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
                        <div className="dia">
                            <p>D</p>
                            <div className="diaNum"><p>29</p></div>
                        </div>
                    </div>
                </div>

                <h2>Consultorio {params.consultorio}</h2>
                <div className="espacios">
                    {
                        espacios.map((espacio, index) => {
                            const [espacioTieneCita] = citas.filter(cita => cita.hora_inicio.includes(sanitizeHours(espacio)))
                            return (
                                <div className={`day ${espacioTieneCita && 'noDisponibleHora'}`}
                                    key={index}
                                    onClick={() => console.log('click ', espacio)}>
                                    <a href={
                                        !espacioTieneCita ? `/agregarcitas/${sanitizeHours(espacio)}/${sanitizeHours(espacios[index + 1])}/${fecha}/${params.consultorio}`
                                            : `/cita/${espacioTieneCita.id_citas}`
                                    }
                                    >
                                        <div className="hora">
                                            <div className="horaText">
                                                <p> {sanitizeHours(espacio)} </p>
                                                <p> - </p>
                                                <p> {sanitizeHours(espacios[index + 1])} </p>
                                            </div>
                                        </div>

                                        <div className={`citas ${espacioTieneCita && 'noDisponibleCita'}`}>
                                            <p> {espacioTieneCita ? `${espacioTieneCita.asunto} - consultorio: ${espacioTieneCita.Consultorio}` : 'sin cita'}</p>
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
