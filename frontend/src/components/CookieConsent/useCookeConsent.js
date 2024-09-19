import { useState } from 'react'

const getCookie = (name) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
  return null
}

const setCookie = (name, value, days) => {
  const expires = new Date()
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000))
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
}

export const useCookieConsent = () => {
  const [consent, setConsent] = useState(() => {
    const storedConsent = getCookie('cookieConsent')
    return storedConsent === 'accepted' ? 'accepted' : storedConsent === 'declined' ? 'declined' : null
  })

  const giveConsent = () => {
    setCookie('cookieConsent', 'accepted', 365)
    setConsent('accepted')
  }

  const declineConsent = () => {
    setCookie('cookieConsent', 'declined', 365)
    setConsent('declined')
  }

  return [consent, giveConsent, declineConsent]
}
