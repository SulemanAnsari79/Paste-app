import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './components/Home.jsx'
import Navbar from './components/Navbar.jsx'
import Pastes from './components/Pastes.jsx'
import ViewPastes from './components/ViewPastes.jsx'


const router =createBrowserRouter(
  [
    {
      path: "/",
      element:
      <div>
        <Navbar />
        <Home />
      </div>
    },
    {
      path: "/pastes",
      element:
      <div>
        <Navbar />
        <Pastes />
      </div>
    },
    {
      path:"/pastes/:id",
      element:
      <div>
        <Navbar />
        <ViewPastes />
      </div>
    },
  ]
)



function App(){

  return(
    <div>
    <RouterProvider router={router} />
    </div>
  )
}

export default App
