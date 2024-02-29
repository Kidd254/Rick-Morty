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

> Rick & Morty app is an app that is meant to display a list of characters, their residents and other details relevant to them. The app makes use of Rick & Morty API to retrieve relevant data for the app. The app has three interfaces. The first interface is displayed once the app renders, the second is displayed when a card with residential and location is clicked, and the third one is accessed when a user clicks add note.



## 🛠 Built With <a name="built-with"></a>

### Tech Stack <a name="tech-stack"></a>
<details>
  <summary>Client</summary>
  <ul>
    <li><a href="#">HTML</a></li>
    <li><a href="#">CSS</a></li>
    <li><a href="https://getbootstrap.com/">Bootstrap</a></li>
    <li><a href="https://reactjs.org/">React.js</a></li>
     <li><a href="https://react-redux.js.org/">React/Redux</a></li>
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
npm install @redux/toolkit
npm install bootstrap
npm install axios
npm install react-router-dom
```
### setting up Redux
-create listSlice to retrieve relevant location data (location id, location name, location type, and resident urls) and add the reducers to store.js

```sh
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'https://rickandmortyapi.com/api/location/';

export const getLocation = createAsyncThunk(
  'list/getLocation',
  async (thunkApi) => {
    try {
      const response = await axios.get(baseUrl);
      return response.data.results;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

const initialState = {
  list: [],
  status: null,
  error: null,
};

const listSlice = createSlice({
  name: 'list',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getLocation.pending, (state) => {
        if (state.list.length === 0) state.status = 'loading';
      })
      .addCase(getLocation.fulfilled, (state, action) => {
        if (state.list.length === 0) {
          state.status = 'succeeded';
          state.list = action.payload.map((listed) => ({
            id: listed.id,
            list_name: listed.name,
            list_type: listed.type,
            residentURLs: listed.residents,
          }));
        }
      })
      .addCase(getLocation.rejected, (state, action) => {
        if (state.list.length === 0) {
          state.status = 'failed';
          state.error = action.payload;
        }
      });
  },
});

export default listSlice.reducer;

```

- Create residentsSlice to retrieve resident name, resident status, resident image, and episodeUrls and add the reducers to store.js
  

```sh
  import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  residents: [],
  status: 'idle',
  error: null,
};

// async thunk for fetching residents
export const fetchResidents = createAsyncThunk(
  'residents/fetchResidents',
  async (residentURLs) => {
    const residentsData = await Promise.all(
      residentURLs.map((url) => axios.get(url).then((response) => response.data)),
    );
    return residentsData;
  },
);

// Create the residents slice
const residentsSlice = createSlice({
  name: 'residents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add the fetchResidents thunk to extraReducers
    builder
      .addCase(fetchResidents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchResidents.fulfilled, (state, action) => {
        if (state.residents.length === 0) {
          state.status = 'succeeded';
          // Correct the property name to match your payload
          state.residents = action.payload.map((resident) => ({
            id: resident.id,
            resident_name: resident.name,
            resident_status: resident.status,
            resident_image: resident.image,
            episodeURLs: resident.episode,
          }));
        }
      })
      .addCase(fetchResidents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default residentsSlice.reducer;
```

-Create detailsSlice to retrieve resident details and add to store.js
```sh
  import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDetails = createAsyncThunk(
  'details/fetchDetails',
  async (id, thunkApi) => {
    try {
      const baseUrl = `https://rickandmortyapi.com/api/character/${id}`;
      const response = await axios.get(baseUrl);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

const initialState = {
  details: [],
  status: null,
  error: null,
};

const detailsSlice = createSlice({
  name: 'details',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchDetails.pending, (state) => {
        if (state.details.length === 0) state.status = 'loading';
      })
      .addCase(fetchDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.details = [
          {
            id: action.payload.id,
            details_name: action.payload.name,
            details_image: action.payload.image,
            details_status: action.payload.status,
            details_gender: action.payload.gender,
            details_species: action.payload.species,
            details_location: action.payload.location.name,
            details_origin: action.payload.origin.name,
          },
        ];
      })
      .addCase(fetchDetails.rejected, (state, action) => {
        if (state.details.length === 0) {
          state.status = 'failed';
          state.error = action.payload;
        }
      });
  },
});

export default detailsSlice.reducer;

```

### setting up components
- create the main component to display resident details and location (List.jsx)
- create a details component to display details for specific resident (ResidentDetails.jsx)
- create a note component to enable a user add a note (NoteForm.jsx).

```sh
  npm start
```
### setting up assets
-add relevant assets (fonts, custom styles, and images)

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
- [x] Add the react-router dom for the project to navigate from the pages using the navigation
- [x] Add the Quotes component to fetch the quotes from the API 🚀


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

- I would like to thank Microverse for this opportunity.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
<!-- LICENSE -->
## ❓ FAQ

- What is this for?

    This is a React.js project created by Microverse to allow students learn and practice React.js.

- Can I copy this project?

    Your welcome, copy this project and let us know if you need something.

## 📝 License <a name="license"></a>

This project is [MIT](https://github.com/Kidd254/Math-Magicians-React-App/blob/set-up/LICENSE) licensed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
