import { IonSlide, IonSlides } from '@ionic/react';
import React from 'react'
import { useHistory, useParams } from 'react-router';
import { Layout } from '../components/layout/Layout'
import { AntecedentesPatologicos } from './AntecedentesPatologicos';
import { AntecedentesPersonalesNoP } from './AntecedentesPersonalesNoP';
import { AntecedentesPersonalesPatologicos } from './AntecedentesPersonalesPatologicos';
import { ExploracionCabezaCuello } from './ExploracionCabezaCuello';
import { FichaIndentificacion } from './FichaIndentificacion';
import './HistoriaClinica.css'
import { InterrogatorioAparatosSistemas } from './InterrogatorioAparatosSistemas';

export const Slides = () => {

    const params = useParams();
    const history = useHistory();

    console.log( params );
    const slideOpts = {
        initialSlide: params.page, // params.page,
        speed: 500
    };

    return (
        <Layout>
            <IonSlides 
                pager={true} 
                options={ slideOpts}
                >
                    
                <IonSlide>
                    <FichaIndentificacion />
                </IonSlide>
                <IonSlide>
                    <AntecedentesPersonalesPatologicos />
                </IonSlide>
                <IonSlide>
                    <AntecedentesPatologicos />
                </IonSlide>
                <IonSlide>
                    <AntecedentesPersonalesNoP />
                </IonSlide>
                <IonSlide>
                    <ExploracionCabezaCuello />
                </IonSlide>
                <IonSlide>
                    <InterrogatorioAparatosSistemas />
                </IonSlide>
            </IonSlides>
        </Layout>
    )
}
