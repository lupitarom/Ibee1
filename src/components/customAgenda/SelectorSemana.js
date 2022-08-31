import React, { useEffect, useState } from 'react'
import flechaI from './../../assets/img/arrow-izquierda.png'
import flechaD from './../../assets/img/arrow-derecha.png'
import { addDays, addWeeks, endOfWeek, lastDayOfMonth, startOfWeek, subWeeks } from 'date-fns';
import { sanitizeFecha } from '../../calendar/utils/sanitizeFecha';

const meses =['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const letrasDias = ['D','L','M','M','J','V','S'];
//const diasInical = [{number:1,letter:'L'},{number:2,letter:'M'},{number:3,letter:'M'},{number:4,letter:'J'},{number:5,letter:'V'},{number:6,letter:'S'},{number:7,letter:'D'}];

export const SelectorSemana = ({fecha,setFecha}) => {

    const [dias, setDias] = useState( [] );
    //const [objetoFecha, setObjetoFecha] = useState(new Date(fecha))
    const objetoFecha = new Date(fecha)
    useEffect(() => {
        getWeek()
    }, [])

    useEffect(()=>{
        getWeek()
    },[fecha])
    
    const getDayOfMont = (day) => new Date(day).toISOString().split('T')[0].split('-')[2];
    
    const getWeek = () =>{
        const inicio = startOfWeek( new Date( fecha ),{weekStartsOn: 0} )
        let semana = [];

        for (let i = 0; i < 7; i++) {
            const dia = getDayOfMont(addDays(inicio, i));
            let diaClass = '';
            if( sanitizeFecha(addDays(inicio, i)) === sanitizeFecha(new Date()) ){
                diaClass = diaClass + 'hoy';
            }
            if( fecha === sanitizeFecha(addDays(inicio, i)) ){
                diaClass = diaClass + ' selected';
            }
            semana.push({number:dia,letter: letrasDias[i], class: diaClass, fechaDia: sanitizeFecha(addDays(inicio, i)) })
            
        }
        setDias( semana );
    }

    const semanaAnterior = () =>{
        setFecha( subWeeks(objetoFecha,1).toISOString() )
    }
    const semanaSiguiente = () =>{
        setFecha( addWeeks(objetoFecha,1).toISOString() )
    }

    return (
        <>
            <div className="fecha">
                <button
                    onClick={semanaAnterior}
                ><img src={flechaI} ></img></button>
                <h1>{ meses[objetoFecha.getMonth()] }</h1>
                <button
                    onClick={semanaSiguiente}
                ><img src={flechaD}></img></button>
            </div>

            <div className="semana">
                {
                    dias.map( dia =>(
                        <div key={dia.number}>{dia.letter}</div>
                    ))
                }
            </div>
            <div className="semanaNum">
                {
                    dias.map( dia =>(
                        <div 
                            key={dia.number} 
                            className={dia.class}
                            onClick={()=> setFecha(dia.fechaDia)}
                            >
                                {dia.number}</div>
                    ))
                }
            </div>
        </>
    )
}
