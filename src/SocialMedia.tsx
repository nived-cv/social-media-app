import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./Components/Home"
import { Nav } from "./Components/Nav"
import { PageNotFound } from "./Components/PageNotFound"
import DataProvider from "./Components/DataProvider"
import { UsersSection } from "./Components/UsersSection"


const SocialMedia = () =>{

    return(
    
        <div>
            <BrowserRouter>
                <Nav />
                <Routes>
                    <Route path="/" element={<DataProvider> <Home /> </DataProvider> } />
                    <Route path="home" element={<DataProvider> <Home /> </DataProvider> } />
                    <Route path="users" element={<DataProvider> <UsersSection /></DataProvider>} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default SocialMedia