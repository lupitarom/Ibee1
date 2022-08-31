import React from 'react'
import './control.css'
import flechaD from './../../assets/img/arrow-derecha.png'
import flechaI from './../../assets/img/arrow-izquierda.png'
import { addDays, addMonths, subMonths } from 'date-fns'
import { sanitizeFecha } from '../../calendar/utils/sanitizeFecha'

export const CustomAgendaHeader = ({ setFecha, fecha, rango }) => {

    if (!fecha) {
        return null
    }
    return (
        <div className="contenedorControl">
            <div className="contenidoFecha">
                <button
                    onClick={() => setFecha(rango.sub(fecha, 1))}
                > <img src={flechaI}></img> </button>

                {fecha.toLocaleDateString('es-mx', { year: 'numeric', month: 'long' })}

                <button
                    onClick={() => setFecha(rango.add(fecha, 1))}
                > <img src={flechaD}></img> </button>
            </div>

            <div className="contenidoBtn">
                <a href={`/agendax/${sanitizeFecha(fecha)}/1`}>Dia</a>
                <a href="/semanas">Semana</a>
                <a href="/cita/2266">Mes</a>
            </div>
        </div>
    )
}
