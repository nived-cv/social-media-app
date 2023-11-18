
import { useState } from "react"
import { UserData } from "../CommonTypes/TypesList1"
import DataProvider, { useUsers } from "./DataProvider"
import { User } from "./User"

export const UsersSection = () =>{

    const {data,status} = useUsers()
    const [filter,SetFilter] = useState<String>("all")

    const renderUsers = (data : UserData[], filter : String) =>{

        if(filter === "all")
        return data.map((user) => <User user = {user} />)

        // eslint-disable-next-line 
        return data.map((user) => {

            if(user.status === filter)
            return <User user = {user} />
        })
}
    
    return <DataProvider>

        <div className = "users-section">

            <div className = "panel-tab">
                <h2> Your Users </h2>
                <select onClick = {(e) => SetFilter(e.currentTarget.value)}>
                    <option value="all" selected>All</option>
                    <option value= "active">Active</option>
                    <option value= "inactive">Inactive</option>
                </select>
            </div>

            { status ==="success"? renderUsers(data,filter) : "loading..."}

        </div>
    </DataProvider>
}