import { addDays, endOfMonth, startOfMonth, getDaysInMonth, subDays, endOfWeek, addMonths, subMonths } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Layout } from '../components/layout/Layout'
import './Citas.css'
import { CustomAgendaHeader } from './../components/customAgenda/CustomAgendaHeader';
import { CustomMonth } from '../components/customAgenda/CustomMonth'
import { config } from '../env'

const sanitizeFecha = date => date.toISOString().split('T')[0]

export const Cita = () => {
    const params = useParams();
    const hoy = new Date();

    const [fecha, setFecha] = useState(new Date());
    const [citas, setCitas] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showToast1, setShowToast1] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [rango, setRango] = useState({
        rango: {
            name: 'mes',
            dias: []
        },
        add: addMonths,
        sub: subMonths,
        start: startOfMonth,
        end: endOfMonth,
        getDays: getDaysOfMonth
    });

    useEffect(() => {
        getDaysOfMonth(rango)
        //addNDaysToCitas()
        getCitas()
    }, [fecha])

    useEffect(()=>{
        getDaysOfMonth(rango)
       // addNDaysToCitas()
        getCitas()
    },[])
    
    function getDaysOfMonth({ start, end, sub, add }) {
        const inicio = start(fecha);
        const fin = end(fecha);
        let dias = [];
        for (let i = 1; i <= inicio.getDay(); i++) { //puse menor o igual
            dias = [{ dia: subDays(inicio, i), class: 'diasNoMes' }, ...dias];
        }
        for (let i = 0; i < getDaysInMonth(fecha); i++) { // puse menor o igual 
            if (sanitizeFecha(addDays(inicio, i)) === sanitizeFecha(hoy)) {
                dias.push({ dia: addDays(inicio, i), class: 'diasSiMes diaActual' });
                console.log('dia actual');
            } else {
                dias.push({ dia: addDays(inicio, i), class: 'diasSiMes' });
            }
        }
        for (let i = 1; i <= endOfWeek(fin).getDay(); i++) {
            dias.push({ dia: addDays(fin, i), class: 'diasNoMes' }); //agregue +1
        }
        setRango({ ...rango, rango: { ...rango.rango, dias } })
    }

    const getCitas = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        fetch(`${config.baseUrl}/api/citas?fromDate=${fecha.toISOString()}&toDate=${fecha.toISOString()}&consultorio=${params.consultorio}&range=month`,
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

                const x = {};

                results.results.map( cita =>{
                    const fecha = sanitizeFecha(new Date(cita.fecha_inicio));
                    if( x[fecha] ){
                        x[fecha] = x[fecha] +1;
                    }else{
                        x[fecha] = 1;
                    }
                })
                
                let diaNCitas = [];
                rango.rango.dias.map( (dia,index) =>{;
                    const fechaDia = sanitizeFecha(new Date(dia.dia))
                    if( x[fechaDia] ){
                        return diaNCitas.push({...dia, nCitas: x[fechaDia]})
                    }
                    diaNCitas.push({...dia, nCitas: x[fechaDia]})
                })
                
                setError(false)
            })
            .catch(error => {
                console.log(error);
                setError(true)
                setLoading(false)
            });
    }

    const addNDaysToCitas = () =>{
        const x = {};
                citas.map( cita =>{
                    const fecha = sanitizeFecha(new Date(cita.fecha_inicio));
                    if( x[fecha] ){
                        x[fecha] = x[fecha] +1;
                    }else{
                        x[fecha] = 1;
                    }
                })
                
                let diaNCitas = [];
                rango.rango.dias.map( (dia,index) =>{;
                    const fechaDia = sanitizeFecha(new Date(dia.dia))
                    if( x[fechaDia] ){
                        return diaNCitas.push({...dia, nCitas: x[fechaDia]})
                    }
                    diaNCitas.push({...dia, nCitas: x[fechaDia]})
                })
                setRango({ ...rango, rango: { ...rango.rango, dias:  diaNCitas} })
    }
    
    return (
        <Layout>

            <div className="contenedorCalendario">
                
            <h2>Consultorio {params.consultorio}</h2>
                <CustomAgendaHeader
                    fecha={fecha}
                    rango={rango}
                    setFecha={setFecha}
                />
                <CustomMonth
                    rango={rango}
                    consultorio={params.consultorio}
                />
            </div>

        </Layout>
    )
}
