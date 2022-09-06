import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUs from 'date-fns/locale/en-US'
import { addMinutes, set, subMonths } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useEffect, useState } from 'react'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../pages/Calndario.css";
import { config } from '../env'
import { Layout } from '../components/layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { IonModal } from '@ionic/react'
import { AgregarCitaModal } from '../components/modals/AgregarCitaModal'
import { sanitizeFecha } from '../utils/sanitizeFecha'
import { sanitizeHour } from '../utils/sanitizeHour'
import { useParams } from 'react-router'

const DnDCalendar = withDragAndDrop(Calendar);

const locales = {
    'en-US': enUs,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

const myEventsList = [{
    start: new Date(),
    end: addMinutes(new Date(), 30),
    title: 'probando'
}]

const sanitizeCitas = (citas) => citas.map(cita => ({
    ...cita,
    start: new Date(`${cita.fecha_inicio.split('T')[0]}T${cita.hora_inicio}`),
    end: new Date(`${cita.fecha_inicio.split('T')[0]}T${cita.hora_fin}`),
    title: cita.asunto
}))

export const CalendarioSemana = () => {

    const params = useParams()
    const [events, setEvents] = useState(myEventsList)
    const [fecha, setFecha] = useState(new Date().toISOString())
    const [horas, setHoras] = useState({ fecha: new Date(), hora1: null, hora2: null })
    const [showModal, setShowModal] = useState(false)
    const [selectedCita, setSelectedCita] = useState(null)
    const [consultorio, setConsultorio] = useState(params.consultorio || 1)

    useEffect(() => {
        getCitas()
        console.log(events);
    }, [fecha, consultorio])

    const handleSelectSlot = (data) => {
        setHoras({
            fecha: data.start,
            hora1: sanitizeHour(data.start),
            hora2: sanitizeHour(data.end)
        })
        setShowModal(true)
    };

    const onEventResize = (data) => {
        const { start, end } = data;
        const rescheduled = {
            fecha_inicio: sanitizeFecha(start),
            hora_inicio: sanitizeHour(start),
            fecha_fin: sanitizeFecha(end),
            hora_fin: sanitizeHour(end)
        }

        ActualizarCita({
            ...data.event,
            ...rescheduled,
            id: data.event.id_citas
        });
    };

    const onEventDrop = (data) => {
        const { start, end } = data;
        const rescheduled = {
            fecha_inicio: sanitizeFecha(start),
            hora_inicio: sanitizeHour(start),
            fecha_fin: sanitizeFecha(end),
            hora_fin: sanitizeHour(end)
        }
        ActualizarCita({
            ...data.event,
            ...rescheduled,
            id: data.event.id_citas
        });
    };

    const handleSelect = (data) => {
        setSelectedCita(data)
        setShowModal(true)
    };

    const ActualizarCita = async (cita) => {
        try {
            const { data } = await axios.put(`${config.baseUrl}/api/citas`, cita);
            setShowModal(false)
            const tempEvents = events.map(event => {
                if (event.id_citas === cita.id) {
                    return {
                        ...cita,
                        start: new Date(`${cita.fecha_inicio.split('T')[0]}T${cita.hora_inicio}`),
                        end: new Date(`${cita.fecha_inicio.split('T')[0]}T${cita.hora_fin}`),
                        title: cita.asunto,
                        id_citas: cita.id
                    }
                } else {
                    return event
                }
            })
            setEvents(tempEvents)
            toast.success(data.msg)
        } catch (error) {
            toast.error('error al actualizar cita')
            console.log(error);
        }
    }

    const getCitas = async () => {
        try {
            const { data } = await axios.get(`${config.baseUrl}/api/citas?fromDate=${fecha}&toDate=${fecha}&consultorio=${consultorio}&range=month`);
            setEvents(sanitizeCitas(data.results))
        } catch (error) {
            console.log(error);
            toast.error('error al obtener citas')
        }
    }

    const handleConsultorioChange = (e) => {
        setConsultorio(e.target.value);
    }

    return (
        <Layout>

            <IonModal
                isOpen={showModal}
                cssClass='my-custom-class'
                swipeToClose={true}
                animated
                onDidDismiss={() => {
                    setShowModal(false)
                    setSelectedCita(null)
                }}>

                <AgregarCitaModal
                    fecha={horas.fecha}
                    hora={horas.hora1}
                    hora2={horas.hora2}
                    consultorio={1}
                    setShowModal={setShowModal}
                    selectedCita={selectedCita}
                    setSelectedCita={setSelectedCita}
                />
            </IonModal>

            <div className='contenedorCalndario'>

                <div>
                    <label htmlFor="consultorio">Consultorio: </label>
                    <select
                        name="colsultorio"
                        id="consultorio"
                        onChange={handleConsultorioChange}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>

                <DnDCalendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    defaultView="week"
                    onSelectSlot={handleSelectSlot}
                    onEventDrop={onEventDrop}
                    onEventResize={onEventResize}
                    onSelectEvent={handleSelect}
                    selectable
                    resizable
                    style={{
                        height: '70vh',
                        margin: 'auto',
                        width: '100%',
                        zIndex: 999999
                    }}
                />
            </div>
        </Layout>
    )
}