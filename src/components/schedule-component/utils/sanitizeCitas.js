export const sanitizeCitas = (results) => results.map( res =>({
    text: res.asunto,
    startDate: new Date( res.fecha_inicio.split('T')[0] + 'T'+ res.hora_inicio),
    endDate: new Date(  res.fecha_inicio.split('T')[0] +'T'+ res.hora_fin)
}))
  