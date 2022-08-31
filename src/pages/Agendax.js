import React from 'react'
import { CitasDia } from '../components/customAgenda/CitasDia'
import { CustomAgenda } from '../components/customAgenda/CustomAgenda'
import { Layout } from '../components/layout/Layout'

export const Agendax = () => {
    return (
        <Layout>
            {/* <CustomAgenda /> */}
            <CitasDia />
        </Layout>
    )
}
