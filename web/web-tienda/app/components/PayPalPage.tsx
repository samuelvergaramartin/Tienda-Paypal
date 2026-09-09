"use client"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/Card';
import { Plus } from 'lucide-react';
import { Button } from '../components/Button';
import Link from 'next/link';

export default function PayPalPage({ clientId } : Props) {
    const products = [
        {
            name: "Producto 1",
            description: "Esta es la descripción del producto 1",
            price: 3
        },
        {
            name: "Producto 2",
            description: "Esta es la descripción del producto 2",
            price: 10.5
        },
        {
            name: "Producto 3",
            description: "Esta es la descripción del producto 3",
            price: 2.20
        },
        {
            name: "Producto 4",
            description: "Esta es la descripción del producto 4",
            price: 20
        },
        
    ]
    return (
        <div className="flex">
            <main className="flex-1 p-6 md:p-8">
                <div className="space-y-6">
                    <div className="grid lg:grid-cols-3 gap-6">
                        {products && (
                            <>
                                {products.map((product, key) => {
                                    return (
                                        <>
                                            <Card key={key} className="bg-gray-700/50 border-gray-600/50 backdrop-blur-sm shadow-xl">
                                                <CardHeader>
                                                    <CardTitle className="bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400 bg-clip-text text-transparent text-center max-h-6 overflow-hidden text-ellipsis whitespace-nowrap">{product.name}</CardTitle>
                                                </CardHeader>
                                                <CardContent className="text-white">
                                                    {product.description}
                                                </CardContent>
                                                <CardFooter className="h-10 owerflow-y-auto items-center justify-center pb-5 mb-3">
                                                    <div className="flex gap-3 mt-auto items-center justify-center pb-5">
                                                        <Link href={"#"}>
                                                            <Button
                                                            onClick={() => {}}
                                                            className="cursor-pointer bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium shadow-lg shadow-green-500/25"
                                                            >
                                                            <Plus />
                                                            Añadir al carrito
                                                            </Button>
                                                        </Link>
                                                        <p className="text-white font-bold">{product.price} €</p>
                                                    </div>
                                                </CardFooter>
                                            </Card>
                                        </>
                                    )
                                })}
                            </>
                        )}
                        
                    </div>
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
                </div>
            </main>
        </div>
    )
}

type Props = {
    clientId: string
}