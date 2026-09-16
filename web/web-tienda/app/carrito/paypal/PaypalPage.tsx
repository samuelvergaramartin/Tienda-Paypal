"use client"

import NavBar from '@/app/components/NavBar';
import PaypalButtons from '@/app/components/PaypalButtons';
import { useEffect, useState } from 'react';

export default function PaypalPage({ paypalClientId } : Props) {
    const [total, setTotal] = useState<number>(0);
    useEffect(()=> {
        setTotal(
            Number(sessionStorage.getItem("total")!)
        )
    }, []);
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 text-white">
            <NavBar inCartPage={true}/>
            <div className="flex">
                <main className="flex-1 p-6 md:p-8">
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <h2 className="text-4xl font-bold mb-2">
                                <span className="bg-gradient-to-r from-red-400 via-red-300 to-orange-400 bg-clip-text text-transparent">
                                    Pago con Paypal
                                </span>
                            </h2>
                        </div>
                        <div className='flex w-full justify-center'>
                            <PaypalButtons clientId={paypalClientId} price={total}/>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

type Props = {
    paypalClientId: string
}