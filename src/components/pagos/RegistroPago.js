import { IonButton } from '@ionic/react'
import React, { useState } from 'react'
import {config} from '../../env'
import axios from 'axios'
import { useParams } from 'react-router'

const sanitizeFecha = (fecha) => new Date(fecha).toISOString().split('T')[0];

export const RegistroPago = ({ pago, getHistorialPagos }) => {

    const [editing, setEditing] = useState(false)
    const [values, setValues] = useState(pago)
    const params = useParams()

    const handleChange = (e) => {
        setEditing(true)
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const cancelEdit = () => setEditing(false)

    const handleAcept = async() => {
        const data = {
            ...values,
            fecha: sanitizeFecha( values.fecha )
        }

        try {
            if( pago.id_registro_pagos_rehabilitacion ){
                await axios.put(`${config.baseUrl}/api/pagos/${pago.id_registro_pagos_rehabilitacion}`, data);
                console.log('actualizado correctamente');
                setEditing(false)
            }else{
                //return console.log(values)
                await axios.post(`${config.baseUrl}/api/pagos/${pago.historial_pagos_rehabilitacion_id_historial_pagos_rehabilitacion}`, data);
                console.log('creado correctamente');
                getHistorialPagos()
                setEditing(false)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <tr>
            <td>
                <input
                    type="date"
                    name="fecha"
                    value={ sanitizeFecha( values.fecha ) || sanitizeFecha(new Date()) }
                    onChange={(e)=>{
                        setValues({
                            ...values,
                            [e.target.name]: sanitizeFecha( e.target.value )
                        })
                    }}
                />
            </td>
            <td>
                <input
                    type="text"
                    name="tratamiento"
                    value={values.tratamiento}
                    onChange={handleChange}
                />
            </td>
            <td>
                <input
                    type="text"
                    name="cantidad"
                    value={values.cantidad}
                    onChange={handleChange}
                />
            </td>
            <td>
                <input
                    type="text"
                    name="costo"
                    value={values.costo}
                    onChange={handleChange}
                />
            </td>
            <td>
                <input
                    type="text"
                    name="cantidad"
                    value={values.cantidad}
                    onChange={handleChange}
                />
            </td>
            <td>
                <input
                    type="text"
                    name="abono"
                    value={values.abono}
                    onChange={handleChange}
                />
            </td>
            {
                editing && (
                    <td>
                        <button
                            className="btn-guardar"
                            onClick={handleAcept}
                        >
                            guardar
                        </button>
                        <button
                            className="btn-cancelar"
                            onClick={cancelEdit}
                        >
                            cancelar
                        </button>
                    </td>
                )
            }
        </tr>
    )
}
