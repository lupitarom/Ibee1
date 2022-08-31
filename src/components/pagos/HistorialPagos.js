import { IonButton } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { RegistroPago } from './RegistroPago'

export const HistorialPagos = ({ historial,setShowModal, getHistorialPagos }) => {

    const [pagos, setPagos] = useState(historial.pagos)
    const [calculos, setCalculos] = useState({
        total: 0,
        abono: 0,
        adeudo: 0
    })

    useEffect(() => {
        calcular()
    }, [historial])

    const hacerNuevoPago = () => {
        setPagos([
            ...pagos,
            {
                id_registro_pagos_rehabilitacion: null,
                abono: '',
                cantidad: '',
                costo: '',
                estatus: '',
                fecha: new Date(),
                historial_pagos_rehabilitacion_id_historial_pagos_rehabilitacion: historial.id_historial_pagos_rehabilitacion,
                tratamiento: ''
            }
        ])
    }

    const calcular = () => {
        if (pagos.length > 0) {
            //const total = pagos.reduce((a, b) => (a.costo * a.cantidad) + (b.costo * b.cantidad))
            //console.log(total);
            //const abono = pagos.reduce((a, b) => a.abono + b.abono)
            // const adeudo = total - abono;
            // setCalculos({
            //     total,
            //     abono,
            //     adeudo
            // })
            let total = 0;
            let abono = 0;
            pagos.forEach( pago =>{
                total += pago.costo * pago.abono
                abono += pago.abono
            })
            console.log({
                total,
                abono,
                adeudo: total - abono
            });
        }
    }

    return (
        <>
            <div className="tabla">
                <p>Tratamiento Fecha Inicio: {new Date(historial.fecha_inicio).toLocaleDateString()}</p>
                <p>{historial.titulo}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Tratamiento</th>
                            <th>Cantidad</th>
                            <th>Costo U.</th>
                            <th>SubTotal</th>
                            <th>Abono</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            pagos.map((pago, index) => (
                                <RegistroPago
                                    key={index}
                                    pago={pago}
                                    getHistorialPagos={getHistorialPagos}
                                />
                            ))
                        }
                    </tbody>
                </table>
                <IonButton
                    onClick={hacerNuevoPago}
                >
                    +
                </IonButton>
            </div>
        </>
    )
}
