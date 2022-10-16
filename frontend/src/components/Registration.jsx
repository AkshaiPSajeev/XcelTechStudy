import React,{useState} from 'react'
import axios from 'axios'
import { ACCESS_TOKEN_URL, GET_COUNTRYLIST_URL, REGISTER_USER_URL,GET_STATES_URL, GET_CITYS_URL } from '../API/API_URL'
import { AiOutlineClose } from "react-icons/ai";
import './Registration.css'
import { useEffect } from 'react'



function Registration() {
    
   const[Name,setName]=useState('');
   const[Email,setEmail]=useState('');
   const[Password,setPassword]=useState('');
   const[Mobile,setMobile]=useState('');
   const[CountryCode,setCountryCode]=useState('');
   const[CountryList,setCountryList]=useState([]);
   const[stateList,setStateList]=useState([]);
   const[CityList,setCityList]=useState([]);
   const[Country,setCountry]=useState('');
   const[State,setState]=useState('');
   const[City,setCity]=useState('');
   const[error,setError]=useState(false);
   const[errorMsg,setErrorMsg]=useState('');
   const[authToken,setAuthToken]=useState('');
    let auth_token='';
    
   const getAuthtoken=async()=>{
    const api_token='4RiSXzAHh9FEqLb4yydEmzRTAkawW2PWclictGJLKuaWe4W2IUrKTl6X4fQdTIZbh7Q';
    const config = {
        headers: {
            "Accept": "application/json",
            "api-token": api_token,
            "user-email": "akshaipsajeev@gmail.com"
        },
      };

    return new Promise(async(resolve,reject)=>{
       
        await  axios.get(ACCESS_TOKEN_URL,config).then((response)=>{
        resolve(response.data.auth_token);
       })
      
       
    })
   }
   const getCountryList=async()=>{
        const auth_token=await getAuthtoken();
        
    const config={
        headers:{
            "Authorization": `Bearer ${auth_token}`,
            "Accept": "application/json"
        }
    }

    return new Promise(async(resolve,reject)=>{
        await axios.get(GET_COUNTRYLIST_URL,config).then((response)=>{
            //console.log(response.data);
            setCountryList(response.data)
            resolve(response.data)
        })
    });
  }
  const getStateList=async(country)=>{
    const auth_token=await getAuthtoken();
    const config={
        headers:{
            "Authorization": `Bearer ${auth_token}`,
            "Accept": "application/json"
        }
    }
    return new Promise(async(resolve,reject)=>{
        await axios.get(GET_STATES_URL(country),config).then((response)=>{
            console.log(response.data);
            setStateList(response.data)
            resolve(response.data)
        })
    });
  }

  const getCityList=async(state)=>{
    const auth_token=await getAuthtoken();
    
    const config={
        headers:{
            "Authorization": `Bearer ${auth_token}`,
            "Accept": "application/json"
        }
    }
    console.log(GET_CITYS_URL(state));
    return new Promise(async(resolve,reject)=>{
        await axios.get(GET_CITYS_URL(state),config).then((response)=>{
            console.log(response.data);
            setCityList(response.data);
            resolve(response.data);
        })
    });
  }
    
   const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(Name);
    console.log(Email);
    console.log(Password);
    console.log(Country);
    console.log(State);
    console.log(City);          
    console.log(Mobile);


    if(Name===''||Email===''||Password===''||Country===''||State===''||City===''||Mobile===''){
        setError(true);
        setErrorMsg('All fields required');
    }else if(!Name.match(/[A-Za-z]$/)){
        setError(true);
        setErrorMsg('Enter Valid Name');
    }else if(!Email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        setError(true);
        setErrorMsg('Enter valid Email');
    }
   }
   
   const selectCountry=async(e)=>{
    let obj= CountryList.filter((country)=>country.country_name==e.target.value);
    setCountry(e.target.value)
    setCountryCode(CountryList.filter((country)=>country.country_name==e.target.value)[0].country_phone_code)
    console.log('iasodjoj');
    console.log(CountryCode);
    getStateList(e.target.value);
   }
   const selectState=async(e)=>{
    getCityList(e.target.value);
   }

  useEffect(()=>{
   getCountryList();

  },[])
  return (
    <>
        <div className='flex justify-center md:mt-10' >

   
        <div className=' border border-gray-400 rounded-md w-96 pt-4 pb-4'>
            <div className='flex justify-center '>
            <h3 className="text-2xl font-semibold">Registration</h3>
            
            </div>
            <div className='flex justify-center'>
            {error&&
            <div  className='bg-red-300 flex text-center p-1 mt-2 rounded-md'>
            <span className=' text-red-700 font-semibold  rounded'>{errorMsg} </span>
            <AiOutlineClose className="text-sm hover:cursor-pointer ml-2 " onClick={()=>setError(false)}/>   
            </div> 
            }  
            </div>
           
            <div className='mt-4'>
                <form onSubmit={handleSubmit}>
                    <div className='pt-2 pb-2 flex justify-around'>
                        <input type="text" placeholder='Name' onChange={(e)=>setName(e.target.value)} className='border rounded-md pt-1 pb-1 pl-2 w-[80%] border-gray-300 '/>
                    </div>
                    <div className='pt-2 pb-2 flex justify-around'>
                    <input type="text" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} className='border rounded-md pt-1 pb-1 pl-2 w-[80%] border-gray-300  '/>
                    </div>
                    <div className='pt-2 pb-2 flex justify-around'>
                    <input type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)} className='border rounded-md pt-1 pb-1 pl-2 w-[80%] border-gray-300 '/>
                    </div>
                    <div className='pt-2 pb-2 flex justify-around'>
                    <select name="Country"  id="" className='border border-gray-300 rounded-md pt-2 pb-2 w-[80%] ' onChange={selectCountry}>
                            <option >
                             Country
                            </option>
                            {CountryList.map((country,i)=>{
                                return(
                                    <option key={i} value={country.country_name} className=''>
                                        {country.country_name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='pt-2 pb-2 flex justify-around'>
                    <select name="State" id="" className='border border-gray-300 rounded-md pt-2 pb-2 w-[80%] ' onChange={selectState}>
                            <option >
                             State
                            </option>
                            {stateList.map((state,i)=>{
                                return(
                                    <option key={i} value={state.state_name}>
                                        {state.state_name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='pt-2 pb-2 flex justify-around'>
                    <select name="City" id="" className='border border-gray-300 rounded-md pt-2 pb-2 w-[80%] ' >
                            <option >
                             City
                            </option>
                            {CityList.map((city,i)=>{
                                return(
                                    <option key={i} value={city.city_name}>
                                        {city.city_name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='pt-2 pb-2 flex justify-around'>
                        
                    <input type="text" placeholder='Mobile' onChange={(e)=>setMobile(e.target.value)} className='border rounded-md pt-1 pb-1 pl-2 w-[80%] border-gray-300 '/>
                    </div>
                   
                    <div className='pt-2 pb-2 flex justify-around border-gray-300 '>
                  
                    <button className='border rounded-md p-1 w-[80%] font-bold  text-white bg-gradient-to-r from-blue-700  to-blue-600 hover:bg-gradient-to-br hover:scale-105'>Register</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    </>
  )
}


export default Registration