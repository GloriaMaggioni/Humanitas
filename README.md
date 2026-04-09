
# Humanitas

A dynamic Angular dashboard application, integrating multiple REST APIs and real-time data sources for user and content management.
The purpose of this projects is encourage people to learn something new, meet new people and to have joy and curiosity for the unknown ,especially for the culture


## Features

-**User Management** Browse paginated users from the GoRest API, search by name, and add new users via form 

-**Posts Management**: View all posts and their comment could be create and delete 

-**Events Page** Discover live events by location powered by the Ticketmaster Discovery API

-**Dinamic carousel**: Dynamic image carousel sourced a few information on the important characters from the history and contemporary years, using Firebase Firestore as the simple database

-**Responsive Desing**: Fully responsive mobile-first layout built with Tailwind CSS

-**SnackBar Notification**: User feedback for all create/delete/error actions via Angular Material Snackbar


## Tech Stack


- **Angular** : core framework
- **TailwindCSS** : Utility-first responsive styling
- **Angular Material**: used for simple design element
- **RxJs**: Reactive state management (BehaviorSubject, switchMap)
- **Firestore**: database for carousel content
- **AngularFire** : Firebase integration
- **Karma**: Test runner
- **Jusmine**: Unite testing framework





## Prerequisites
Make sure you have the following installed before proceeding:

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)
- Angular CLI

```
npm install -g @angular/cli
```

- A GoRest account with a Bearer token → gorest.co.in
- A Ticketmaster Developer account with an API key → developer.ticketmaster.com
- A Firebase project with Firestore enabled → console.firebase.google.com
## Installation & Local setup

1. Clone the repository
```bash
git clone https://github.com/your-username/humanitas.git
cd humanitas
```

2. Install dependencies
```bash
npm install
```
3. Configure environment variables

Create or edit the file src/environments/environment.ts with your own credentials:

```bash
typescriptexport const environment = {
  production: false,
  goRestToken: 'YOUR_GOREST_BEARER_TOKEN',
  ticketmasterApiKey: 'YOUR_TICKETMASTER_API_KEY',
  firebaseConfig: {
    apiKey: 'YOUR_FIREBASE_API_KEY',
    authDomain: 'YOUR_PROJECT.firebaseapp.com',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_PROJECT.appspot.com',
    messagingSenderId: 'YOUR_SENDER_ID',
    appId: 'YOUR_APP_ID'
  }
};
```
⚠️ ***Security note — These keys are stored client-side for educational purposes only. In a production environment, API keys should be protected via a backend proxy (e.g. Node.js/Express or Firebase Cloud Functions).***

4. Running the App
```bash
ng serve
```
## APIs used
- *GoRest*:  Users and posts CRUD (requires Bearer token) 
- *Ticketmaster*: Live events discovery
- *Firestore*: Real-time carousel content
## Roadmap

**Homepage**
 Show the partial list of users and posts

**Event page**:
Show list of events with the purpose of incorauge people to meet person with the same interests and to learn something new, especially about culture

**History page**
Show list about instruments and object , using into the past with the perpose to teach to people about what our ancestors did

**Future Page**
Show a curated list of cultural events .
The purpose of this page is to inspire users to discover cultural experiences that can enrich their lives and contribute to a better future.

**Spazi vulturali**
Show the map where the users can find the cultural and interesting places near them


## Author

- [@GloriaMaggioni](https://github.com/GloriaMaggioni)


## Testing

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```
