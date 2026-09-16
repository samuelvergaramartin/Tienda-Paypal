import { env } from "node:process";
import PaypalPage from "@/app/carrito/paypal/PaypalPage";

export default function PaypalPageLoader() {
    const paypalClientId = env["PAYPAL_CLIENT_ID"]!;
    return (
        <PaypalPage paypalClientId={paypalClientId} />
    )
}