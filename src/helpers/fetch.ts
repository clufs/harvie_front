
const baseUrl = import.meta.env.VITE_API_URL;


type methods = 'GET' | 'POST' | 'PUT' | 'DELETE';


export const fetchSinToken = (endpoint:string, data: any, method:methods = 'GET') => {
  
  const url = `${baseUrl}/${endpoint}`;
  
  if(method === 'GET') {
    return fetch( url );
  }else{
    return fetch( url, {
      method,
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

};

export const fetchConToken = (endpoint:string, data?: any, method:methods = 'GET') => {

  const url = `${baseUrl}/${endpoint}`;
  const token = localStorage.getItem('token') || '';
  
  if(method === 'GET') {
    return fetch( url, {
      method,
      headers:{
        'x-token': token,
      }
    });
  }else{
    return fetch( url, {
      method,
      headers:{
        'Content-type': 'application/json',
        'x-token': token
      },
      body: JSON.stringify(data)
    })
  }
}






