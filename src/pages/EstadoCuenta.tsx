import React from 'react'
import { IonContent, IonPage } from '@ionic/react';
import { Layout } from '../components/layout/Layout';
import './EstadoCuenta.css'
import iconMoneda from './../assets/img/money.svg'
import foto from './../assets/img/woman-gfec6923be_640.jpg';
import iconArrow from './../assets/img/arrow-derecha.png'
import iconAbonos from './../assets/img/moneyEC.png'
import iconAd from './../assets/img/moneyAd.png'
import iconSaldo from './../assets/img/messageMoney.png'

export const EstadoCuenta = () => {
    return (
        <IonPage>
            <IonContent>
                <Layout>
                    <div className="estadoCuenta">
                        <div className="contenido">
                            <p><img src={foto} alt="" />Angel Mastache Roman</p>
                            <h1>Estado de Cuenta</h1>
                            <div className="contenedorTotal">
                                <div>
                                    <img src={iconMoneda} alt="" />
                                    <p>$5,000</p>
                                    <p>Total a pagar</p>
                                </div>
                            </div>
                            <div className="slogan">
                                <p>Ser cliente puntual tiene beneficios exclusivos.</p>
                                <p>Paga puntualmente y descúbrelos.</p>
                            </div>
                            <div className="bloque">
                                <a href="" className="contenidoBloque">
                                    <img src={iconAbonos} alt="" />
                                    <p>Mis Abonos</p>
                                    <img src={iconArrow} alt="" />
                                </a>
                            </div>
                            
                            <div className="bloque">
                                <a href="" className="contenidoBloque">
                                    <img src={iconSaldo} alt="" />
                                    <p>Saldo Total</p>
                                    <img src={iconArrow} alt="" />
                                </a>
                            </div>
                            
                            <div className="bloque">
                                <a href="" className="contenidoBloque">
                                    <img className="edit" src={iconAd} alt="" />
                                    <p>Mi Adeudo</p>
                                    <img src={iconArrow} alt="" />
                                </a>
                            </div>
                
                        </div>
                    </div>
                </Layout>
            </IonContent>
        </IonPage>
    )
}
