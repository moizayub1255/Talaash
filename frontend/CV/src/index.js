import React from 'react'
import ReactDom from 'react-dom'
import Apps from './App.jsx'

import 'uimini'

import './assets/scss/main.scss'

ReactDom.render(
  <React.StrictMode>
    <Apps />
  </React.StrictMode>,
  document.getElementById('app')
)
