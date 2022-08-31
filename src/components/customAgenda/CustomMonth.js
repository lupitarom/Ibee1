import React from 'react'

export const CustomMonth = ({ rango, consultorio }) => {
    return (
        <>
            <div className="contenedorDias">
                <div>Dom</div>
                <div>Lun</div>
                <div>Mar</div>
                <div>Mie</div>
                <div>Jue</div>
                <div>Vie</div>
                <div>Sab</div>
            </div>

            <div className="contenedorDiasNum">
                {
                    rango.rango.dias.map((dia, index) => (
                        <div className={`dia ${dia.class}`} key={index}>
                            <a href={`/agendax/${dia.dia.toISOString().split('T')[0] }/${consultorio}`}>
                                {dia.dia.getDate()}
                                <div className="numCitasCalendar">{ dia.nCitas }</div>
                            </a>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
