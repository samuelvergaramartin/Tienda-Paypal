import { env } from 'node:process';
import PaypalButtons from '@/app/components/PaypalButtons';
import NavBar from '@/app/components/NavBar';
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 text-white">
      <NavBar />
      <PaypalButtons clientId={env["PAYPAL_CLIENT_ID"]!}/>
    </div>
  );
}
