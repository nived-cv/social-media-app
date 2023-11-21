
import axios from 'axios'
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from 'react-query'
import { CommentsData, PatchUser, PostData, UserData } from '../CommonTypes/TypesList1'

type Props = {
    children: React.ReactNode
}

const headers = {
    headers: { Authorization: "Bearer 681df0d2e2bf3d0b32bcdadc32c20111382302737816d60d7aef8c1816eb0918" }
}

const fetchUsers = async () => {

    const data = await axios.get("https://gorest.co.in/public/v2/users",headers)
    return data.data
}

const fetchPosts = async () => {

    const data = await axios.get("https://gorest.co.in/public/v2/posts",headers)
    return data.data
}

const fetchComments = async (id: number) => {
    const data = await axios.get(`https://gorest.co.in/public/v2/posts/${id}/comments`,headers)
    return data.data
}

export const useUsers = () => useQuery("users", fetchUsers)
export const usePosts = () => useQuery("posts", fetchPosts)
export const useComments = (id: number) => useQuery(['comments', id], () => fetchComments(id))

export const useAddComment = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (newData: CommentsData) => {

            const URL = `https://gorest.co.in/public/v2/posts/${newData.post_id}/comments`
            const res = await axios.post(URL, newData, headers)
            return res
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['comments'])
        }
    })
}

export const useAddUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : async (newData : UserData) => {

            const URL = `https://gorest.co.in/public/v2/users`
            const res = await axios.post(URL, newData, headers)
            console.log("posted on",URL)
            return res
        },
        onSuccess : () => {
            queryClient.invalidateQueries(['users'])
        }
    })
}

export const useAddPost = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : async (newData : any) => {
            const URL = `https://gorest.co.in/public/v2/posts`
            const res = await axios.post(URL,newData, headers)
            console.log("posted on",URL)
            return res
        },
        onSuccess : () => queryClient.invalidateQueries(["posts"])
    })
}

export const usePatchUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : async (newData : PatchUser) => {
            const URL = `https://gorest.co.in/public/v2/users/${newData.id}`
            const res = await axios.patch(URL,newData, headers)
            return res
        },
        onSuccess : () => {
            queryClient.invalidateQueries(["users"])
        }
    })
}

const DataProvider = ({ children }: Props) => {

    const queryClient = new QueryClient()

    return <QueryClientProvider client={queryClient}>

        {children}

    </QueryClientProvider>
}

export default DataProvider