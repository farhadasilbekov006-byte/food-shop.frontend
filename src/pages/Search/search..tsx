import { useNavigate } from 'react-router-dom'
import style from './search.module.scss'
import { useEffect, useState, useRef } from 'react'

export const SearchPage = () => {
    const navigate = useNavigate()
    const [search , setSearch] = useState('')
    const inputRef = useRef(null)
    const [products, setProducts] = useState([])
    const getProduct = async () => {
        const res = await fetch(`/api/product?name=${search}`)
        const data = await res.json()
        setProducts(data)
    }

    useEffect(() => {
        inputRef.current?.focus()
    }, [])
    return (
        <div className={style.SearchPage}>
            <div className={style.SearchPage_Header}>
                <div>
                  <button onClick={() => navigate('/')}><img src="../../img/Back.svg" alt="back" /></button>
                  <h2>Search</h2>
                </div>
                <button><img src="../../img/cart.svg" alt="cart" /></button>
            </div>

            <div className={style.SearchPage_Input}>
                <img src="../../img/Search.svg" alt="search" />
                <input 
                value={search}
                ref={inputRef}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                if (e.key === 'Enter') getProduct()
                 }}
                type="search" placeholder='Search...'/>
            </div>

            <div className={style.SearchPage_Recent}>
                <h2>Recent Keywords</h2>

            </div>

            
            {products.length > 0 && <div className={style.SearchPage_Suggested}>
                <h2>Suggested Restaurants</h2> 
               {products.map((p) =>
               <div 
                  key={p._id} 
                  className={style.SearchPage_Suggested_Item}
                  onClick={() => {navigate(`/product/${p._id}`), console.log(p) }}
                  >
                    <div className={style.SearchPage_Suggested_Item_Img
                    }>
                        <img src="" alt="" />
                    </div>
                    <div className={style.SearchPage_Suggested_Item_Info}>
                    <h3>{p.name}</h3>
                        <div>
                        <img src="../../img/Star 1.svg" alt="rating" />
                        <h4>{p.price}</h4>
                        </div>
                    </div>
                </div>
            
            )} 
                {/* ----- */}

                 {/* <div className={style.SearchPage_Suggested_Item}>
                    <div className={style.SearchPage_Suggested_Item_Img

                    }>
                        <img src="" alt="" />
                    </div>
                    
                    <div className={style.SearchPage_Suggested_Item_Info}>
                        <h3>American Spicy Burger Shop</h3>
                        <div>
                          <img src="../../img/Star 1.svg" alt="rating" />
                           <h4>4.3</h4> 
                        </div>
                    </div>
                </div> */}

                {/* ------ */}

                 {/* <div className={style.SearchPage_Suggested_Item}>
                    <div className={style.SearchPage_Suggested_Item_Img}>
                        <img src="" alt="" />
                    </div>
                    
                    <div className={style.SearchPage_Suggested_Item_Info}>
                    <h3>Cafenio Coffee Club</h3>
                        <div>
                        <img src="../../img/Star 1.svg" alt="rating" />
                        <h4>4.0</h4>   
                        </div>
                    </div>
                </div> */}

                
            </div> }

            <div className={style.SearchPage_Popular}>
                <h2>Popular Fast Food</h2>
                <div className={style.SearchPage_Popular_Items}>
                    <div className={style.SearchPage_Popular_Items_Item}>
                        <div className={style.SearchPage_Popular_Items_Item_Img}>
                            <img src="" alt="" />
                        </div>
                        
                        <div className={style.SearchPage_Popular_Items_Item_Info}>  
                            <div>
                               <h3>European Pizza</h3>
                               <h4>Uttora Coffe House</h4>
                                </div>                    
                        </div>
                        
                </div>
                    <div className={style.SearchPage_Popular_Items_Item}>
                        <div className={style.SearchPage_Popular_Items_Item_Img}>
                            <img src="" alt="" />
                        </div>
                        <div className={style.SearchPage_Popular_Items_Item_Info}>
                            <div>
                               <h3>Buffalo Pizza.</h3>
                               <h4>Cafenio Coffee Club</h4>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}