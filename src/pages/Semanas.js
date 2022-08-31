import React from 'react'
import { Layout } from '../components/layout/Layout';
import { CustomAgendaHeader } from '../components/customAgenda/CustomAgendaHeader';
import './Semanas.css'

export const Semanas = () => {
    let horas = [];
    let espacios = [];
    let segmentos = 15;

    for (let j = 0; j < 60; j += segmentos) {//agregue un cero
        if (j<10) {
        espacios.push("0"+j);
        }else{
        espacios.push(j); //solo tenia eso
        }
    }

    for (let i = 8; i < 21; i++) { //agregue cero para que sean de dos digitos
        let hrs;
        if (i<10) {
            hrs= "0"+i;
        }else{
            hrs= i;
        }
        horas.push({
            hora: hrs, //tenia i
            espacios
        });
    }
    return (
        <Layout>
            <div className="contenedorSemana">
                <CustomAgendaHeader />
                <div className="contenidoSemana">
                        <div className="contenidoDias">
                            <div className="principal">
                            <div>Hrs</div>
                            <div>Dom</div>
                            <div>Lun</div>
                            <div>Mar</div>
                            <div>Mie</div>
                            <div>Jue</div>
                            <div>Vie</div>
                            <div>Sab</div>
                            </div>
                        </div>
                    <div className="contenedorHoras">
                        {
                            horas.map((hora, index) => (
                                <div className="hora">{
                                    hora.espacios.map(espacio => (
                                        <div className="espacio">
                                            <span
                                                key={hora.hora}
                                                className="espacio-hora-indicador"
                                            >{`${hora.hora}:${espacio}`}</span>
                                            <div className="espacio-cita">
                                                <div className="dia"> <div>  </div> </div>
                                                <div className="dia"> <div className="marca"> 2 </div> </div>
                                                <div className="dia"> <div>  </div> </div>
                                                <div className="dia"> <div>  </div> </div>
                                                <div className="dia"> <div>  </div> </div>
                                                <div className="dia"> <div>  </div> </div>
                                                <div className="dia"> <div>  </div> </div>
                                            </div>
                                        </div>
                                    ))
                                }
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}
