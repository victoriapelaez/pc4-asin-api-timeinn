import * as helper from './helper.js'

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
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error en el Fetch:', error);
  }
}

//funcion añadir evento
export async function addEvent(data) {
  try {
    fetch(URL_ENDPOINT + '/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('Error en el Fetch:', error);
  }
}

//funcion delete 1 event
export async function deleteEvent(id) {
  try {
    const response = await fetch(URL_ENDPOINT + `/events/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en el Fetch:', error);
  }
}

//funcion actualizar evento
export async function editEvent(id, data) {
  try {
    fetch(URL_ENDPOINT + `/events/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('Error en el Fetch:', error);
  }
}
//////////////////////////////////////////////////////////////////////

//get images

const imageUrl = 'http://localhost:3000/events';

 export async function getImage(id) {
  const response = await fetch(imageUrl + '/' + id);
  const json = await response.json();
  const response2 = await fetch(json.imgURL);
  const blob = await response2.blob();
  const url = URL.createObjectURL(blob);
  return url;
  
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const URL_USERS = 'http://localhost:3001';

//login
export async function loginUser(email, password) {
  try {
    const response = await fetch(URL_USERS + '/auth/login', {
      method: 'GET',
      headers: { Authorization: 'Basic ' + btoa(`${email}:${password}`) },
    });
    const dataToken = await response.json();
    helper.setCookie(`token=${dataToken.access_token}; max-age=604800; path=/; SameSite=Lax;`);
  } catch (error) {
    console.error('Error en el Fetch:', error);
  }
}

//register
export async function registerUser(user) {
  try {
    fetch(URL_USERS + '/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    });
  } catch (error) {
    console.error('Error en el Fetch:', error);
  }
}

//get news from api
export async function getNews(token) {
  try {
  const promise = await fetch(URL_USERS + '/news', {
    method: "GET",
    headers: {
      Authorization: 'Bearer ' + token
    }
  });
  const news = await promise.json();
  if (!promise.ok) throw new Error(`${news.message} (${promise.status})`);
    return news;
} catch (err) {
  console.error(err)
}
}