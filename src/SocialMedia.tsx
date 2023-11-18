import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./Components/Home"
import { Nav } from "./Components/Nav"
import { PageNotFound } from "./Components/PageNotFound"


const SocialMedia = () =>{

    return(
    
        <div>
            <BrowserRouter>
                <Nav />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="home" element={<Home />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default SocialMedia