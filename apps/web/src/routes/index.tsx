import { createBrowserRouter } from "react-router";
import { Home } from "../pages/Home";
import type { InfoResponse } from "../types/api/InfoResponse";
import { Login } from "../pages/Login";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await fetch("http://localhost:3000/user/info", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Aqui vai o Bearer token
            "Content-Type": "application/json",
          },
        })

        const responseJson:InfoResponse = await response.json()
        console.log(responseJson)
        if(!response.ok || !responseJson.success){
          console.error("Error ao receber os dados")
          return
        }

        return { records: responseJson.data }
      } catch (error) {
        console.error(error)
      }
    },
  },
  {
    path: "/login",
    element: <Login/>,
  },
])