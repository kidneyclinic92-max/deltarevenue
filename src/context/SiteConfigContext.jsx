import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { defaultSiteConfig } from '../config/defaultSiteConfig'

const STORAGE_KEY = 'deltarevenue-site-config'

const SiteConfigContext = createContext(null)

export function SiteConfigProvider({ children }) {
  const [config, setConfigState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        return { ...defaultSiteConfig, ...parsed }
      }
    } catch (_) {}
    return defaultSiteConfig
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
    } catch (_) {}
  }, [config])

  const setConfig = useCallback((next) => {
    setConfigState((prev) => (typeof next === 'function' ? next(prev) : { ...prev, ...next }))
  }, [])

  const updateSection = useCallback((section, data) => {
    setConfigState((prev) => ({
      ...prev,
      [section]: typeof data === 'function' ? data(prev[section]) : { ...prev[section], ...data },
    }))
  }, [])

  const replaceConfig = useCallback((newConfig) => {
    setConfigState({ ...defaultSiteConfig, ...newConfig })
  }, [])

  const resetToDefaults = useCallback(() => {
    setConfigState(defaultSiteConfig)
  }, [])

  const value = {
    config,
    setConfig,
    updateSection,
    replaceConfig,
    resetToDefaults,
    defaultConfig: defaultSiteConfig,
  }

  return (
    <SiteConfigContext.Provider value={value}>
      {children}
    </SiteConfigContext.Provider>
  )
}

export function useSiteConfig() {
  const ctx = useContext(SiteConfigContext)
  if (!ctx) throw new Error('useSiteConfig must be used within SiteConfigProvider')
  return ctx
}
