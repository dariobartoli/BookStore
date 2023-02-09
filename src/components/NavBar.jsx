import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/ShoppingCartContext'
import styles from '../assets/styles/NavBar.module.css'

export const NavBar = () => {

    const [cart, setCart] = useContext(CartContext)

    const quantity = cart.reduce((acc, curr) => {
        return acc + curr.quantity
    }, 0)

  return (
    <nav className={styles.navbar}>
        <Link to={"/"} className={styles.store}>Store</Link>
        <Link to={"cart"} className={styles.cartContainer}><span className={`material-symbols-outlined ${styles.cart}`}>shopping_cart</span><span className={styles.quantity}>{quantity}</span></Link>
    </nav>
  )
}
