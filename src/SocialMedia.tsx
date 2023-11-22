import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./Components/Home"
import { Nav } from "./Components/Nav"
import { PageNotFound } from "./Components/PageNotFound"
import { UsersSection } from "./Components/UsersSection"
import { About } from "./Components/About"
import { QueryClient, QueryClientProvider } from "react-query"

const SocialMedia = () =>{
    const queryClient = new QueryClient();
    
    return(
    
        <QueryClientProvider client={queryClient}>

            <BrowserRouter>
                <Nav />
                <Routes>
                    <Route path="/" element={ <Home /> } />
                    <Route path="home" element={ <Home /> } />
                    <Route path="about" element={ <About /> } />
                    <Route path="users" element={ <UsersSection />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
            </QueryClientProvider>
    )
}

export default SocialMedia