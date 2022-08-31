import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Nueva: React.FC = () => {
    const [counter, setCounter] = useState(0);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ibee</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">No lo se</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
        <div>contador: {counter}</div>

        <IonButton 
            onClick={()=> setCounter( counter +1 )}
            color="primary">+</IonButton>
        <IonButton 
            onClick={()=> setCounter( counter -1 )}
            color="secondary">-</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Nueva;
