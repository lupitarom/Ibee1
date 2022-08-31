import React from 'react'
import flecha from './../../assets/img/arrow-derecha.png'
import userImage from '../../assets/img/woman-gfec6923be_640.jpg';
import './listaP.css'
import { config } from '../../env';

export const ListaPacientes = ({
  pacientes = [],
  handlePacienteClick = (pacienteId: any) => {}
}, props: any) => {
  return (
    <div className="listaPT">

      {
        pacientes.map((paciente: any) => (
          <div className="contenidoPaciente" key={paciente.id_paciente}>
            
            <div className="foto"style={{backgroundImage: `url(${config.baseUrlImagenes}/${paciente.url})`}}>
              {/* <img src={`${config.baseUrlImagenes}/${paciente.url}`} alt="paciente" /> */}
            </div>

            <div className="nombre">
              <a onClick={() => handlePacienteClick(paciente)} className="flecha">
                <div className="nombreText" >
                  <p>{paciente.nombre} {paciente.ap_paterno} {paciente.ap_materno}</p>

                  <img src={flecha} className="flecha" alt="" />
                </div>
              </a>
            </div>

          </div> 
        ))
      }
    </div>
  )
}

