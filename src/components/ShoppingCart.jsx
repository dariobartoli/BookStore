import React, { useContext } from 'react'
import { CartContext } from '../context/ShoppingCartContext'
import styles from '../assets/styles/ShoppingCart.module.css'

export const ShoppingCart = () => {

    const [cart, setCart] = useContext(CartContext)

    const quantity = cart.reduce((acc, curr) => {
        return acc + curr.quantity
    }, 0)

    const totalPrice = cart.reduce((acc, curr) => {
        const total = acc + curr.quantity * curr.price
        return total
    }, 0) 

    const removeItem = (id) => {
        setCart((currItems) => {
            if(currItems.find((item) => item.id === id)?.quantity === 1){
                return currItems.filter((item) => item.id !== id);
            }else {
                return currItems.map((item) => {
                    if(item.id === id){
                        return {...item, quantity: item.quantity - 1};
                    }else{
                        return item;
                    }
                })
            }
        })
    };

    const addToCart = (id) => {
        setCart((currItems) => {
            const isItemsFound = currItems.find(item => item.id === id);
            if(isItemsFound){
                return currItems.map((item) => {
                    if(item.id === id){
                        return {...item, quantity: item.quantity + 1};
                    }else {
                        return item;
                    }
                });
            }else{
                return [...currItems, {id, quantity: 1, price: price, name: name}]
            }
        })
    };

    const getQuantityById = (id) => {
        return cart.find((item) => item.id === id)?.quantity || 0
    }

    const getSubTotalProduct = (id) => {
        const product = cart.find((item) => item.id === id)
        return (product.quantity * product.price).toFixed(2)
    }

    const payment = () => {
        setCart([])
    }


  return (
    <div className={styles.mainShopping}>
        {
            cart.length?        <table className={styles.table}>
            <thead>
                <tr>
                    <th className={styles.tituloMedia} colSpan="12">CheckOut</th>
                </tr>
                <tr className={styles.trHead}>
                    <th className={styles.th}>Name</th>
                    <th className={styles.th}>Price</th>
                    <th className={styles.th}>Substract</th>
                    <th className={styles.th}>Quantity</th>
                    <th className={styles.th}>Add</th>
                    <th className={styles.th}>SubTotal</th>
                </tr>
            </thead>
            <tbody>
                {
                    cart.map((item) => (
                        <tr key={item.id} className={styles.trBody}>
                            <td className={styles.td} data-label="Name">{item.name}</td>
                            <td className={styles.td} data-label="Price">${(item.price).toFixed(2)}</td>
                            <td className={styles.td} onClick={() => removeItem(item.id)} data-label="Substract"><span className={`material-symbols-outlined ${styles.buttonMin}`}>remove</span></td>
                            <td className={styles.td} data-label="Quantity">{getQuantityById(item.id)}</td>
                            <td className={styles.td} onClick={() => addToCart(item.id)} data-label="Add"><span className={`material-symbols-outlined ${styles.buttonMax}`}>add</span></td>
                            <td className={styles.td} data-label="SubTotal">{getSubTotalProduct(item.id)}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table> :
        <p className={styles.cartEmpty}>Cart is empty</p>

        }


        <div className={styles.totalContainer}>
            <div><span className={styles.text}>Items in cart: </span>{quantity}</div>
            <div><span className={styles.text}>Total: </span>${totalPrice.toFixed(2)}</div>

        </div>
        
    </div>
  )
}
