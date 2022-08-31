import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Nueva from './pages/Nueva';
import Login from './pages/Login';
import Agenda from './pages/Agenda';
import AgregarCitas from './pages/AgregarCita';
import Paciente from './pages/Paciente';
import PacientesPrincipal from './pages/PacientesPrincipal';
import { Day } from './calendar/Day';
import { Cita } from './pages/Cita';
import { DayPrueba } from './calendar/DayPrueba';
import { EstadoCuenta } from './pages/EstadoCuenta';
import Schedule from './components/schedule-component/Schedule';
import { Citas } from './pages/Citas';
import { CustomAgenda } from './components/customAgenda/CustomAgenda';
import { Agendax } from './pages/Agendax';
import { Semanas } from './pages/Semanas';
import { HistoriaClinica } from './pages/HistoriaClinica';
import { FichaIndentificacion } from './pages/FichaIndentificacion';
import { AntecedentesPatologicos } from './pages/AntecedentesPatologicos';
import { ExploracionCabezaCuello } from './pages/ExploracionCabezaCuello';
import { AntecedentesPersonalesPatologicos } from './pages/AntecedentesPersonalesPatologicos';
import { InterrogatorioAparatosSistemas } from './pages/InterrogatorioAparatosSistemas';
import { AntecedentesPersonalesNoP } from './pages/AntecedentesPersonalesNoP';
import { Slides } from './pages/Slides';
import { Tabs } from './components/layout/Tabs';
import { Pagos } from './pages/Pagos';
import { CalendarioSemana } from './pages/CelndarioSemana';
import { Toaster } from 'react-hot-toast'
import { PrivateRoute } from './routes/PrivateRoute';
import { Mas } from './pages/Mas';

const App: React.FC = () => (
  <IonApp>
    <div><Toaster /></div>
    <IonReactRouter>
      <IonRouterOutlet>

        <Route exact path="/home">
          <Paciente />
        </Route>

        <Route exact path="/nueva">
          <Nueva />
        </Route>

        <PrivateRoute
          exact
          path="/calendarioSemana/:consultorio"
          component={CalendarioSemana}
        />

        <Route exact path="/login">
          <Login />
        </Route>

        <PrivateRoute
          exact
          path="/"
          component={Agenda}
        />

        <PrivateRoute
          exact
          path="/agenda"
          component={Agenda}
        />

        <Route exact path="/aparatos">
          {/* <IterrogatorioPorAparatosYSistemas /> */}
        </Route>

        <PrivateRoute
          exact
          path="/agendax/:fecha/:consultorio"
          component={Agendax}
        />

        <PrivateRoute
          exact
          path="/agregarcitas/:hora/:hora2/:fecha/:consultorio"
          component={AgregarCitas}
        />

        <PrivateRoute
          exact
          path="/paciente/:id"
          component={Paciente}
        />

        <PrivateRoute
          exact
          path="/citas/:consultorio/:fecha"
          component={Cita}
        />

        <PrivateRoute
          exact
          path="/pacientesprincipal"
          component={PacientesPrincipal}
        />

        <PrivateRoute
          exact
          path="/estadocuenta"
          component={EstadoCuenta}
        />

        <PrivateRoute
          exact
          path="/semanas"
          component={Semanas}
        />

        <PrivateRoute
          exact
          path="/historiaclinica/:pacienteId/:page"
          component={Slides}
        />

        <PrivateRoute
          exact
          path="/historiaclinica/:pacienteId"
          component={HistoriaClinica}
        />

        <PrivateRoute
          exact
          path="/slides"
          component={Slides}
        />

        <PrivateRoute
          exact
          path="/fichaidentificacion/:pacienteId"
          component={FichaIndentificacion}
        />

        <PrivateRoute
          exact
          path="/antecedentespatologicos"
          component={AntecedentesPatologicos}
        />

        <PrivateRoute
          exact
          path="/exploracioncabezacuello"
          component={ExploracionCabezaCuello}
        />

        <PrivateRoute
          exact
          path="/antecedentespersonalespatologicos"
          component={AntecedentesPersonalesPatologicos}
        />

        <PrivateRoute
          exact
          path="/interrogatorioaparatossistemas"
          component={InterrogatorioAparatosSistemas}
        />

        <PrivateRoute
          exact
          path="/antecedentespersonalesnopatologicos"
          component={AntecedentesPersonalesNoP}
        />

        <PrivateRoute
          exact
          path="/pagos/:pacienteId"
          component={Pagos}
        />

        <PrivateRoute
          exact
          path="/mas"
          component={Mas}
        />

      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
