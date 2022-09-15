import { IonContent, IonHeader, IonPage, IonTitle, IonToast, IonToolbar, useIonRouter } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Login.css';
import img from '../assets/img/login.svg';
import imgSombra from '../assets/img/sombra.png';
import { useEffect, useState } from 'react';
import { config } from '../env';
import gif from '../assets/img/ibee-inicio.gif'
import { useHistory } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';
import { IonModal } from '@ionic/react';
import { Registrar } from '../components/modals/Registrar';
const Login: React.FC = () => {

  const[showModal,setShowModal]=useState(false)
  const [values, setValues] = useState({
    user: '',
    password: ''
  });

  const history = useHistory()

  const [showToast, setShowToast] = useState(false)
  const [showLogo, setShowLogo] = useState(true)

  useEffect(()=>{
    setTimeout(()=>{
      setShowLogo( false )
    },1500) 
  },[])

  const postLogin = async () => {
    const { user, password } = values;
    
    try {
      console.log('se envio la peticion');
      
      const {data} = await axios.post(`${config.baseUrl}/api/login`,{
        user,
        password
      });

      console.log('termino la peticion');
      console.log( data );
      console.log( data.usuario.imagen );
      
      localStorage.setItem('token', data.token)
      localStorage.setItem('usuario', JSON.stringify(data.usuario))

      history.push('/agenda')

    } catch (error:any) {
      console.log({error});
      if(error.response?.data){
        return toast.error( error.response.data.msg )
      }
      toast.error('Error haciendo login')
    }
  }

  const handleChange = (e: any) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const handleClick = (e: any) => {
    e.preventDefault();
    postLogin();
  }

  return (
    <IonPage>
      <IonContent fullscreen>
      <IonModal
					isOpen={showModal}
					cssClass="my-custom-class"
					swipeToClose={true}
					animated
					onDidDismiss={() => {
						setShowModal(false)
					}}
				>
					<Registrar 
            setShowModal={setShowModal}
          />
				</IonModal>

      {
        showLogo ? 
        <div className="contenedorGif">
          <img src={gif}/>
        </div>
        :
        <div className="contenedorLoagin">
 
          <div className="contenidoL">

            <img className="logo" src={img} alt="logo" />
            <img src={imgSombra} className="sombra" alt="sombra" />
            <form className="form_login">

              <input  
                type="text" 
                id="user" 
                placeholder="Usuario"
                name="user"
                value={ values.user } 
                onChange={handleChange} 
                />

              <input 
                type="password" 
                id="password" 
                placeholder="Contraseña"
                name="password" 
                value={ values.password }
                onChange={handleChange} 
                />

              <button onClick={handleClick} >Ingresar</button>
              <div><p >¿No tienes una cuenta? <a onClick={ ()=> setShowModal(true) }>Registrate</a></p></div>
            </form>


            <IonToast
              isOpen={showToast}
              onDidDismiss={() => setShowToast(false)}
              message="usuario y/o contraseña incorrectos"
              duration={1000}
            />

          </div>
        </div>
      }
        
      </IonContent>
    </IonPage>
  );
};

export default Login;
