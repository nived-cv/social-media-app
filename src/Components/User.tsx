import { Reducer, useReducer, useState } from "react";
import { PatchUser, UserData } from "../types";
import "../styles/User.css";
import { Action } from "./UsersSection";
import { useDeleteUser, useUpdateUser } from "../api/users";
import { CustomButton } from "./common";

type Props = {
  user: UserData;
};

const reducer = (state: PatchUser, action: Action) => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "email":
      return { ...state, email: action.payload };
    case "gender":
      return { ...state, gender: action.payload as "male" | "female" };
    case "status":
      return { ...state, status: action.payload };
    default:
      return { ...state };
  }
};

export const User = ({ user }: Props) => {
  const initialValue = { id: user.id };
  const [displayForm, setDisplayForm] = useState<boolean>(false);
  const [userData, dispatch] = useReducer<Reducer<PatchUser, Action>>(
    reducer,
    initialValue
  );
  const { mutateAsync: updateUser } = useUpdateUser();
  const { mutateAsync: deleteUser } = useDeleteUser();

  const patchUser = () => {
    updateUser(userData);
    setDisplayForm(!displayForm);
  };

  function handleDelete() {
    deleteUser(user.id);
  }

  const toggleDisplayForm = () => {
    setDisplayForm(!displayForm);
  };

  return (
    <div className="user" key={Number(user.id)}>
      <p>
        <span className="user-name"> {user.name} </span>
        <span className={`indicator ${user.status}`}>{user.status}</span>
      </p>
      <p> {user.gender} </p>
      <p> {user.email} </p>
      <span className="spacer-container-min">
        <CustomButton
          className="btn"
          handleClick={toggleDisplayForm}
          buttonText="save"
        />
        <CustomButton
          className="btn"
          handleClick={handleDelete}
          buttonText="Delete"
        />
      </span>

      {displayForm && (
        <div className="user-modify-form">
          <input
            type="text"
            name="name"
            onChange={(e) =>
              dispatch({ type: "name", payload: e.target.value })
            }
            placeholder="Enter name"
            defaultValue={String(user.name)}
            required
          />
          <input
            type="text"
            name="email"
            onChange={(e) =>
              dispatch({ type: "email", payload: e.target.value })
            }
            placeholder="Enter email"
            defaultValue={String(user.email)}
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
              name="status"
              value="active"
              onClick={(e) =>
                dispatch({ type: "status", payload: e.currentTarget.value })
              }
              required
            />
            active
            <input
              type="radio"
              name="status"
              value="inactive"
              onClick={(e) =>
                dispatch({ type: "status", payload: e.currentTarget.value })
              }
              required
            />
            inactive
          </span>
          <span style={{ display: "flex", columnGap: "10px" }}>
            <CustomButton
              className="btn"
              handleClick={patchUser}
              buttonText="Create"
            />
            <CustomButton
              className="btn"
              handleClick={toggleDisplayForm}
              buttonText="delete"
            />
          </span>
        </div>
      )}
    </div>
  );
};
