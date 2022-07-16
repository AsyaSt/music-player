



export function sendForm (url, data) {
    return fetch(`http://player-api/api/${url}`, {
        method: 'POST',
        body: data,
        headers: {
          
          ...(localStorage.authToken ? {"Authorization": "Bearer " + localStorage.authToken} : {})
          
          },
      }).then(res => res.json())
      .then(data => {
          if(data.token) {
            console.log(data)
            return data
          } else {
            console.log(data);
            return data 
          }
      })
} 