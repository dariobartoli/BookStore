import React, { useContext } from 'react'
import { CartContext } from '../context/ShoppingCartContext'
import styles from '../assets/styles/Item.module.css'

export const Item = ({name, price, id, image}) => {

    const [cart, setCart] = useContext(CartContext)

    const addToCart = () => {
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

    const getQuantityById = (id) => {
        return cart.find((item) => item.id === id)?.quantity || 0
    }

    const quantityPerItem = getQuantityById(id)

  return (
    <div className={styles.cardContainer}>
        <h2>{name}</h2>
        <img src={image} className={styles.image} />
        <h3>Price: ${(price).toFixed(2)}</h3>

        <div className={styles.buttonContainer}>
            {
                quantityPerItem > 0 && (
                    <span onClick={() => removeItem(id)} className={`material-symbols-outlined ${styles.buttonMin}`}>
                    remove
                    </span>
                )
            }

            {
                quantityPerItem > 0 && (
                    <div className={styles.quantity}>{quantityPerItem}</div>
                )
            }


            {
                quantityPerItem === 0 ? (
                    <button onClick={() => addToCart()} className={styles.buttonAdd}>Add to cart</button>
                ): (
                    <span onClick={() => addToCart()} className={`material-symbols-outlined ${styles.buttonMax}`}>
                    add
                    </span>
                )
            }
        </div>
        

    </div>
  )
}
