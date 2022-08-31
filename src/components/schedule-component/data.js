const results = [
  {
    "id_citas": 5145,
    "paciente_id_paciente": 836,
    "fecha_inicio": "2021-10-14T05:00:00.000Z",
    "hora_inicio": "08:00:00",
    "fecha_fin": "2021-10-14T05:00:00.000Z",
    "hora_fin": "08:30:00",
    "nombre_c": "Edgar Ezequiel",
    "ap_paterno_c": "Cano",
    "ap_materno_c": "Bahena",
    "asunto": "Muelas",
    "estatus": "a",
    "medico": "1",
    "Consultorio": 1
},
{
    "id_citas": 5146,
    "paciente_id_paciente": 44,
    "fecha_inicio": "2021-10-14T05:00:00.000Z",
    "hora_inicio": "08:30:00",
    "fecha_fin": "2021-10-14T05:00:00.000Z",
    "hora_fin": "09:00:00",
    "nombre_c": "Carlos alberto",
    "ap_paterno_c": "Perez",
    "ap_materno_c": "Varela",
    "asunto": "no se",
    "estatus": "a",
    "medico": "1",
    "Consultorio": 1
},
{
    "id_citas": 5149,
    "paciente_id_paciente": 9,
    "fecha_inicio": "2021-10-14T05:00:00.000Z",
    "hora_inicio": "09:00:00",
    "fecha_fin": "2021-10-14T05:00:00.000Z",
    "hora_fin": "09:30:00",
    "nombre_c": "Victoria",
    "ap_paterno_c": "VelÃ¡zquez",
    "ap_materno_c": "Acosta",
    "asunto": "ccccc",
    "estatus": "a",
    "medico": "1",
    "Consultorio": 1
},
{
    "id_citas": 5150,
    "paciente_id_paciente": 29,
    "fecha_inicio": "2021-10-14T05:00:00.000Z",
    "hora_inicio": "10:00:00",
    "fecha_fin": "2021-10-14T05:00:00.000Z",
    "hora_fin": "10:30:00",
    "nombre_c": "Rodolfo  ",
    "ap_paterno_c": "Soto",
    "ap_materno_c": "Carmargo ",
    "asunto": "ir al baño",
    "estatus": "a",
    "medico": "1",
    "Consultorio": 1
}
]

const x = results.map( res =>({
  text: res.asunto,
  startDate: new Date( res.fecha_inicio.split('T')[0] + 'T'+ res.hora_inicio),
  endDate: new Date(  res.fecha_inicio.split('T')[0] +'T'+ res.hora_fin)
}))

export const data = [...x]

export const priorities = [
  {
    text: 'Muy Importante',
    id: 1,
    color: 'rgb(10, 112, 138)'
  }, {
    text: 'Importante',
    id: 2,
    color: 'rgb(12,142,173)'
  },{
    text: 'Normal',
    id: 3,
    color: 'rgb(6, 179, 202)'
  }
];

