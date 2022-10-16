import axios from 'axios';
const ACCESS_TOKEN_URL=require('../API/API_URL')
const GET_COUNTRYLIST_URL=require('../API/API_URL')


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

export const getCountryList=async()=>{
    const auth_token=await getAuthtoken();
    
const config={
    headers:{
        "Authorization": `Bearer ${auth_token}`,
        "Accept": "application/json"
    }
}

return new Promise(async(resolve,reject)=>{
    await axios.get(GET_COUNTRYLIST_URL,config).then((response)=>{
        console.log(response.data);
       
        resolve(response.data)
    })
});
}

const getStateList=()=>{

}

const getCityList=()=>{

}

