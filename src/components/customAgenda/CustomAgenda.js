import React, { useEffect, useState } from 'react'
import './customAgenda.css';
import { CustomAgendaHeader } from './CustomAgendaHeader';
import { startOfMonth, endOfMonth } from 'date-fns';
import { useParams } from 'react-router';
import { SelectorSemana } from './SelectorSemana';
import { config } from '../../env';
import { IonLoading } from '@ionic/react';

export const CustomAgenda = () => {
    let horas = [];
    let espacios = [];
    let segmentos = 5;
    const params = useParams();
    const [citas, setCitas] = useState([]);
    const [fecha, setFecha] = useState(params.fecha)
    const [espaciosState, setEspaciosState] = useState([])

    useEffect(()=>{
        makeEspacios()
    },[])

    useEffect(() => {
        makeEspacios()
        getCitas()
    }, [fecha])

    const makeEspacios = () =>{

        for (let j = 0; j < 60; j += segmentos) {//agregue un cero
            if (j < 10) {
                espacios.push("0" + j);
            } else {
                espacios.push(j); //solo tenia eso sin el if
            }
        }
    
        for (let i = 8; i < 21; i++) { //agregue cero para que sean de dos digitos
            let hrs;
            if (i < 10) {
                hrs = "0" + i;
            } else {
                hrs = i;
            }

            horas.push({
                hora: hrs, //tenia i, no hrs
                espacios
            });
        }

        const espaciosTemp = horas.map( hora => {
            return hora.espacios.map( segmento =>{
                return {hora:`${hora.hora}:${segmento}`,cita: null}
            })
        })

        setEspaciosState( espaciosTemp );
    }

    const getCitas = () =>{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        fetch(`${config.baseUrl}/api/citas?fromDate=${fecha}&consultorio=1&range=day`,
        {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }
    )
        .then(response => response.json())
        .then((results) => {
            if (results.error) {
                console.log(results.error);
            }
            if( !results.results ){
                return console.log('sin resultados');
            }
            //console.log( results );
            setCitas( results.results )


            const espaciosStateTemp = espaciosState.map( espacio =>{
                
                return espacio.map( hora =>{
                    let horaTemp;

                    results.results.forEach( cita =>{
                        const citaHora = cita.hora_inicio;
                        if( citaHora === `${hora.hora}:00` ){
                            horaTemp = {hora: hora.hora,cita}
                        }else{
                            horaTemp = hora
                        }
                    })
                    
                    return horaTemp
                })
            })

            if( espaciosStateTemp.length > 0){
                setEspaciosState( espaciosStateTemp );
            }
            // setEspaciosState( espaciosStateTemp );
        })
    }

    return (
        <div className="contenedorEspacios">

            <SelectorSemana 
                fecha={ fecha }
                setFecha={ setFecha }
            />

            <h2>Consultorio <span>{ params.consultorio }</span></h2>
            <div className="contenedorHoras">
                {

                    espaciosState.map( (espacio,index) =>(
                        <div className="hora" key={index}>
                            {
                                espacio.map( hora =>(
                                    <div className="espacio">
                                    <span
                                        key={hora?.hora}
                                        className="espacio-hora-indicador"
                                        >{`${hora?.hora}`}</span>

                                    <a className="espacio-cita"
                                        href={`/agregarcitas/${`${hora?.hora}`}/${`${hora?.hora}`}/${fecha}/${params.consultorio}`}
                                    >
                                        {
                                            hora?.cita ? hora.cita.asunto : 'libre'
                                        }
                                    </a>

                                </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
            <h3> <span>06</span> citas para el dia de hoy </h3>
        </div>
    )
}
