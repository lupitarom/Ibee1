import { IonButton, useIonRouter } from '@ionic/react';
import './ExploreContainer.css';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  const router = useIonRouter();
  
  return (
    <div className="container">
      <strong>Hola mundo</strong>
      <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
      <div className="bg-red">
        <a href="/home">home</a>
        <a href="/nueva">nueva</a>
      </div>
      <img style={{
        width: '50%',
        height: '100px'
      }} src="https://images.unsplash.com/photo-1542995470-870e12e7e14f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80" alt="naruto" />
    </div>
  );
};

export default ExploreContainer;
