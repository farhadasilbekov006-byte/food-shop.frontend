import { useState } from 'react'
import style from './auth.module.scss'
import { useNavigate } from 'react-router-dom'

export const AuthPage = () => {
    const [signIn , setSignIn] = useState(true)
    const [email, setEmail ] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
   

    const getUser = async () => {
        setError('')
        setLoading(true)
        const url = signIn 
        ? '/api/auth/login'
        : '/api/auth/register'
        try {
            if (!signIn && password !== confirmPassword) {
                setError('Invalid password')
                setLoading(false)
                return
            }
            const res = await fetch(url, {
             method: 'POST',
             headers: {
               'Content-type':'application/json',
             },
             body: JSON.stringify({ email, password , name})
            })
            const data = await res.json()
            if(!res.ok) {
                alert('wrong')
                return
            }
            const token = data.token || data.access_token;
            
            if(token) {
                localStorage.setItem('token', token);
                if (signIn)  {
                    navigate('/')
                } 
                console.log(localStorage.getItem("token"))
            }
            console.log(data.token)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

        setError('')
    }
    return (
        <div className={style.AuthPage}>
            {loading && <h2>Loading...</h2>}   
               { signIn
               ? ''
               : <div className={style.AuthPage_Back}>
                  <button onClick={() => setSignIn(true)}><img src="../../img/Back.svg" alt="back" /></button>
                 </div>
                  
               }

               <div  className={style.AuthPage_Header}>
                   {signIn ? <h2>Log In</h2> : <h2>Sign Up</h2>}
                   
                   {signIn ? <h5>Please sign in to your existing account</h5> : <h5>Please sign up to get started</h5> }
               </div>
               
               <form 
               className={style.AuthPage_Hero}
               onSubmit={(e) => {
                e.preventDefault()
                getUser();
               }}
               >

               { signIn ?  
               <div  className={style.AuthPage_Hero_Input_In}>
                
                 <label htmlFor="">EMAIL</label>
                 <input 
                    type="email"    
                    value={email}
                    onInvalid={(e) => e.currentTarget.setCustomValidity('Enter Email')}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com" />

                 <label htmlFor="">PASSWORD</label>
                 <input 
                    type="password" 
                    value={password}
                    onInvalid={(e) => e.currentTarget.setCustomValidity('Enter password')}
                    onChange={(e) => setPassword(e.target.value)}    
                    placeholder="password" />
               </div>
               : 
               <div  className={style.AuthPage_Hero_Input_Up}>
                <label htmlFor="">NAME</label>
                 <input 
                    type="text" 
                    value={name}
                    required
                    onInvalid={(e) => e.currentTarget.setCustomValidity('Enter name')}
                    onChange={(e) => setName(e.target.value)}    
                    placeholder="name" />

                 <label htmlFor="">EMAIL</label>
                 <input 
                    type="email" 
                    value={email}
                    required
                    onInvalid={(e) => e.currentTarget.setCustomValidity('Enter email')}
                    onChange={(e) => setEmail(e.target.value)}    
                    placeholder="email" />
                 <label htmlFor="">PASSWORD</label>
                 <input 
                    type="password" 
                    value={password}
                    required
                    onInvalid={(e) => e.currentTarget.setCustomValidity('Enter password')}
                    onChange={(e) => setPassword(e.target.value)}    
                    placeholder="password" />
                 <label htmlFor="">RE_TYPE_PASSWORD</label>
                 <input 
                    type="password" 
                    value={confirmPassword}
                    required
                    onInvalid={(e) => e.currentTarget.setCustomValidity('Enter password')}
                    onChange={(e) => setConfirmPassword(e.target.value)}    
                    placeholder="password" />

                    {error && <h3>{error}</h3>}
               </div>

               }
                
                { signIn   
                     ?  <div  className={style.AuthPage_Hero_CheckBoxAndForgotPW}>
                   <div>
                    <input type="checkbox" />
                    <p>Remember me</p>
                   </div>

                  <button type='button'>Forgot Password</button>

                </div>
                : ''
                }
               
               { signIn 
               ? 
               <button type='submit' className={style.AuthPage_Hero_Btn}>LOG IN</button>
               :    
               <button type='submit' className={style.AuthPage_Hero_Btn}>SIGN UP</button>
               }
               
                {
                    signIn 
                ?
               <span  className={style.AuthPage_Hero_SignUp}>
                  <p>Don’t have an account?</p>
                  <button type='button' onClick={() => setSignIn(false)}>SIGN UP</button>
               </span>
               : ''

               }

              { signIn 
              ?
               <div  className={style.AuthPage_Hero_SignInOptions}>
                 <h5>Or</h5>
                 <span>

                  <button type='button'><img src="../../img/Group 8187.svg" alt="" /></button>
                  <button type='button'><img src="../../img/Group 8188.svg" alt="" /></button>
                  <button type='button'><img src="../../img/Group 8189.svg" alt="" /></button>
                 </span>
                </div>
               :

               ''
              }
            </form>


        </div>
    )
}