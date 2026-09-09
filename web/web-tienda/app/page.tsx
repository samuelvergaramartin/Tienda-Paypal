import { env } from 'node:process';
import PayPalPage from './components/PayPalPage';
import NavBar from './components/NavBar';
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 text-white">
      <NavBar />
      <PayPalPage clientId={env["PAYPAL_CLIENT_ID"]!}/>
    </div>
  );
}
