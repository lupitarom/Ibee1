import React from 'react'
import ibeeBlanco from '../../assets/img/ibee assistant logo.svg'
import userImage from '../../assets/img/woman-gfec6923be_640.jpg'
import imgAgenda from '../../assets/img/agenda B.svg'
import imgPacientes from '../../assets/img/pacientes B.svg'
import imgHistoria from '../../assets/img/historial.svg'
import imgMas from '../../assets/img/más.svg'
import { useLocation } from 'react-router'
export const Header = () => {

    const location = useLocation();
    const { pathname } = location;

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.reload()
    }

    return (
        <div className="headerPacientes">
            <a href="/home" className="centro">
                <img className="logo" src={ibeeBlanco} alt="logo" />
            </a>
            <div className="barHeader">
                <a className={`${pathname.includes('agenda') && 'marcaIcono'}`} href="/agenda">
                    <img src={imgAgenda} alt="IconAgenda" /><p>Agenda</p>
                </a>
                <a className={`${pathname.includes('pacientesprincipal') && 'marcaIcono'}`} href="/pacientesprincipal">
                    <img src={imgPacientes} alt="IconPaciente" /><p>Pacientes</p>
                </a>
                <a className={`${pathname.includes('historia') && 'marcaIcono'}`} href="/historiaclinica">
                    <img src={imgHistoria} alt="IconHistorial" /><p>Historial</p>
                </a>
                <a className={`${pathname.includes('mas') && 'marcaIcono'}`} href="/mas">
                    <div>
                        <img src={imgMas} alt="IconMas" /><p>Más</p>
                    </div>
                </a>
            </div>

            <div className="usuario">
                <button
                    onClick={logout}
                >salir</button>
            </div>
        </div>
    )
}