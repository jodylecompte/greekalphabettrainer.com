import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    __ga4SpaTrackingInitialized?: boolean
  }
}

const trackPageView = () => {
  window.gtag?.('event', 'page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}${window.location.hash}`,
  })
}

const initGa4SpaTracking = () => {
  if (window.__ga4SpaTrackingInitialized) return
  window.__ga4SpaTrackingInitialized = true

  const dispatchNavigationEvent = () => {
    window.dispatchEvent(new Event('ga:navigation'))
  }

  const originalPushState = history.pushState
  history.pushState = function (...args) {
    originalPushState.apply(this, args)
    dispatchNavigationEvent()
  }

  const originalReplaceState = history.replaceState
  history.replaceState = function (...args) {
    originalReplaceState.apply(this, args)
    dispatchNavigationEvent()
  }

  window.addEventListener('popstate', trackPageView)
  window.addEventListener('hashchange', trackPageView)
  window.addEventListener('ga:navigation', trackPageView)
}

initGa4SpaTracking()
trackPageView()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
