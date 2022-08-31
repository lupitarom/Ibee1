import React from 'react'
import { Layout } from '../components/layout/Layout'
import './InterrogatorioAparatosSistemas.css';
export const IterrogatorioPorAparatosYSistemas = () => {
    return (
        <Layout>
            <div className="container">
                <h2>Interrogatorio por Aparatos y Sistema</h2>

                <form>
                    <div className="form-control">
                        <p>Cambio de color en piel erupciones, prurito, hiperhidrosis, pérdidas de pelo o vello, cutis seco</p>
                        <button>x</button>
                    </div>
                    <div>
                        <p>Cambio de color en piel erupciones, prurito, hiperhidrosis, pérdidas de pelo o vello, cutis seco</p>
                        <button>x</button>
                    </div>

                    <div>
                        <input className="form-control" type="text" placeholder="peso"></input>
                        <input type="text" placeholder="talla"></input>
                        <input type="text" placeholder="Conplexión"></input>

                    </div>

                    <h3>Signos vitales</h3>

                    <div>
                        <input type="text" placeholder="frecuencia cardiaca"></input>
                        <input type="text" placeholder="tensiòn arterial"></input>
                        <input type="text" placeholder="frecuencia respiratoria"></input>
                        <input type="text" placeholder="temperatura"></input>
                    </div>
                </form>
            </div>
        </Layout>
    )
}
