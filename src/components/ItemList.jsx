import React from 'react'
import storeItems from "../data/products.json"
import { Item } from './Item'
import styles from '../assets/styles/ItemList.module.css'

export const ItemList = () => {
  return (
    <div className={styles.mainPage}>
        {
            storeItems.map((product) =>{
                return <Item key={product.id} {...product}/>
            })
        }
    </div>
  )
}
