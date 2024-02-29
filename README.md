<a name="readme-top"></a>

<!-- TABLE OF CONTENTS -->

# 📗 Table of Contents

- [📖 About the Project](#about-project)
  - [🛠 Built With](#built-with)
    - [Tech Stack](#tech-stack)
    - [Key Features](#key-features)
    - [🚀 Live Demo](#live-demo)
- [💻 Getting Started](#getting-started)
  - [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Install](#install)
  - [Usage](#usage)
  - [Run tests](#run-tests)
- [👥 Authors](#authors)
- [🔭 Future Features](#future-features)
- [🤝 Contributing](#contributing)
- [⭐️ Show your support](#support)
- [🙏 Acknowledgements](#acknowledgements)
- [📝 License](#license)

<!-- PROJECT DESCRIPTION -->

# 📖 RICK & MORTY <a name="about-project"></a>

> This React app retrieves information about locations and their residents from the Rick and Morty API. It provides search/filter functionality, displays location details, and allows users to view resident information, along with the ability to add notes about a character.



## 🛠 Built With <a name="built-with"></a>

### Tech Stack <a name="tech-stack"></a>
<details>
  <summary>Client</summary>
  <ul>
    <li><a href="#">HTML</a></li>
    <li><a href="#">CSS</a></li>
    <li><a href="https://getbootstrap.com/">Bootstrap</a> Utilized for basic styling and responsive layout. </li>
    <li><a href="https://reactjs.org/">React.js</a> Used for building the user interface with a component-based architecture.</li>
     <li><a href="https://react-redux.js.org/">React/Redux</a> Implemented for state management, especially for handling asynchronous data fetching.</li>
  </ul>
</details>

### Key Features <a name="key-features"></a>

- [x] Set up the project using (CRA) create-react-app👍.
- [x] Remove the boilerplate from the project after setting up💯.
- [x] Install Redux-toolkit and configure
- [x] Install bootstrap package and configure

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🚀 Live Demo <a name="live-demo"></a>

- [a link to the online version]()

- [a link to a presentation about this project]()

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 💻 Getting Started <a name="getting-started"></a>



To create the up, follow these steps.

### Prerequisites

In order to run this project you need to have the following installed;
- Node.js
- npm

You also need to have a basic understanding of React JS, Redux and bootstrap.


### Setup
 Set up the project using (CRA) create-react-app to your desired folder👍 (rick_morty folder)
```sh
npx create-react-app rick_morty
cd rick_morty
npm start
```
This will start the application in development mode. You can now open the application in your browser by navigating to `http://localhost:3000`.


### Install

Install the neccesary packages:
```sh
npm install @reduxjs/toolkit bootstrap axios react-router-dom
```
### setting up Redux
- Create listSlice to retrieve location data and add the reducers to store.js.
- Create residentsSlice to fetch resident data and add the reducers to store.js.
= Create detailsSlice to get resident details and add to store.js

```sh

```

### setting up Components
- Create the main component (List.jsx) to display resident details and locations.
- Develop a details component (ResidentDetails.jsx) to display details for a specific resident.
- Implement a note component (NoteForm.jsx) to enable users to add notes.

```sh
  npm start
```
### setting up Assets
- add relevant assets (fonts, custom styles, and images)

### setting up Layout
-Create a layout file to define the structure of the main wireframe.
```sh
import PropTypes from 'prop-types';

const Layout = ({ children }) => (
  <>
    <main>{children}</main>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;


```

### Run tests

To run tests for the linter, run the following command:

```sh
 npx hint .
npx eslint . --fix

```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- AUTHORS -->

## 👥 Authors <a name="authors"></a>

👤 **Lawrence Muema Kioko**
- GitHub: [@githubhandle](https://github.com/Kidd254)
- Twitter: [@twitterhandle](https://twitter.com/lawrenc98789206)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/lawrence-muema-kioko-972035240/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FUTURE FEATURES -->

## 🔭 Future Features <a name="future-features"></a>
-create 


- [x] I will test this app using the library from React or maybe use Jest to test it👌💯.
- [x] 
- [x] 


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## 🤝 Contributing <a name="contributing"></a>

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/Kidd254/Rick-Morty/issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- SUPPORT -->

## ⭐️ Show your support <a name="support"></a>

- If you like this project you can give me a star 😊 just to prove my app that it is useful for everyone and the users can use it to calculate anything 💯.


<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🙏 Acknowledgments

-  Thanks to [Shamiri Institute](https://www.shamiri.institute/) for providing the API used in this project.
-  Inspiration for this project came from the amazing world of Rick and Morty.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
<!-- LICENSE -->
## ❓ FAQ


- Can I copy this project?

    Your are welcome, copy this project and let me know if you need something.

## 📝 License <a name="license"></a>

This project is [MIT](https://github.com/Kidd254/Math-Magicians-React-App/blob/set-up/LICENSE) licensed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
