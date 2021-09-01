export function randomId () {
  return Math.random()
    .toString()
    .substr(2)
}

export function currency (value, currency, decimals) {
  const digitsRE = /(\d{3})(?=\d)/g
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) { return '' }
  currency = currency != null ? currency : '$'
  decimals = decimals != null ? decimals : 2
  const stringified = Math.abs(value).toFixed(decimals)
  const _int = decimals ? stringified.slice(0, -1 - decimals) : stringified
  const i = _int.length % 3
  const head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : ''
  const _float = decimals ? stringified.slice(-1 - decimals) : ''
  const sign = value < 0 ? '-' : ''
  return (
    sign + head + _int.slice(i).replace(digitsRE, '$1,') + _float
  )
}

const WHATSAPP_MESSAGE = '¡Hola! Somos Pedidos Los Frailes, una plataforma de delivery y pedidos en línea. Nos llegó la notificación de que deseas unirte a nuestra plataforma, para verificar tu solicitud envía una foto de tu cédula.'
export const API_SEND_WHATSAPP_MESSAGE = `https://api.whatsapp.com/send/?app_absent=0&text=${WHATSAPP_MESSAGE}&phone=`
