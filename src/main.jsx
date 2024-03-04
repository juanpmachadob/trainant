import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { registerSW } from 'virtual:pwa-register'
import App from '@/App.jsx'
import store from '@/store'
import { showAlert } from './utils/alerts'
import '@/index.css'
import '@/../node_modules/react-grid-layout/css/styles.css'

const updateSW = registerSW({
  onNeedRefresh () {
    showAlert({
      title: 'New version available!',
      icon: 'question',
      confirmButtonText: 'Reload',
      callback: () => updateSW(true)
    })
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
