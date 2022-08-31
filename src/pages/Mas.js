import { IonButton } from '@ionic/react'
import React from 'react'
import { Layout } from '../components/layout/Layout'

export const Mas = () => {

    const logout = () =>{
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.reload()
    }

    return (
        <Layout>
            <div>
                <IonButton
                    onClick={logout}
                >
                    Salir
                </IonButton>
            </div>
        </Layout>
    )
}
