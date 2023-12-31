import { Reducer, useReducer, useState } from "react";
import { UserData } from "../types";
import { User } from "./User";
import "../styles/UserSection.css";
import { useCreateUser, useGetUsers } from "../api/users";
import { CustomButton } from "./common";

export type Action = {
  type: string;
  payload: string;
};

export const reducerUser = (state: UserData, action: Action) => {
  switch (action.type) {
    case "name":
      state.name = action.payload;
      return { ...state };
    case "email":
      state.email = action.payload;
      return { ...state };
    case "gender":
      state.gender = (action.payload as "male") || "female";
      return { ...state };
    case "status":
      state.status = action.payload;
      return { ...state };
    default:
      return { ...state };
  }
};

export const UsersSection = () => {
  const { data, status } = useGetUsers();
  const [filter, setFilter] = useState<String>("all");
  const [displayForm, setDisplayForm] = useState<boolean>(false);
  const [userData, dispatch] = useReducer<Reducer<UserData, Action>>(
    reducerUser,
    { id: 5746762 } as UserData
  );
  const { mutateAsync: addUser } = useCreateUser();

  const renderUsers = (data: UserData[], filter: String) => {
    if (filter === "all")
      return data.map((user) => <User user={user} key={user.id} />);

    // eslint-disable-next-line
    return data.map((user) => {
      if (user.status === filter) return <User user={user} key={user.id} />;
    });
  };

  const createUser = () => {
    addUser(userData);
    setDisplayForm(!displayForm);
  };

  const toggleDisplayForm = () => setDisplayForm(!displayForm);

  return (
    <>
      <div className="users-section">
        <div className="panel-tab">
          <h2> Your Users </h2>
          <select
            onClick={(e) => setFilter(e.currentTarget.value)}
            defaultValue="all"
          >
            <option value="all"> All </option>
            <option value="active"> Active </option>
            <option value="inactive"> Inactive </option>
          </select>

          <CustomButton
            buttonText="+"
            className="btn addUser"
            handleClick={toggleDisplayForm}
          />
        </div>

        {displayForm && (
          <div className="form">
            <input
              type="text"
              name="name"
              onChange={(e) =>
                dispatch({ type: "name", payload: e.target.value })
              }
              placeholder="enter name"
              required
            />
            <input
              type="text"
              name="email"
              onChange={(e) =>
                dispatch({ type: "email", payload: e.target.value })
              }
              placeholder="enter email"
              required
            />
            <span>
              <input
                type="radio"
                name="gender"
                value="male"
                onClick={(e) =>
                  dispatch({ type: "gender", payload: e.currentTarget.value })
                }
                required
              />
              male
              <input
                type="radio"
                name="gender"
                value="female"
                onClick={(e) =>
                  dispatch({ type: "gender", payload: e.currentTarget.value })
                }
                required
              />
              female
            </span>
            <span>
              <input
                type="radio"
                name="active"
                value="active"
                onClick={(e) =>
                  dispatch({ type: "status", payload: e.currentTarget.value })
                }
                required
              />
              active
              <input
                type="radio"
                name="inactive"
                value="inactive"
                onClick={(e) =>
                  dispatch({ type: "status", payload: e.currentTarget.value })
                }
                required
              />
              inactive
            </span>

            <button className="btn" onClick={createUser}>
              Create
            </button>
            <button
              className="btn"
              onClick={() => setDisplayForm(!displayForm)}
            >
              Cancel
            </button>
          </div>
        )}

        {status === "success" ? renderUsers(data, filter) : "loading..."}
      </div>
    </>
  );
};
