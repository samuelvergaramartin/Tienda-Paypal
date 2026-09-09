import { Button } from "./Button"
import { ShoppingBasket } from "lucide-react";

export default function NavBar() {
    return (
      <header className="border-b border-gray-600/50 bg-gray-800/80 backdrop-blur-xl shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 via-red-300 to-orange-400 bg-clip-text text-transparent">
                    Tienda Paypal
                </h1>
                <p className="text-xs text-gray-400">Listado de productos</p>
            </div>
            <Button className="cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium shadow-lg shadow-green-500/25">
                <ShoppingBasket />
                <p className="text-white">0</p>
            </Button>
        </div>
      </header>
    )
}