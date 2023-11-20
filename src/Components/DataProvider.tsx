
import axios from 'axios'
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from 'react-query'

type Props = {
    children: React.ReactNode
}

const fetchUsers = async () => {

    const data = await axios.get("https://gorest.co.in/public/v2/users")
    return data.data
}

const fetchPosts = async () => {

    const data = await axios.get("https://gorest.co.in/public/v2/posts")
    return data.data
}

const fetchComments = async(id:number) =>{
    const data = await axios.get(`https://gorest.co.in/public/v2/posts/${id}/comments`)
    return data.data
}


export const useUsers = () => useQuery("users", fetchUsers)
export const usePosts = () => useQuery("posts", fetchPosts)
export const useComments = (id: number) =>  useQuery(['comments', id], () => fetchComments(id))

const DataProvider = ({ children }: Props) => {

    const queryClient = new QueryClient()

    return <QueryClientProvider client={queryClient}>

        {children}

    </QueryClientProvider>
}

export default DataProvider