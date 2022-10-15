import React,{useState} from 'react'
import axios from 'axios'
import { REGISTER_USER_URL } from '../utils/API_URL'
import Swal from 'sweetalert2'
function Registration() {
    
    const initialValues = { Email:"", Password:"", Name: "", Mobile: "", Phone: "",Country:'',State:'',City:'' };
    const [formValues, setFormValues] = useState(initialValues);
    const[error,setError]=useState('');
    const[errMsg,setErrMsg]=useState('')
    const [emailerr,setEmailerr]=useState('')
    const contry = [
        { value: 'USA', label: 'USA' },
        { value: 'India', label: 'India' },
    ]
    const state = [
        { value: 'keral', label: 'Kerala' },
        { value: 'delhi', label: 'Delhi' },
    ]
    const city = [
        { value: 'Thrissur', label: 'Thrissur' },
        { value: 'Kochi', label: 'Kochi' },
    ]
  const handleChange = (e) => {
        setFormValues((prev) => {
          return {
            ...prev,
            [e.target.name]: e.target.value,
          };
        });
      };
    const registerUser=async()=>{
        
        const data={
            Name:formValues.Name,
            Email:formValues.Email,
            Password:formValues.Password,
            Mobile:formValues.Mobile,
            Country:formValues.Country,
            State:formValues.State,
            City:formValues.City
        }
        axios.post(REGISTER_USER_URL,data).then((response)=>{
                setFormValues(initialValues);
                 Swal.fire({icon: 'success',
                 title: 'User add Successfully',
                 showConfirmButton: false,
                  timer: 1500
                  })

        }).catch((err)=>{
           
        })
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
       
        const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
       setEmailerr(regEx)
     
        if (formValues.Name.length === 0 && formValues.State.length === 0 && formValues.City.length === 0 && !regEx.test(formValues.Email) && formValues.Email.length === 0 && formValues.Country.length === 0 && formValues.Mobile.length === 0 && formValues.Password.length === 0) {
            setError("true")
        }


    if (regEx.test(formValues.Email) && formValues.State.length !== 0  && formValues.City.length !== 0 && formValues.Name.length !== 0 && formValues.Email.length !== 0 && formValues.Mobile.length != 0 && formValues.Country.length != 0 && formValues.Password.length != 0) {
            registerUser();
        }


    }

  return (
    <>
        <div>
            <div className="grid grid-cols-1  h-screen w-full " >
              
           
                {/* log in component */}
                <div className='bg-gradient-to-r from-violet-600 to-cyan-500 flex flex-col justify-center'>
                    <div className='visible sm:invisible '>

                    </div><br />
                    <div className='bg-gradient-to-r from-violet-600 to-cyan-500 flex flex-col justify-center'>
                        <form onSubmit={handleSubmit}
                            className='shadow-black max-w-[400px] w-full   mx-auto bg-white p-8 px-8 rounded-3xl'

                        >
                            <h1 className='font-bold text-center text-2xl '>Register User</h1>
                           
                            <span className='flex font-bold justify-center text-red-500'>{errMsg}</span>

                            <div className='flex flex-col text-grey-500 py-2'>
                                <input className=' rounded-full bg-blue-100 mt-2 p-2 focus:border-blue-500 focus:bg-grey-800 focus:outline-green-400'
                                    placeholder='Name'
                                    type="text"
                                    name='Name'
                                    value={formValues.Name}
                                    onChange={handleChange}
                                /><span>{error && formValues.Name.length <= 0 ?
                                    <label style={{ color: "red" }} >Name cannot be empty </label> : ""}</span>
                               


                                <input className=' rounded-full bg-blue-100 mt-2 p-2 focus:border-blue-500 focus:bg-grey-800 focus:outline-green-400'
                                    placeholder='Email Address'
                                    type="text"
                                    name='Email'
                                    value={formValues.Email}
                                    onChange={handleChange}
                                />
                                <span className=' text-red-500 ' >{error && !emailerr.test(formValues.Email) ?
                    'Enter a valid Email' : ""}
                </span>


                                <input className=' rounded-full bg-blue-100 mt-2 p-2 focus:border-blue-500 focus:bg-grey-800 focus:outline-green-400'
                                    placeholder='Phone Number'
                                    type="text"
                                    name='Mobile'
                                    value={formValues.Mobile}
                                    onChange={handleChange} />
                                <span>{error && formValues.Mobile.length <= 0 ?
                                    <label style={{ color: "red" }} >Phone cannot be empty </label> : ""}</span>
                               


                                <input className='rounded-full bg-blue-200 mt-2 p-2 focus:border-red-500 focus:bg-grey-800 focus:outline-green-400'
                                    placeholder='Password'
                                    type="password"
                                    name='Password'
                                    value={formValues.Password}
                                    onChange={handleChange}
                                />
                                <span>{error && formValues.Password.length <= 0 ?
                                    <label style={{ color: "red" }} >Password cannot be empty </label> : ""}</span>
                               


                                <select name='Country' onChange={handleChange} className='rounded-full bg-blue-200 mt-2 p-2  focus:outline-green-400 required:selection:'>
                                    <option >
                                        Country
                                    </option>
                                    {contry.map((data, i) => (

                                        <option key={i} value={data.value}>
                                            {data.label}
                                        </option>
                                    ))}

                                </select><span>{error && formValues.Country.length <= 0 ?
                                    <label style={{ color: "red" }} >select any</label> : ""}</span>
                                      <select name='State' onChange={handleChange} className='rounded-full bg-blue-200 mt-2 p-2  focus:outline-green-400 required:selection:'>
                                    <option >
                                        State
                                    </option>
                                    {state.map((data, i) => (

                                        <option key={i} value={data.value}>
                                            {data.label}
                                        </option>
                                    ))}

                                </select><span>{error && formValues.State.length <= 0 ?
                                    <label style={{ color: "red" }} >select any</label> : ""}</span>
                                      <select name='City' onChange={handleChange} className='rounded-full bg-blue-200 mt-2 p-2  focus:outline-green-400 required:selection:'>
                                    <option >
                                        City
                                    </option>
                                    {city.map((data, i) => (

                                        <option key={i} value={data.value}>
                                            {data.label}
                                        </option>
                                    ))}

                                </select><span>{error && formValues.City.length <= 0 ?
                                    <label style={{ color: "red" }} >select any</label> : ""}</span>
                            </div>

                            {/* <div className='flex justify-between text-gray-500 py-2'>
                            </div> */}
                           

                            <button className=' w-full  inline-block px-12 py-2.5 bg-green-600 text-white  leading-tight text-xl font-bold rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out  shadow-green-600/50 '>
                               Register
                            </button>
                           

                         


                            <div>
                               
                            </div>



                        </form>
                    </div>

                </div>




            </div >
        </div >
    </>
  )
}

export default Registration