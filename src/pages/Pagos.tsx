import React, { useEffect, useState } from 'react'
import { Layout } from '../components/layout/Layout'
import foto from './../assets/img/woman-gfec6923be_640.jpg'
import './Pagos.css'
import lupita from './../assets/img/Lupa.svg'
import { config } from '../env'
import { useParams } from 'react-router'
import { HistorialPagos } from '../components/pagos/HistorialPagos'
import axios from 'axios'
import { IonButton, IonCol, IonGrid, IonInput, IonItem, IonItemDivider, IonList, IonModal, IonRow } from '@ionic/react'

export const Pagos = () => {

    const [paciente, setPaciente] = useState<any>({
        nombre: '',
        ap_materno: '',
        ap_paterno: '',
        edad: '',
        rfc: '',
        url: '',
        estatus: '',
        calle: '',
        ciudad: '',
        colonia: '',
        estado: '',
        numero: '',
        telefono: '',
        tutor: ''
    })
    const [historialPagos, setHistorialPagos] = useState<any>([]);
    const [showModal, setShowModal] = useState(false)
    const [text, setText] = useState('')
    const params: any = useParams();

    useEffect(() => {
        getPaciente()
        getHistorialPagos()
    }, [])

    const getPaciente = async () => {
        try {
            const res = await fetch(`${config.baseUrl}/api/pacienteParaPago/${params.pacienteId}`)
            const data = await res.json()
            setPaciente({ ...data.paciente, ...data.telefono, tutor: data.tutor });
        } catch (error) {
            console.log(error);
        }
    }

    const getHistorialPagos = async () => {
        try {
            const res = await fetch(`${config.baseUrl}/api/historialPagos/${params.pacienteId}`)
            const data = await res.json()
            console.log(data.historialPagos)
            setHistorialPagos(data.historialPagos);
        } catch (error) {
            console.log(error);
        }
    }

    const postHistorialPagos = async () => {
        try {
            await axios.post(`${config.baseUrl}/api/historialPagos/${params.pacienteId}`, {
                titulo: 'nuevo',
                fecha_inicio: new Date().toISOString().split('T')[0]
            });
            getHistorialPagos()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>

            <div className="contenedorPagos">
                <div className="infoPersonal">
                    <div className="imagen">
                        <img src={`${config.baseUrlImagenes}/${paciente.url}`} alt="paciente" />
                    </div>

                    <div className="datos">

                        <p className="nombre"><label><b>Nombre:</b></label> <label>{paciente.nombre} {paciente.ap_paterno} {paciente.ap_materno}</label></p>
                        <p><label><b>Edad: </b></label><label>{paciente.edad}</label></p>
                        <p><label><b>RFC:</b> </label><label> {paciente.rfc} </label></p>
                        <p><label><b>Direccion:</b></label><label>{paciente.estado}, {paciente.ciudad}, {paciente.colonia}, {paciente.calle}, {paciente.numero}</label></p>
                        <p><label><b>Telefono:</b></label><label>{paciente.telefono}</label></p>
                        <p><label><b>Tutor:</b></label><label>{paciente.tutor?.nombre}</label></p>
                        <p className="nombre"><label><b>Nombre:</b> </label> <label>{paciente.nombre} {paciente.ap_paterno} {paciente.ap_materno}</label></p>
                        <p><label><b>Edad: </b> </label><label>{paciente.edad}</label></p>
                        <p><label><b>RFC:</b>  </label><label> {paciente.rfc} </label></p>
                        <p><label><b>Direccion:</b> </label><label>{paciente.estado}, {paciente.ciudad}, {paciente.colonia}, {paciente.calle}, {paciente.numero}</label></p>
                        <p><label><b>Telefono:</b> </label><label>{paciente.telefono}</label></p>
                        <p><label><b>Tutor:</b> </label><label>{paciente.tutor?.nombre}</label></p>

                    </div>
                </div>

                <div className="infoEconomica">

                    <div className="datosMovil">

                        <p className="nombre"><label><b>Nombre:</b></label> <label>{paciente.nombre} {paciente.ap_paterno} {paciente.ap_materno}</label></p>
                        <p><label><b>Edad:</b> </label><label>{paciente.edad}</label></p>
                        <p><label><b>RFC:</b> </label><label> {paciente.rfc} </label></p>
                        <p><label><b>Direccion:</b></label><label>{paciente.estado}, {paciente.ciudad}, {paciente.colonia}, {paciente.calle}, {paciente.numero}</label></p>
                        <p><label><b>Telefono:</b></label><label>{paciente.telefono}</label></p>
                        <p><label><b>Tutor:</b></label><label>{paciente.tutor?.nombre}</label></p>
                        <p className="nombre"><label><b>Nombre:</b> </label> <label>{paciente.nombre} {paciente.ap_paterno} {paciente.ap_materno}</label></p>
                        <p><label><b>Edad:</b>  </label><label>{paciente.edad}</label></p>
                        <p><label><b>RFC:</b>  </label><label> {paciente.rfc} </label></p>
                        <p><label><b>Direccion:</b> </label><label>{paciente.estado}, {paciente.ciudad}, {paciente.colonia}, {paciente.calle}, {paciente.numero}</label></p>
                        <p><label><b>Telefono:</b> </label><label>{paciente.telefono}</label></p>
                        <p><label><b>Tutor:</b> </label><label>{paciente.tutor?.nombre}</label></p>

                    </div>
                    <div className="menu">
                        <button onClick={postHistorialPagos}>+</button>
                        <input className='buscar' type="text" />
                        <button><img src={lupita} alt="paciente" /></button>
                    </div>
                    {
                        historialPagos.map((historial: any) => (
                            <HistorialPagos
                                key={historial.id_historial_pagos_rehabilitacion}
                                historial={historial}
                                setShowModal={setShowModal}
                                getHistorialPagos={getHistorialPagos}
                            />
                        ))
                    }
                </div>

                <IonModal isOpen={showModal} cssClass='my-custom-class'>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="12">ion-col</IonCol>
                            <IonCol size="6">
                                <IonButton onClick={() => {
                                    console.log('aceptar')
                                    setShowModal(false)
                                }}>Aceptar</IonButton>
                            </IonCol>
                            <IonCol size="6">
                                <IonButton onClick={() => setShowModal(false)}>Cancelar</IonButton>
                            </IonCol>
                            <IonList>
                                <IonItemDivider>Default Input with Placeholder</IonItemDivider>
                                <IonItem>
                                    <IonInput value={text} placeholder="Enter Input" onIonChange={e => setText(e.detail.value!)}></IonInput>
                                </IonItem>
                            </IonList>
                        </IonRow>
                    </IonGrid>
                </IonModal>
            </div>
        </Layout>
    )
}
