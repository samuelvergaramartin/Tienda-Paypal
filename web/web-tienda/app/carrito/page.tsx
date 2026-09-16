"use client"

import { useEffect, useState } from "react";
import NavBar from '@/app/components/NavBar';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/app/components/Card';
import { Button } from "@/app/components/Button";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";

export default function CarritoPage() {
    const [cart, setCart] = useState<ProductInCart[] | undefined>();
    const [first, setFirst] = useState<boolean>(true);
    const [total, setTotal] = useState<number>(0);
    useEffect(()=> {
        if(sessionStorage.getItem("carrito")) {
            console.log("Aqui")
            console.log("Carrito Storage: ", sessionStorage.getItem("carrito"))
            setCart(JSON.parse(sessionStorage.getItem("carrito")!))
        }
        else {
            sessionStorage.setItem("carrito", JSON.stringify([]));
        }

        setFirst(false);
    }, []);
    useEffect(()=> {
        if(!first) {
            sessionStorage.setItem("carrito", JSON.stringify(cart));
            console.log("Guardado en el storage: ", sessionStorage.getItem("carrito"));
            if(!cart) setTotal(0);
            else {
                if(cart.length === 0) setTotal(0);
                else {
                    setTotal(
                        cart.reduce((prev, curr) => prev + (curr.price * curr.quantity), 0)
                    );
                }
            }
        }
    }, [first, cart]);
    useEffect(()=> {
        sessionStorage.setItem("total", String(total));
    }, [total]);
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 text-white">
            <NavBar inCartPage={true}/>
            <div className="flex">
                <main className="flex-1 p-6 md:p-8">
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <h2 className="text-4xl font-bold mb-2">
                                <span className="bg-gradient-to-r from-red-400 via-red-300 to-orange-400 bg-clip-text text-transparent">
                                    Carrito
                                </span>
                            </h2>
                        </div>
                        {(cart?.length || 0) === 0 && (
                            <h3 className="text-2xl font-bold mb-2 text-center">
                                <span className="bg-gradient-to-r from-red-400 via-red-300 to-orange-400 bg-clip-text text-transparent">
                                    No hay productos en el carrito
                                </span>
                            </h3>
                        )}
                        <div className="grid lg:grid-cols-3 gap-6">
                            {cart && (
                                <>
                                    {cart.map((product, key) => {
                                        return (
                                            <Card key={key} className="bg-gray-700/50 border-gray-600/50 backdrop-blur-sm shadow-xl">
                                                <CardHeader>
                                                    <CardTitle className="bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400 bg-clip-text text-transparent text-center max-h-6 overflow-hidden text-ellipsis whitespace-nowrap">{product.productName}</CardTitle>
                                                </CardHeader>
                                                <CardContent className="text-white text-center">
                                                   {product.price}€ x {product.quantity} = {(product.price * product.quantity)}€
                                                </CardContent>
                                                <CardFooter className="h-10 owerflow-y-auto items-center justify-center pb-5 mb-3">
                                                    <div className="flex gap-3 mt-auto items-center justify-center pb-5">
                                                        <Button
                                                            className="cursor-pointer bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium shadow-lg shadow-green-500/25"
                                                            onClick={()=> {
                                                                const tempProducts = [...cart];
                                                                const index = cart.indexOf(product);
                                                                tempProducts[index] = {
                                                                    productName: product.productName,
                                                                    quantity: ++product.quantity,
                                                                    price: product.price
                                                                };
                                                                setCart(tempProducts);
                                                            }}
                                                        >
                                                            <Plus />
                                                        </Button>
                                                        <Button
                                                            className="cursor-pointer bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium shadow-lg shadow-red-500/25"
                                                            onClick={()=> {
                                                                let tempProducts = [...cart];
                                                                const index = tempProducts.indexOf(product);
                                                                if(tempProducts[index].quantity === 1) {
                                                                    const temp = [];
                                                                    for(let i = 0; i < index; i++) {
                                                                        temp.push(tempProducts[i]);
                                                                    }
                                                                    for(let i = index+1; i < tempProducts.length; i++) {
                                                                        temp.push(tempProducts[i]);
                                                                    }
                                                                    return setCart(temp);
                                                                }
                                                                tempProducts[index] = {
                                                                    productName: product.productName,
                                                                    quantity: --product.quantity,
                                                                    price: product.price
                                                                };

                                                                setCart(tempProducts);
                                                            }}
                                                        >
                                                            <Minus />
                                                        </Button>
                                                    </div>
                                                </CardFooter>
                                            </Card>
                                        )
                                    })}
                                </>
                            )}
                        </div>
                        {cart && cart.length > 0 && (
                            <>
                                <h2 className="text-3xl font-bold mb-2 text-center">
                                    <span className="bg-gradient-to-r from-red-400 via-red-300 to-orange-400 bg-clip-text text-transparent">
                                        Total: {total}€
                                    </span>
                                </h2>
                                
                                <div className="flex w-full justify-center mt-5">
                                    <Link href={"/carrito/paypal"}>
                                        <Button
                                            className="cursor-pointer bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-medium shadow-lg shadow-yellow-500/25 size-20 w-42 text-2xl"
                                        >
                                            Comprar
                                        </Button>
                                    </Link>
                                </div>  
                            </>
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
}

type ProductInCart = {
    productName: string,
    quantity: number,
    price: number
}