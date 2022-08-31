import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './AgregarCita.css'
import guardar from '../assets/img/save-solid.svg'
import lupa from './../assets/img/search-solid.svg'
import { ListaPacientes } from '../components/pacientes/ListaPacientes';
import { Layout } from '../components/layout/Layout';
import { config } from '../env';
import { useHistory, useParams } from 'react-router';
import { useEffect, useState } from 'react';

const AgregarCitas: React.FC = () => {

  const [pacientes, setPacientes] = useState([]);
  const params: any = useParams();
  const history = useHistory();
  const [visita, setVisita] = useState(false);
  const [infoCita, setInfoCita] = useState({
    paciente_id_paciente: '1',
    fecha_inicio: '2021-10-08',
    hora_inicio: params.hora,
    fecha_fin: '2021-10-08',
    hora_fin: params.hora2,
    nombre_c: '',
    ap_paterno_c: '',
    ap_materno_c: '',
    asunto: '',
    estatus: 'a',
    medico: '1',
    consultorio: params.consultorio
  });
  const [paciente, setPaciente] = useState({
    id: '',
    nombre: '',
    asunto: '',
    consultorio: ''
  });

  const [termino, setTermino] = useState('');

  useEffect(() => {
    buscarPacientes();
    //getCitas()
  }, [])

  const buscarPacientes = () => {
    fetch(`${config.baseUrl}/api/pacientes/${termino}`, {
      method: 'GET',
      redirect: 'follow'
    })
      .then(response => response.json())
      .then(({ results }) => {
        setPacientes(results)
      })
      .catch(error => console.log('error', error));
  }

  const buscar = (e: any) => {
    e.preventDefault();
    buscarPacientes()
  }

  const postCita = (e: any) => {
    e.preventDefault();
    const fecha = new Date().toISOString()
    console.log(fecha);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(infoCita);
    fetch(`${config.baseUrl}/api/citas`,{
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    })
    .then(response => response.json())
    .then(result => history.push(`/agendax/${params.fecha}/${params.consultorio}`))
    .catch(error => console.log('error', error));

  }
  const handlePacienteClick = (paciente: any): void => {
    setPaciente({
      ...paciente,
      id: paciente.id_paciente,
      nombre: `${paciente.nombre} ${paciente.ap_paterno} ${paciente.ap_materno}`
    })
    setInfoCita({
      ...infoCita,
      paciente_id_paciente: paciente.id_paciente,
      nombre_c: paciente.nombre,
      fecha_inicio: params.fecha,
      hora_inicio: params.hora,
      fecha_fin: params.fecha,
      hora_fin: params.hora2,
      ap_paterno_c: paciente.ap_paterno,
      ap_materno_c: paciente.ap_materno,
      estatus: 'a',
      medico: '1',
      consultorio: params.consultorio
    })
    setPacientes([])
  }

  return (
    <>
      <>
        <>
          <head>
          <link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.min.css" rel="stylesheet"></link>
          </head>
        
          <div className="contenedorPacientes">

            <div className="contenido">
              <div className="contenidoFecha">
                <div>
                  <p>Fecha de la cita</p>
                  <p className="fecha">{params.fecha} de {params.hora} a {params.hora2}</p>
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
                          placeholder="Asusto"
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
                          onClick={postCita}
                        >
                          <img src={guardar} alt="" />
                        </button>
                      </form>
                    </div>
                  </>
                ) : (
                  <>
                    <form className="busqueda">
                      <button
                        type="button"
                        onClick={buscar}
                      >
                        <img src={lupa} alt="" />
                      </button>
                      <input type="text" placeholder="Buscar" name="buscar" value={termino}
                        onInput={(e:any) => {
                          setTermino(e.target.value)
                        }}
                        onKeyUp={(e)=> buscar(e)}
                      />
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
                        <button className="btnGuardad"
                          onClick={postCita}
                        >
                          <img src={guardar} alt="" />
                        </button>
                      </form>
                    </div>

                  </>
                )
              }

            </div>
          </div>
        </>
      </>
    </>
  );
};

export default AgregarCitas;
