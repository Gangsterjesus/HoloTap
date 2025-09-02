import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import PaymentForm from '../payments/PaymentForm'
import QRExample from '../components/qr/QRExample'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/payments" element={<PaymentForm />} />
      <Route path="/qr-demo" element={<QRExample />} />
    </Routes>
  )
}

export default App