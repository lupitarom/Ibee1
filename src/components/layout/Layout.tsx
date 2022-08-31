import React, { Children } from 'react'
import { Header } from './Header';
import { Footer } from './Footer';
import './../../pages/variables.css'
import '../layout/Layout.css'
import { Tabs } from './Tabs';

export const Layout = (props: any) => {
    return (
        <>
            <div className="pantalla">
                <Header />
                {
                    props.children
                }
                <Footer />
            </div>
        </>

    )
}
