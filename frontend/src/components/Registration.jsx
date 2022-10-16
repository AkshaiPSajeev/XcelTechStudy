import React,{useState} from 'react'
import axios from 'axios'
import { ACCESS_TOKEN_URL, GET_COUNTRYLIST_URL, REGISTER_USER_URL,GET_STATES_URL, GET_CITYS_URL } from '../API/API_URL'
import { AiOutlineClose } from "react-icons/ai";
import './Registration.css'
import { useEffect } from 'react'
import Swal from 'sweetalert2'


function Registration() {
    

   const [CountryList,setCountryList]=useState([]);
   const [stateList,setStateList]=useState([]);
   const [CityList,setCityList]=useState([]);

   const [error,setError]=useState(false);
   const [errorMsg,setErrorMsg]=useState('');

   const [authToken,setAuthToken]=useState('');
   const initialState={Name:'',Email:'',Password:'', Country:'',State:'',City:'',Mobile:''}
   const [formData,setFormData]=useState(initialState);
    
    console.log(process.env.REACT_APP_ACCESS_TOKEN);
    const handleChange=(e)=>{
        setFormData((prev)=>{
            return{
                ...prev,
                [e.target.name]:e.target.value
            }
        })
    }
   const getAuthtoken=async()=>{
    const api_token=process.env.REACT_APP_ACCESS_TOKEN;
    const config = {
        headers: {
            "Accept": "application/json",
            "api-token": api_token,
            "user-email":process.env.REACT_APP_USER_EMAIL
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
            // console.log(response.data);
            setCountryList(response.data)
            // console.log(CountryList);
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
            // console.log(response.data);
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
            
            setCityList(response.data);
            resolve(response.data);
        })
    });
  }
    
   const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(formData);
    if(formData.Name===''||formData.Email===''||formData.Password===''||formData.Country===''||formData.State===''||formData.City===''||formData.Mobile===''){
        setError(true);
        setErrorMsg('All fields required');
    }else if(!formData.Name.match(/[A-Za-z]$/)){
        setError(true);
        setErrorMsg('Enter Valid Name');
        setFormData((prev)=>{
            return{
                ...prev,
                "Name":''
            }
        })
    }else if(!formData.Email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        setError(true);
        setErrorMsg('Enter valid Email');
        setFormData((prev)=>{
            return{
                ...prev,
                "Email":''
            }
        })

    }else if(formData.Password.length<6){
        setError(true);
        setErrorMsg('Password length should be atleast 6')
    }else if(!formData.Mobile.match(/^\d{10}$/)){
        setError(true);
        setErrorMsg('Enter Valid phone number')
        setFormData((prev)=>{
            return{
                ...prev,
                "Mobile":''
            }
        })
    }else{
        axios(
            {
                method:'post',
                url:REGISTER_USER_URL,
                data:formData
            }
        ).then((response)=>{
           
            if(response.status===200){ 
                setFormData(initialState)
                Swal.fire({
                   
                    icon: 'success',
                    title: 'User inserted Successfully',
                    showConfirmButton: false,
                    timer: 1500
                  });
                 
            }else if(response.status===403){
                Swal.fire("Email already Exist")
                setFormData((prev)=>{
                    return{
                        ...prev,
                        "Email":''
                    }
                })
            }
           
        }).catch((err)=>{
            Swal.fire("Email already Exist")
            setFormData((prev)=>{
                return{
                    ...prev,
                    "Email":''
                }
            })
        })
    }
   }
   


  useEffect(()=>{
   getCountryList();

  },[])
  return (
    <>
        <div className='flex justify-center md:mt-10 mt-0' >

   
        <div className=' border border-white rounded-md w-96 pt-4 pb-4 shadow-md shadow-slate-800'>
            <div className='flex justify-center '>
            <h3 className="text-2xl font-semibold text-gray-600">Registration</h3>
            
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
                        <input type="text" name='Name' placeholder='Name' onChange={handleChange} className='border rounded-md pt-1 pb-1 pl-2 w-[80%] border-gray-300 ' value={formData.Name}/>
                    </div>
                    <div className='pt-2 pb-2 flex justify-around'>
                    <input type="text" name='Email' placeholder='Email' onChange={handleChange} className='border rounded-md pt-1 pb-1 pl-2 w-[80%] border-gray-300  ' value={formData.Email}/>
                    </div>
                    <div className='pt-2 pb-2 flex justify-around'>
                    <input type="password" name='Password' placeholder='Password' onChange={handleChange} className='border rounded-md pt-1 pb-1 pl-2 w-[80%] border-gray-300 ' value={formData.Password}/>
                    </div>
                    <div className='pt-2 pb-2 flex justify-around'>
                    <select   className='border border-gray-300 rounded-md pt-2 pb-2 w-[80%] text-gray-500 pl-1 ' onChange={(e)=>{handleChange(e);getStateList(e.target.value);}} name='Country' value={formData.Country}>
                            <option >
                             Country
                            </option>
                            
                            {CountryList.map((c,i)=>{
                                return(
                                    <option key={i} value={c.country_name} className='tex'>
                                        {c.country_name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='pt-2 pb-2 flex justify-around'>
                    <select  id="" className='border border-gray-300 rounded-md pt-2 pb-2 w-[80%] text-gray-500 pl-1 ' onChange={(e)=>{handleChange(e);getCityList(e.target.value)}} name='State' value={formData.State} >
                            <option >
                             State
                            </option>
                            {stateList.map((state,i)=>{
                                return(
                                    <option key={i} >
                                        {state.state_name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='pt-2 pb-2 flex justify-around'>
                    <select  id="" className='border border-gray-300 rounded-md pt-2 pb-2 w-[80%] text-gray-500 pl-1 ' onChange={handleChange} name='City' value={formData.City}>
                            <option >
                             City
                            </option>
                            {CityList.map((city,i)=>{
                                return(
                                    <option key={i} value={city.city_name} >
                                        {city.city_name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='pt-2 pb-2 flex justify-around'>
                        
                    <input type="text" placeholder='Mobile' name='Mobile' onChange={handleChange} className='border rounded-md pt-1 pb-1 pl-2 w-[80%] border-gray-300 ' value={formData.Mobile}/>
                    </div>
                   
                    <div className='pt-2 pb-2 flex justify-around border-gray-300 '>
                  
                    <button className=' rounded-md p-1 w-[80%] font-bold  text-white bg-gradient-to-r from-blue-700  to-blue-600 hover:bg-gradient-to-br hover:scale-105'>Register</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    </>
  )
}


export default Registration