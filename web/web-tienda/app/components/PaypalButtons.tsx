"use client"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";

export default function PaypalButtons({ clientId, price } : Props) {
    return (
        <PayPalScriptProvider options={{
            clientId: clientId,
            intent: "capture",
            currency: "EUR",
            // Clave: forzar sandbox
            components: "buttons",
            // Para V6 SDK, usa environment:
            environment: "sandbox",
        }}>
            <PayPalButtons
            createOrder={async () => {
                const res = await fetch('http://localhost:3000/api/create-order', {
                     method: 'POST',
                     headers: {
                        'Content-Type': 'application/json'
                     },
                     body: JSON.stringify({price: price})
                });
                const data = await res.json();
                return data.orderId;
            }}
            onApprove={async (data) => {
                const response = await fetch(`http://localhost:3000/api/capture-order/${data.orderID}`, { method: 'POST' });
                if(response.ok) {
                    toast.success("Pago realizado correctamente");
                }
                else toast.error("Error al realizar el pago");
            }}
            />
        </PayPalScriptProvider>
    )
}

type Props = {
    clientId: string,
    price: number
}