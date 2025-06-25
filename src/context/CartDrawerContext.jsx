import { createContext, useContext, useState } from "react";

const CartDrawerContext = createContext();

export const DrawerProvider = ({children}) => {
    const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

    const openCartDrawer = () => setIsCartDrawerOpen(true);
    const closeCartDrawer = () => setIsCartDrawerOpen(false);


    return(
        <CartDrawerContext.Provider value={{isCartDrawerOpen,openCartDrawer, closeCartDrawer}}>
            {children}
            
        </CartDrawerContext.Provider>
    )
}

export const useCartDrawer = () => useContext(CartDrawerContext);