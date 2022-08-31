import { IonToast } from '@ionic/react';
import closestIndexTo from 'date-fns/closestIndexTo/index.js';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import { config } from '../../env';
import './citaDia.css';
import './customAgenda.css';
import { SelectorSemana } from './SelectorSemana';

const crearHoras = (inicio, fin, segmento = 5) => {
    let horas = []
    for (let i = inicio; i < fin; i++) {
        for (let j = 0; j < 60; j += segmento) {
            let minutos = j < 10 ? `0${j}` : `${j}`;
            i < 10 ? horas.push(`0${i}:${minutos}`) : horas.push(`${i}:${minutos}`);
        }
    }
    horas.push(`21:00`)
    return horas
}

const HoraAMinutos = (hora) => {
    const [horas, minutos] = hora.split(':');
    return (Number(horas) * 60) + Number(minutos);
}

const compararHoras = (hora, cita, segmentos) => {
    let fn = HoraAMinutos;
    //return fn(cita.inicio)+1 >= fn(hora) && fn(cita.fin)-1 <= fn(hora)+segmentos;
    return fn(hora) >= fn(cita.hora_inicio) && fn(hora) + 1 <= fn(cita.hora_fin);
}

export const CitasDia = () => {

    const [segmentos, setSegmentos] = useState(30)
    const [horas, setHoras] = useState(crearHoras(8, 21, segmentos));
    const params = useParams();
    const history = useHistory();
    const [fecha, setFecha] = useState(params.fecha)
    const [citas, setCitas] = useState([])
    const [showToast, setShowToast] = useState(false)

    useEffect(() => {
        getCitas()
    }, [])

    const checkCitas = (hora, index) => {
        let citaHora;

        citas.map(cita => {
            if (compararHoras(hora, cita, segmentos)) {
                citaHora = (
                    <div className="espacio cita">
                        {cita.asunto} - {cita.nombre_c} {cita.apellido_paterno_c}
                    </div>
                )
            }
        })

        if (citaHora) {
            return citaHora
        } else {
            return (
                <div
                    onClick={() => history.push(`/agregarcitas/${`${hora}`}/${`${horas[index + 1]}`}/${fecha}/${params.consultorio}`)}
                    className="espacio">
                    libre
                </div>
            )
        }
    }

    const getCitas = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        try {
            const res = await fetch(
                `${config.baseUrl}/api/citas?fromDate=${fecha}&consultorio=${params.consultorio}&range=day`,
                {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                }
            )
            const data = await res.json()
            if (data.error) return setShowToast(true)
    
            //setCitas( data.results )
            setCitas(data.results)
        } catch (error) {
            setShowToast(true)
            console.log(error);
        }
    }

    return (
        <div className="contenedorCitas">
            {/* <SelectorSemana 
                fecha={ fecha }
                setFecha={ setFecha }
            /> */}

            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message="Error obteniendo citas"
                position="top"
                duration={2000}
            />
            
            <h1>citas dia</h1>
            <div className="contenidoCitas">
                <div>
                    {
                        horas.map((hora, index) => (
                            <div
                                className="espacios"
                                key={hora}>
                                <div className="indicador-hora">
                                    {
                                        index < horas.length - 1 && (
                                            `${hora} - ${horas[index + 1]}`
                                        )
                                    }

                                </div>

                                {
                                    index < horas.length - 1 && checkCitas(hora, index)
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
            <h3>{ citas.length } para el dia de hoy</h3>
        </div>
    )
}
