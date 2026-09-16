import { Button } from "@/app/components/Button"
import { ArrowLeft, ShoppingBasket } from "lucide-react";
import Link from "next/link";

export default function NavBar({ products = [], inCartPage } : Props) {
    const totalProducts = products.reduce((prev, curr) => prev + curr.quantity, 0);
    return (
      <header className="border-b border-gray-600/50 bg-gray-800/80 backdrop-blur-xl shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex">
                {inCartPage && (
                    <Link href="/productos">
                        <Button variant="ghost" size="sm" className="cursor-pointer text-gray-300 hover:text-white hover:bg-gray-700/50">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Volver
                        </Button>
                    </Link>
                )}
                <div className="flex flex-col ms-4">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 via-red-300 to-orange-400 bg-clip-text text-transparent">
                        Tienda Paypal
                    </h1>
                    <p className="text-xs text-gray-400">Carrito</p>
                </div>
            </div>
            {!inCartPage && (
                <Link href={"/carrito"}>
                    <Button className="cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium shadow-lg shadow-green-500/25">
                        <ShoppingBasket />
                        <p className="text-white">{totalProducts}</p>
                    </Button>
                </Link>
            )}
        </div>
      </header>
    )
}

type Props = {
    products?: ProductInCart[]
    inCartPage?: boolean
}

type ProductInCart = {
    productName: string,
    quantity: number
}