
export const sanitizeFecha = fecha => new Date(fecha).toISOString().split('T')[0]

