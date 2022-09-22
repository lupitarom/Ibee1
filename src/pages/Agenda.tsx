import { IonContent, IonDatetime, IonHeader, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import consultorio from './../assets/img/consultorioRosa.svg'
import './Agenda.css'
import flecha from './../assets/img/arrow-derecha.png'
import plus from './../assets/img/plus-circle.svg'
import editar from './../assets/img/editar.png'
import { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { sanitizeFecha } from '../calendar/utils/sanitizeFecha';
import { config } from '../env';
import { IonModal } from '@ionic/react'
import {TwitterPicker,BlockPicker} from 'react-color'
import axios from 'axios';
import { toast } from 'react-hot-toast';


const Agenda: React.FC = () => {
    
    const pacientesStorage = localStorage.getItem('agenda')
    const [fecha, setFecha] = useState(sanitizeFecha(new Date()));
    const [consultorios, setConsultorios] = useState<any[]>([])
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString())
    const [numeroCitas, setNumeroCitas] = useState(0);
    const [clima, setClima] = useState<any>(null);
    const [showModal, setShowModal] = useState(true)
    const [precioDolar, setPrecioDolar] = useState<any>(null)

    const getNumeroCitas = async() => {
        try {
            const {data} = await axios.get(`${config.baseUrl}/api/citas/n?fromDate=${fecha}`);
            setConsultorios(data.consultorios)
            setNumeroCitas(data.totalCitas)
        } catch (error) {
            console.log( error );
        }
    }
    
    const getFecha = () => {
        console.log(fecha.toLocaleString());
        var diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
        var año = fecha.toLocaleString().substr(0, 4);
        var mes = fecha.toLocaleString().substr(5, 2);
        var dia = fecha.toLocaleString().substr(8, 2);
        var f = new Date(mes + ' ' + dia + ' ' + año);
        return diasSemana[f.getDay()];
    }
    const citas = () => {
        let text;
        if (numeroCitas == 0) {
            text = 'Sin citas para el dia de hoy';
        } else {
            text = 'Total de citas para el dia de hoy ' + numeroCitas;
        }
        return text;
    }

    // ejecuta funciones cuando cambia la fecha
    useEffect(() => {
        getNumeroCitas()
        getClima()
        getPrecioDolar()
    }, [fecha])
    // ejecuta funciones cuando se recarga la pagina o se entra
    useEffect(() => {
        
    }, [])

    const getClima = async(city='iguala') =>{
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.openweathermapAppid}&lang=es`);
        const data = await res.json();
        setClima( data )
    }

    const [values] = useState({
		nom_consultorio: 'Consultorio',
	})

    const crear = async () => {

		try {
			const {data} = await axios.post(
				`${config.baseUrl}/api/paciente`,
				values
			)
		} catch (error) {
			console.log(error)
			toast.success('Se agrego nuevo consultorio')
		}
	}

    const getPrecioDolar = async() =>{
        try {
            const {data} = await axios.get(`https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF63528/datos/2021-12-28/2021-12-28?token=${config.banxicoApiToken}&mediaType=json`)
            setPrecioDolar( Number( data.bmx.series[0].datos[0].dato ).toFixed(2) )
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <IonPage>
            <IonContent fullscreen>
                <Layout>
                    <div className="miAgenda">
                        <div className="contenido">
                            <div className="head">
                                <h1>Mi Agenda</h1>
                                <a  className="agregar" onClick={crear} href="/agenda">
                                    <button >
                                        <img src={plus} alt="" />
                                    </button>
                                    <p>Agregar</p>
                                </a>
                            </div>
                            <div className="informe">
                                <div className="dia">
                                    <p>{getFecha()}</p>
                                </div>
                                <div className="noticia">
                                    <IonItem>
                                        <p>{fecha.toLocaleString().substr(8, 2)}</p>
                                        <p className="">{citas()}</p>
                                        <p className="cambiar"><img src={editar} alt="" /></p>
                                        <IonDatetime displayFormat="DDDD MMM YYYY" placeholder="" value={fecha} onIonChange={e => setFecha(e.detail.value!)}></IonDatetime>
                                    </IonItem>
                            
                                    <div>
                                        {
                                            clima && (
                                                <div className="clima-container">
                                                    <div className="clima-info">
                                                        Clima: <strong>{ (clima.main.temp - 273.15).toFixed(2) } Cº</strong>
                                                        <span>
                                                            - { clima.weather[0].description }
                                                        </span>
                                                    </div>
                                                    <img 
                                                        src={`https://openweathermap.org/img/wn/${clima.weather[0].icon}@2x.png`}
                                                        className="img-clima" 
                                                        alt="clima" />
                                                </div>
                                            )
                                        }
                                        {
                                            precioDolar && (
                                                <div>
                                                    <span>precio del dolar 💵 <strong>{ precioDolar }</strong> MXN</span>
                                                </div>
                                            )
                                        }
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="bloque">

                                {
                                    consultorios.map(c => (
                                        <a href={`/calendarioSemana/${c.id_consultorio}`}>
                                            <div className="consultorio">
                                                <img src={consultorio} alt="" />
                                                <p>Consultorio {c.id_consultorio}</p>
                                                <div className="contador">
                                                    {c.nCitas}
                                                </div>
                                                <img src={flecha} alt="" />
                                            </div>
                                        </a>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </Layout>
            </IonContent>
        </IonPage>
    );
};

export default Agenda;