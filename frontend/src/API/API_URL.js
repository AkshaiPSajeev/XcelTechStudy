export const REGISTER_USER_URL='http://localhost:8081/addUser'



export const ACCESS_TOKEN_URL='https://www.universal-tutorial.com/api/getaccesstoken';
export const GET_COUNTRYLIST_URL='https://www.universal-tutorial.com/api/countries/'

export const GET_STATES_URL=(country)=>`https://www.universal-tutorial.com/api/states/${country}`

export const GET_CITYS_URL=(state)=>`https://www.universal-tutorial.com/api/cities/${state}`