import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import guardar from '../../assets/img/save-solid.svg'
import lupa from '../../assets/img/search-solid.svg'
import { config } from '../../env'
import { sanitizeFecha } from '../../utils/sanitizeFecha'
import { sanitizeHour } from '../../utils/sanitizeHour'
import { ListaPacientes } from '../pacientes/ListaPacientes'

export const AgregarCitaModal = ({ fecha, hora, hora2, consultorio, setShowModal, selectedCita, setSelectedCita }) => {

    const [visita, setVisita] = useState(false)
    const [pacientes, setPacientes] = useState([])
    const [termino, setTermino] = useState('')

    const [infoCita, setInfoCita] = useState(selectedCita || {
        id: null,
        paciente_id_paciente: 1,
        fecha_inicio: sanitizeFecha(fecha),
        hora_inicio: hora,
        fecha_fin: sanitizeFecha(fecha),
        hora_fin: hora2,
        nombre_c: '',
        ap_paterno_c: '',
        ap_materno_c: '',
        asunto: '',
        estatus: 'a',
        medico: '1', // TODO
        consultorio: consultorio
    })

    const buscarPacientes = async () => {
        try {
            const { data } = await axios.get(`${config.baseUrl}/api/pacientes/${termino}`)
            setPacientes(data.results);
        } catch (error) {
            console.log(error);
        }
    }

    const handlePacienteClick = (paciente) => {
        setInfoCita({
            ...infoCita,
            paciente_id_paciente: paciente.id_paciente,
            nombre_c: paciente.nombre,
            ap_paterno_c: paciente.ap_paterno,
            ap_materno_c: paciente.ap_materno,
        })
        setPacientes([paciente])
    }

    const handleCambiarFechaHora = ({ target }) => {
        setInfoCita({
            ...infoCita,
            [`fecha_${target.name}`]: sanitizeFecha(target.value),
            [`hora_${target.name}`]: sanitizeHour(target.value)
        })
        console.log(infoCita);
    }

    const guardarCita = async (e) => {
        e.preventDefault()
        if (infoCita.id_citas) {
            try {
                const { data } = await axios.put(`${config.baseUrl}/api/citas`, {
                    ...infoCita,
                    fecha_inicio: sanitizeFecha(infoCita.fecha_inicio),
                    fecha_fin: sanitizeFecha(infoCita.fecha_fin),
                    id: infoCita.id_citas
                })
                setShowModal(false)
                toast.success(data.msg)
            } catch (error) {
                console.log(error);
                toast.error('error al actualizar cita')
            }
        } else {
            try {
                const { data } = await axios.post(`${config.baseUrl}/api/citas`, infoCita);
                setShowModal(false)
                toast.success(data.msg)
            } catch (error) {
                console.log(error);
                toast.error('error al guardar cita')
            }
        }
        setSelectedCita(null)
    }

    return (
        <div>
            <button className="boton-x" onClick={() => setShowModal(false)}>x</button>
            <div className="contenedorPacientes">

                <div className="contenido">
                    <div className='titulo'>
                        <h2>
                            Agendar Cita
                        </h2>
                    </div>
                    <div className="contenidoFecha">
                        <div>
                            <p>Fecha de la cita</p>
                            <p className="fecha">{new Date(fecha).toLocaleDateString()}</p>
                        </div>
                        <div className="btnPaciVicit">
                            <button
                                onClick={
                                    () => setVisita(false)
                                }
                            >
                                Paciente
                            </button>
                            <button
                                onClick={
                                    () => setVisita(true)
                                }
                            >
                                Visita
                            </button>
                        </div>
                    </div>
                    {
                        visita ? (
                            <>
                                <div className="nuevaCita">
                                    <form action="">
                                        <input
                                            type="text"
                                            placeholder="Nombre del Paciente"
                                            name="nombre"
                                            autoComplete="off"
                                            value={infoCita.nombre_c}
                                            onChange={(e) => setInfoCita({ ...infoCita, nombre_c: e.target.value })}
                                        />
                                        <input type="text"
                                            placeholder="Apellido Paterno"
                                            autoComplete="off"
                                            name="apellidoP"
                                            value={infoCita.ap_paterno_c}
                                            onChange={(e) => setInfoCita({ ...infoCita, ap_paterno_c: e.target.value })}
                                        />

                                        <input type="text"
                                            className="apM"
                                            autoComplete="off"
                                            placeholder="Apellido Materno"
                                            name="apellidoM"
                                            value={infoCita.ap_materno_c}
                                            onChange={(e) => setInfoCita({ ...infoCita, ap_materno_c: e.target.value })}
                                        />

                                        <input type="text"
                                            autoComplete="off"
                                            placeholder="Asunto"
                                            name="asunto"
                                            value={infoCita.asunto}
                                            onChange={(e) => setInfoCita({ ...infoCita, asunto: e.target.value })}
                                        />

                                        <input type="text"
                                            placeholder="Consultorio"
                                            name="consultorio"
                                            autoComplete="off"
                                            value={infoCita.consultorio}
                                            onChange={(e) => setInfoCita({ ...infoCita, consultorio: e.target.value })}
                                        />
                                        <button
                                            onClick={guardarCita}
                                        >
                                            <p>Guardar</p>
                                        </button>
                                        <button 
                                                className="btnCerrar"
                                                onClick={()=>setShowModal(false)}
                                            >
                                                {/* <img src={guardar} alt="" /> */}
                                                <p>Cerrar</p>
                                            </button>
                                    </form>
                                </div>
                            </>
                        ) : (
                            <>
                                <form className="busqueda">
                                    <input type="text" placeholder="Buscar" name="buscar" value={termino}
                                        onInput={(e) => {
                                            setTermino(e.target.value)
                                        }}
                                        onKeyUp={(e) => buscarPacientes(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                    >
                                        <img src={lupa} alt="" />
                                    </button>
                                </form>

                                <div className="listAgregarP">
                                    <ListaPacientes
                                        pacientes={pacientes}
                                        handlePacienteClick={handlePacienteClick}
                                    />
                                </div>

                                <div className="nuevaCita">
                                    <form action="">
                                        <input
                                            type="text"
                                            placeholder="Nombre del Paciente"
                                            name="nombre"
                                            autoComplete="off"
                                            readOnly
                                            value={infoCita.nombre_c}
                                            onChange={(e) => setInfoCita({ ...infoCita, nombre_c: e.target.value })}
                                        />
                                        <input type="text"
                                            placeholder="Asunto"
                                            autoComplete="off"
                                            name="asunto"
                                            value={infoCita.asunto}
                                            onChange={(e) => setInfoCita({ ...infoCita, asunto: e.target.value })}
                                        />

                                        <input type="text"
                                            placeholder="Consultorio"
                                            name="Consultorio"
                                            value={infoCita.consultorio}
                                            onChange={(e) => setInfoCita({ ...infoCita, consultorio: e.target.value })}
                                        />
                                        <div className='botones'>
                                            <button className="btnGuardad"
                                                onClick={guardarCita}
                                            >
                                                {/* <img src={guardar} alt="" /> */}
                                                <p>Guardar</p>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </>
                        )
                    }

                </div>
            </div>
        </div>
    )
}
