import * as data from './data.js'; //Este es el import que trae los datos en la versión no-asincrona
import * as model from './model.js';

import * as helper from './helper.js';

import * as headerFooter from './header-footer.js';
import * as firstSection from './landingPage/firstSection.js';
import * as secondSection from './landingPage/secondSection.js';
import * as subscription from './landingPage/subsModal.js';
import * as calendar from './landingPage/calendar.js';
import * as newsSection from './landingPage/outstandingNews.js';
import * as scroll from './landingPage/scroll-up.js';
import * as eventPage from './event.js';
import * as allEventsPage from './all-events.js';
import * as newsPage from './all-news.js';
import * as loginValidation from './form-validation/login-validation.js';
import * as signupValidation from './form-validation/signup-validation.js';

// TODO: Parcel HMR (delete)
if (module.hot) {
  module.hot.accept();
}

/* const eventsDataCopy = [...model]; */

// ScrollUp handler
scroll.scrollUpHandler();

// Render header and footer
const userName = helper.filterUserCookie()?.replace('user=', '');
headerFooter.renderHeader(userName);
headerFooter.renderFooter();

let events = [];
window.addEventListener('load', () => {
  //const EVENTS = await model.getDataAllEvents();
  model.getDataAllEvents().then(data => {
    events = data;
    
    // Render the first section: events of the day
    firstSection.render(firstSection.generateVideoMarkup(events));
    firstSection.render(firstSection.generateInfoMarkup(events));

    // Render the second section: events of the week
    secondSection.generateImgBkg(events);
    secondSection.render(secondSection.generateInfoMarkup(events));
    secondSection.displayEventHandler(events);

    // Render the event when a tickets button is clicked
    eventPage.render(eventPage.generateEventMarkup(events));

    // Render all events into all-events page
    events.forEach(event =>
      allEventsPage.render(allEventsPage.generateEventsMarkup(event))
    );
    // Filter events by type
    allEventsPage.renderFilterButtons(
      allEventsPage.generateFilterMarkup(events)
    );
    allEventsPage.filterHandler(events);
    // Search events
    allEventsPage.searchHandler(events);
    // Filter events by date
    allEventsPage.btnFindHandler(events);
    // Upload and save new event
    allEventsPage.uploadBtnHandler(model.addEvent, events);
    //Delete event
    allEventsPage.deleteEventHandler(model.deleteEvent);
    //Edit Event
    allEventsPage.editEventHandler(model.editEvent, events);
  });
});

//Render Calendar
calendar.render(calendar.createCalendar());
calendar.addEventCalendar();

//Render the fourth section: news
newsSection
  .filterNews(data.theaterData.news)
  .slice(0, 4)
  .reverse()
  .forEach(news => newsSection.render(newsSection.generateNewsMarkup(news)));

// Generate cookie and render subscription modal
const cookies = helper.getCookies();
if (!cookies.includes('session=Cookie')) {
  // One week = 604800 seconds
  helper.setCookie('session=Cookie; max-age=604800; path=/; SameSite=Lax;');

  // Render modal form for subscription
  subscription.obsSect();
  subscription.addHandlerHideForm();
  subscription.sendBtnHandler();
}

// Render the all-news Page
newsSection
  .filterNews(data.theaterData.news)
  .forEach(news => newsPage.render(newsPage.generateAllNews(news)));
newsPage.showContent();



// Login
loginValidation.checkboxHandler();
loginValidation.sendToSignUpPage();
/* const usersData = helper.getLocalStorage(data.users); */
loginValidation.loginBtnHandler(model.loginUser);

// Signup
signupValidation.emailFocusHandler();
signupValidation.nameFocusHandler();

signupValidation.signupBtnHandler(model.registerUser);

/* signupValidation.passwFocusHandler(); 
signupValidation.passwMatchFocusHandler(); */

//Show passw
signupValidation.showPassw();
  