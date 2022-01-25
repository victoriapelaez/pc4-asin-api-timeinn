const URL_ENDPOINT = 'http://localhost:3000';

export async function getDataAllEvents() {
  try {
    const response = await fetch(URL_ENDPOINT + "/events");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error en el Fetch:', error);
  }
}

//POST

/* function createEvent(dataEvent){
        fetch(url,{
          method:'POST',
          headers:{
            'Content-Type':'application/jason',
          },
          body: JSON.stringify({
            name:`${dataEvent.target.name.value}`,
            image:`${dataEvent.target.image.value}`
            //datos necesarios
          })
        })
        .then(response=>response.json())
        .then(generateEventsMarkup())
      } */
