import { useNavigate, useParams } from 'react-router-dom'
import style from './food.module.scss'
import { useEffect, useState } from 'react';
import { addToCart } from '../Cart/api/Api';


type Size = { 
  _id: string
  name: string
  price: number
}

type Ingredient = {
  name: string
  img: string 
}


type Product = {
   _id: string;
   name: string;
   price: number;
   img: string;
   desc: string;
   size: Size[];
   ingredient: Ingredient[];
   rating: number;
   time: number;
   qty: number;
}


export const FoodPage = () => {
    
    const navigate = useNavigate();
    const { id }= useParams()
    const [food, setFood] = useState<Product | null>(null);
    const [liked , setLiked ] = useState(false)
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState<Size | null>(null);
    const [qty , setQty] = useState(1);
    const totalPrice = ((food?.price ?? 0) + (selectedSize?.price ?? 0) * qty)
    const plus = () => {
        console.log('PLUS')
        setQty(prev => prev + 1)
     }

    const minus = () => {
       if (qty > 1) {
         console.log('MINUS')
         setQty(prev => prev - 1 )

       }
     }

    const handleAddToCart = async () => {
    if (!food?._id) return;

    if (!selectedSize) {
    console.log("Size not selected");
    return;
    }

  try {
    const data = await addToCart(food._id, qty, {
      name: selectedSize.name,
      price: selectedSize.price,
    });

    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
useEffect(() => {
  const getFood = async () => {
    try {
      const res = await fetch(`/api/product/${id}`);
      const data = await res.json();
      setFood(data);

      if (data?.size?.length) {
      setSelectedSize(data.size[0])
      } 
    } finally {
      setLoading(false);
    }
  };

  getFood();
}, [id]);

useEffect(() => {
  if (liked) {
    console.log('Liked')
  } else {
    console.log('unliked')
  }

 }, [liked])


if (loading) return <div>Loading...</div>;
if (!food) return <div>Not found</div>;

    return (
        <div className={style.FoodPage}>
            <div className={style.FoodPage_Header}>
                <button onClick={() => navigate('/search')} ><img src="../../img/Back.svg" alt="back" /></button>
                <button onClick={() => setLiked(prev => !prev)} >{!liked ? <img src="../../img/Vector (3).svg" alt="like" /> :  <img src="../../img/Vector (4).svg" alt="like" />}</button>
            </div>

            <div className={style.FoodPage_Img}>
                <img src={food.img} alt={food.name} />
            </div>

            <div className={style.FoodPage_Main}>

            <div className={style.FoodPage_Main_Info}>
                <h2>{food.name}</h2>
                <div className={style.FoodPage_Main_Info_Desc}>
                    <span><img src="../../img/Star 1.svg" alt="star" /><h3>{food.rating}</h3></span>
                    <span><img src="../../img/Icon (1).svg" alt="delivery" /></span>
                    <span><img src="../../img/Clock.svg" alt="clock" /><h3>{food.time}</h3></span>
                </div>
            </div>

            <div className={style.FoodPage_Main_Description}>
                 <p>{food.desc}</p>
            </div>
            
            <div className={style.FoodPage_Main_Size}>
                <h4>SIZE:</h4>
                <div>
                {food?.size?.map((item) => (
                  <button
                  key={item._id}
                  onClick={() => setSelectedSize(item)}
                  className={`${style.FoodPage_Main_Size_Btn} ${selectedSize?.id === item.id
                  ? style.FoodPage_Main_Size_ActiveBtn
                  : ''}`
                }
                  >{item.name}”</button>
                ))}
                </div>

            </div>
             
            <div className={style.FoodPage_Main_Ingredients}>
            <h3>INGREDIENTS</h3>
            
            <div className={style.FoodPage_Main_Ingredients_Item}>
            {food.ingredient.map((item, index) => (
                  <div key={index}>
                    <div>
                        <img src={item.img} alt={item.name} />
                    </div>
                    <h2>{item.name}</h2>
                  </div>
            ))}
        </div>

             </div>          
            </div>

              <div className={style.FoodPage_AddToCart}>
                <div className={style.FoodPage_AddToCart_Qty}>
                  <h3>${totalPrice}</h3>
                   <div>
                     <button onClick={() => minus()}><img src="../../img/minus.svg" alt="" /></button>
                     <span>{qty}</span>
                     <button onClick={() => plus()} ><img src="../../img/plus.svg" alt="" /></button>
                   </div>
                </div>
                <div className={style.FoodPage_AddToCart_Btn}>
                    <button onClick={() => { console.log("btn")  , handleAddToCart()}}>ADD TO CART</button>
                </div>
              </div>

        </div>

    )
}