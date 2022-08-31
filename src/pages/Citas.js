import { useIonRouter } from '@ionic/react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { getWeekNumber } from '../calendar/utils/getNumberOfWeeks';
import { sanitizeFecha } from '../calendar/utils/sanitizeFecha';
import { Layout } from '../components/layout/Layout'
import Schedule from '../components/schedule-component/Schedule'
import { sanitizeCitas } from '../components/schedule-component/utils/sanitizeCitas';
import { config } from '../env';

export const Citas = () => {
    const [citas, setCitas] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
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
    });

    useEffect(() => {
        getCitas()
    }, [])
    
    useEffect(() => {
        getCitas()
    }, [fecha])

    const getCitas = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        fetch(`${config.baseUrl}/api/citas?fromDate=${fecha}&toDate=${fecha}&consultorio=1&range=month`,
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
                console.log(results.results);
                setError(false)
            })
            .catch(error => {
                setError(true)
                setLoading(false)
            });
    }

    return (
        <Layout>
            <div className="main">
                <div className="container">
                    <Schedule
                        fecha={fecha}
                        citas={sanitizeCitas(citas)}
                        setFecha={setFecha}
                    />
                </div>
            </div>

        </Layout>
    )
}
