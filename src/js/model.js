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
/* export async function getOneEvent(id) {
  try {
    const response = await fetch(URL_ENDPOINT + `/events/${id}`);
    console.log(data);
    return data;
  } catch (error) {
    console.log('Error en el Fetch:', error);
  }
} */

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
    const response = await fetch(URL_ENDPOINT + `/events/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error en el Fetch:', error);
  }
}

//funcion actualizar evento
export async function editEvent(id, data) {
  try {
    const response = await fetch(URL_ENDPOINT + `/events/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(response => console.log(response.status));
  } catch (error) {
    console.log('Error en el Fetch:', error);
  }
}
//////////////////////////////////////////////////////////////////////

//get images

async function getImage() {
  let link = document.createElement('a');
  // Fetch número 1
  const response1 = await fetch(URL_ENDPOINT + '/events');
  /* console.log(response1); */
  const json = await response1.json();
  /* console.log(json); */
  /* let object = JSON.stringify(json)
  let objectImg = object.imgURL
  console.log(object); */
  const response2 = await fetch(json.imgUrl);
  let blob = new Blob(['json']);
  /* console.log(response2);
  console.log(blob) */;
  const imatge = await response2.blob();
  /* console.log(imatge); */
  link.href = URL.createObjectURL(imatge);
  /* console.log(link.href); */
}
getImage(URL_ENDPOINT).catch(error =>
  console.log('Error en codi asíncron', error)
);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const URL_USERS = 'http://localhost:3001';

//login
export async function loginUser(email, password) {
  console.log(email);
  console.log(password);
  try {
    const response = await fetch(URL_USERS + '/auth/login', {
      method: 'GET',
      headers: { Authorization: 'Basic ' + btoa(`${email}:${password}`)},
    });
    const dataToken = await response.json();
    return dataToken.access_token;
  } catch (error) {
    console.log('Error en el Fetch:', error);
  }
}

//register
export async function registerUser(user) {
  try {
    const response = await fetch(URL_USERS + '/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    });
    console.log(user);
  } catch (error) {
    console.log('Error en el Fetch:', error);
  }
}
