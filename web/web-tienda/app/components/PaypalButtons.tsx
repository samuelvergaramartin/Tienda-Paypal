"use client"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PaypalButtons({ clientId } : Props) {
    return (
        <PayPalScriptProvider options={{
            clientId: clientId,
            intent: "capture",
            currency: "USD",
            // Clave: forzar sandbox
            components: "buttons",
            // Para V6 SDK, usa environment:
            environment: "sandbox",
        }}>
            <PayPalButtons
            createOrder={async () => {
                const res = await fetch('http://localhost:3000/api/create-order', { method: 'POST' });
                const data = await res.json();
                return data.orderId;
            }}
            onApprove={async (data) => {
                await fetch(`http://localhost:3000/api/capture-order/${data.orderID}`, { method: 'POST' });
            }}
            />
        </PayPalScriptProvider>
    )
}

type Props = {
    clientId: string
}