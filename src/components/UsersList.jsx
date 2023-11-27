import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserImage } from "../utility";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  console.log("users", users);
  useEffect(() => {
    axios({
      url: "https://jsonplaceholder.typicode.com/users",
      method: "GET",
    })
      .then(({ data }) => {
        console.log(data);
        setUsers(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className=" flex flex-col items-center py-10">
      <h1 className="font-bold text-1xl mb-16">People Directory</h1>
      <ul className="flex items-center flex-col px-10 w-[100%] md:w-[50%]">
        {users?.length > 0 &&
          users?.map((d) => {
            return (
              <li key={"user-" + d?.id} className="w-full bg-slate-50 my-2 px-4 py-2 rounded-md drop-shadow-md">
                <Link to={`${d?.id}`} className="flex justify-between w-full">
                  <div className="flex items-center">
                    <img src={getUserImage()} className="w-[15%] md:w-[10%] bg-slate-200 rounded-full mr-4" />
                    <div>
                      <h4 className="font-semibold">{d?.name}</h4>
                      <p className="text-sm">@{d?.username}</p>
                    </div>
                  </div>
                  <div className="flex flex-col text-center justify-center w-fit">
                    <p className="text-sm">Posts</p>
                    <span className="text-xl font-semibold">12</span>
                  </div>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default UsersList;
