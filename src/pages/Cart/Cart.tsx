import { useEffect, useState } from 'react'
import style from './Cart.module.scss'
import { useNavigate } from 'react-router-dom';

type SelectedSize = {
    name: string
    price: number
}

type CartItem = {
  _id: string;
  productId: {
    _id: string;
    img: string;
    name: string;
    price: number;
  } | string;
  qty: number;
  selectedSize: SelectedSize
};

type Cart = {
  _id: string;
  items: CartItem[];

};


export const CartPage = () => {
    
    const [ food, setFood] = useState<Cart | null>(null)
    const navigate = useNavigate()

    const getCart = async () => {
        const token = localStorage.getItem('token')
        const res = await fetch('/api/cart', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (!res.ok) {
            console.log('Cart error', res.status)
            return
        }

        const data = await res.json()
        setFood(data)
        

    }

    useEffect(() => {
        getCart()
    }, [])

    return (
        <div className={style.cartPage}>
            <div className={style.cartPage_Header}>
                <div className={style.cartPage_Header_Left} >
                    <button onClick={() => navigate('/') }><img src="../../img/Back (1).svg" alt="back" /></button>
                    <h3>Cart</h3>
                </div>

                <div className={style.cartPage_Header_Right}>
                    <button>EDIT ITEMS</button>
                </div>
            </div>

            {food?.items?.map((item) => (
            <div className={style.cartPage_Items} key={item.productId._id}>
                <div className={style.cartPage_Items_Img}>
                    <img src={item.productId.img} alt={item.productId.name} />
                </div>

                <div className={style.cartPage_Items_Info}>
                    <div className={style.cartPage_Items_Info_NameAndDeleteBtn}>
                        <h2>{item.productId.name}</h2>
                        <button><img src="../../img/btnDel.svg" alt="BtnDel" /></button>
                    </div>
                    <strong>{item.productId.price}</strong>
                    <div className={style.cartPage_Items_Info_SizeAndQty}>
                        <p>{item.selectedSize.name}</p>
                        <div className={style.cartPage_Items_Info_SizeAndQty_Update}>
                            <button>+<img src="../../img/plus.svg" alt="plus" /></button>
                            <span>{item.qty}</span>
                            <button>-<img src="../../img/minus.svg" alt="minus" /></button>
                        </div>
                    </div>
                </div>
            </div>
            ))}

            <div>
                hello
            </div>
        </div>
    )
}