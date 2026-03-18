import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'deltarevenue-appointments'

const AppointmentsContext = createContext(null)

function loadAppointments() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch (_) {
    return []
  }
}

export function AppointmentsProvider({ children }) {
  const [appointments, setAppointments] = useState(loadAppointments)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments))
    } catch (_) {}
  }, [appointments])

  const addAppointment = useCallback((data) => {
    const appt = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      ...data,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
    setAppointments((prev) => [appt, ...prev])
    return appt.id
  }, [])

  const updateStatus = useCallback((id, status) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status, updatedAt: new Date().toISOString() } : a))
    )
  }, [])

  const deleteAppointment = useCallback((id) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id))
  }, [])

  return (
    <AppointmentsContext.Provider value={{ appointments, addAppointment, updateStatus, deleteAppointment }}>
      {children}
    </AppointmentsContext.Provider>
  )
}

export function useAppointments() {
  const ctx = useContext(AppointmentsContext)
  if (!ctx) throw new Error('useAppointments must be used within AppointmentsProvider')
  return ctx
}
