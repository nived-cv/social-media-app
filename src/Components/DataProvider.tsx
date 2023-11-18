
import { QueryClient, QueryClientProvider, useQuery} from 'react-query'

type Props ={
    children : React.ReactNode
}

const fetchUsers = async() =>{

    const data = await fetch("https://gorest.co.in/public/v2/users")
    return data.json()
}

const fetchPosts = async() =>{

    const data = await fetch("https://gorest.co.in/public/v2/posts")
    return data.json()
}

const fetchComments = async() =>{

    const data = await fetch("https://gorest.co.in/public/v2/comments")
    return data.json()
}

export const useUsers = () => useQuery("users",fetchUsers)
export const usePosts = () => useQuery("posts",fetchPosts)
export const useComments = () => useQuery("comments",fetchComments)

const DataProvider = ({children}:Props) =>{

    const queryClient = new QueryClient()

    return <QueryClientProvider client = {queryClient}>

        {children}

    </QueryClientProvider>
}

export default DataProvider