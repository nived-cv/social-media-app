
// import { useQuery } from "react-query"

// export type fetchedData = {

//     "id": Number,
//     "name": String,
//     "username": String,
//     "email": String,
//     "address": {
//       "street": String,
//       "suite": String,
//       "city": String,
//       "zipcode": String,
//       "geo": {
//         "lat": String,
//         "lng": String
//       }
//     },
//     "phone": String,
//     "website": String,
//     "company": {
//       "name": String,
//       "catchPhrase": String,
//       "bs": String
//     }
// }

// const fetchUsers = async() =>{

//     const res = await fetch("https://jsonplaceholder.typicode.com/users");
//     return res.json()
// }

// export const useQueried = () => useQuery("users",fetchUsers)

// export const Experiments = () =>{

//     const {data , status} = useQueried()

//     return <div>
        
//         {status === "error" && <p> Error Fetching data</p>}
//         {status === "loading" && <p>Fetching data</p>}
//         {status === "success" && (<div>

//                 {data.map((user:fetchedData) =><p>{user.name}</p>)}

//             </div>
//             )}
                
//     </div>
// }

export {}