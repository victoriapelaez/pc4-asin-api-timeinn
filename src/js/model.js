const URL_ENDPOINT = 'http://localhost:3000';

//funcion get all events
export async function getDataAllEvents() {
  try {
    const response = await fetch(URL_ENDPOINT + '/events');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error en el Fetch:', error);
  }
}

//funcion get 1 event
export async function getOneEvent(id) {
  try {
    const response = await fetch(URL_ENDPOINT + `/events/${id}`);
    console.log(data);
    return data;
  } catch (error) {
    console.log('Error en el Fetch:', error);
  }
} 

//funcion añadir evento
export async function addEvent(data) {
  try {
    const response = await fetch(URL_ENDPOINT + '/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log('Error en el Fetch:', error);
  }
}

//funcion delete 1 event
export async function deleteEvent(id) {
  try {
    const response = await fetch(URL_ENDPOINT + `/events/${id}`,
    {
      method:'DELETE',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error en el Fetch:', error);
  }
}  

//funcion actualizar evento
export async function editEvent(id, data){
try {
    const response = await fetch(URL_ENDPOINT + `/events/${id}`,{
      method:'PATCH',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify(data)
      }).then(response => console.log(response.status));
  } catch (error) {
    console.log('Error en el Fetch:', error);
  }
} 


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7

//function users
/* export async function getUserData() {
  try {
    const response = await fetch(URL_ENDPOINT + '/events');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error en el Fetch:', error);
  }
} */
