import { subHours } from "date-fns"

// resta 6  horas para coincidir con la hora central de mexico
export const sanitizeHour = fecha => subHours(new Date(fecha),6).toISOString().split('T')[1].substr(0,8)
