"use client"

import 'react-toastify/dist/ReactToastify.css'
import "../globals.css"
import { ToastContainer } from 'react-toastify'

export function ToastProvider() {
  return <ToastContainer position="top-right" autoClose={5000} theme='colored' />
}