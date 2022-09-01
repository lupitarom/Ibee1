import React from 'react'
import imgAgenda from '../../assets/img/agenda.svg'
import imgPacientes from '../../assets/img/pacientes.svg'
import imgHistoria from '../../assets/img/historial 2.svg'
import imgMas from '../../assets/img/más.svg'
import prueba from '../../assets/img/Odontograma de evoluciónsvg.svg'
import { useLocation } from 'react-router'

export const Footer = () => {
    const location = useLocation();
    const {pathname} = location;
    
    return (

        <div className="bar">
            <a className={`${ pathname.includes('agenda') && 'marcaIcono'}`} href="/agenda">
                <img src={imgAgenda} alt="IconAgenda"/><p>Agenda</p>
            </a>
            <a className={`${ pathname.includes('pacientesprincipal') && 'marcaIcono'}`} href="/pacientesprincipal">
                <img src={imgPacientes} alt="IconPaciente" /><p>Pacientes</p>
            </a>
            <a className={`${ pathname.includes('HistoriaClinica') && 'marcaIcono'}`} href="/HistoriaClinica/3">
                <img src={imgHistoria} alt="IconHistorial" /><p>Historial</p>
                </a>
            <a className={`${ pathname.includes('mas') && 'marcaIcono'}`} href="/mas">
                <img src={imgMas} alt="IconMas" /><p>Más</p>
            </a>
        </div>
    )
}
