import { IonButton, IonContent, IonHeader, IonModal, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import fotoPaciente from '../assets/img/user-circle-solid.svg'
import { useEffect, useState } from 'react';
import { ListaPacientes } from '../components/pacientes/ListaPacientes';
import { Layout } from '../components/layout/Layout';
import './Paciente.css';
import { useParams } from 'react-router';
import iconTratamiento from '../assets/img/tratamientos realizados.svg'
import iconEstados from '../assets/img/estado de cuenta_.svg'
import iconEstudios from '../assets/img/Odontograma de evoluciónsvg.svg'
import iconPersonal from '../assets/img/pacientes.svg'
import iconArrow from './../assets/img/arrow-derecha.png'
import historia from './../assets/img/historial.svg'
import edit from './../assets/img/editar.svg'
import { config } from '../env'
import toast from 'react-hot-toast';
import axios from 'axios';
import {PencilIcon} from '@primer/octicons-react';
import { EditarPacienteModal } from '../components/modals/EditarPacienteModal';

const Paciente: React.FC = () => {

    const params: any = useParams()
    let pacienteInicio: any = null
    let dfInicio: any = null
    const [paciente, setPaciente] = useState(pacienteInicio)
    const [showModal, setShowModal] = useState(false)
    const [df,setdf]=useState()

    useEffect(() => {
        buscarPaciente()
    }, [params])

    const buscarPaciente = async () => {
        try {
            const { data } = await axios.get(`${config.baseUrl}/api/paciente/${params.id}`)
            console.log(data);
            setPaciente(data.paciente)
        } catch (error) {
            console.log({ error });
            toast.error('error obteniendo paciente')
        }
    }

<<<<<<< HEAD
=======

>>>>>>> de9365bf7023c82a238b497cd3abc2c00105fca9
    return (
        <IonPage>
            <IonContent fullscreen>
                <Layout>
                    <IonModal
                        isOpen={showModal}
                        cssClass='my-custom-class'
                        swipeToClose={true}
                        animated
                        onDidDismiss={() => {
                            setShowModal(false)
                        }}>
                            <EditarPacienteModal 
                                paciente={ paciente }
                                df={df}
                                setPaciente={ setPaciente }
                                setShowModal={ setShowModal }
                            />
                    </IonModal>
                    {
                        paciente && (
                            <div className="contedorPaciente">

                                <div className="img" style={{ backgroundImage: `url(${config.baseUrlImagenes}/${paciente.url})` }}>
                                <div className='editar' onClick={()=>setShowModal(true)}><button><PencilIcon size={30} /></button></div>
                                </div>
                                <p>{paciente.nombre} {paciente.ap_paterno} {paciente.ap_materno}

                                    
                                </p>
                                <a href="">
                                    <div><img src={iconTratamiento} alt="" />
                                        <p>Mis Tratamientos</p></div>
                                    <img className="flecha" src={iconArrow} alt="" />
                                </a>
                                <a href="">
                                    <div><img src={iconPersonal} alt="" />
                                        <p>Información Personal</p></div>
                                    <img className="flecha" src={iconArrow} alt="" />
                                </a>
                                <a href={`/pagos/${params.id}`}>
                                    <div><img src={iconEstados} alt="estados de cuenta" />
                                        <p>Estados de Cuenta</p></div>
                                    <img className="flecha" src={iconArrow} alt="" />
                                </a>
                                <a href="">
                                    <div><img src={iconEstudios} alt="" />
                                        <p>Mis Estudios</p></div>
                                    <img className="flecha" src={iconArrow} alt="" />
                                </a>
                                <a href={`/historiaclinica/${params.id}`}>
                                    <div><img src={historia} alt="" />
                                        <p>Historia Clinica</p></div>
                                    <img className="flecha" src={iconArrow} alt="" />
                                </a>
                            </div>
                        )
                    }
                </Layout>
            </IonContent>
        </IonPage>
    );
};

export default Paciente;
