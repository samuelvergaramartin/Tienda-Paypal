import { env } from 'node:process';
import PayPalPage from './components/PayPalPage';
export default function Home() {
  return (
    <div>
      <PayPalPage clientId={env["PAYPAL_CLIENT_ID"]!}/>
    </div>
  );
}
