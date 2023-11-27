import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import backIcon from "../assets/back-icon.svg";
import userIcon5 from "../assets/user-icon1.svg";
import dateFormat from "dateformat";

const UserDetails = () => {
  const { id } = useParams();
  const [postList, setPostList] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [timeZones, setTimeZones] = useState([]);
  const [currentTimezone, setCurrentTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [currentTime, setCurrentTime] = useState(null);
  const [timerStart, setTimerStart] = useState(true);
  const fetchUserPosts = useCallback(() => {
    axios({
      url: "https://jsonplaceholder.typicode.com/posts",
      method: "GET",
      params: { userId: id },
    })
      .then(({ data }) => {
        // console.log(data);
        setPostList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const fetchUserDetails = useCallback(() => {
    axios({
      url: `https://jsonplaceholder.typicode.com/users/${id}`,
      method: "GET",
    })
      .then(({ data }) => {
        // console.log(data);
        setUserDetails(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const fetchTimezones = useCallback(() => {
    axios({
      url: "https://worldtimeapi.org/api/timezone",
      method: "GET",
    })
      .then(({ data }) => {
        // console.log(data);
        setTimeZones(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setTimerStart(false);
    axios({
      url: `https://worldtimeapi.org/api/timezone/${currentTimezone}`,
      method: "GET",
    })
      .then(({ data }) => {
        // console.log(data);
        setCurrentTime(() => new Date(data?.datetime).getTime());
        setTimerStart(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentTimezone]);

  useEffect(() => {
    let increaseCounter;
    if (timerStart) {
      increaseCounter = setInterval(() => {
        setCurrentTime((state) => state + 1000);
      }, 1000);
    }
    return () => clearInterval(increaseCounter);
  }, [timerStart]);

  useEffect(() => {
    fetchUserPosts();
    fetchUserDetails();
    fetchTimezones();
  }, [fetchUserPosts, fetchUserDetails, fetchTimezones]);

  return (
    <div className="flex justify-center py-10">
      <div className="flex px-10 flex-col md:w-[75%] lg:w-[55%]">
        <div className="flex flex-col gap-5 mb-5">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex drop-shadow-sm hover:drop-shadow-md font-bold">
              <img src={backIcon} className="w-[20px] mr-2" />
              Back
            </Link>
            <button
              className={`px-5 py-1 drop-shadow-sm text-white font-semibold rounded-md ${timerStart ? "bg-red-500" : "bg-green-500"}`}
              onClick={() => {
                setTimerStart(!timerStart);
              }}
            >
              {timerStart ? "Stop" : "Start"}
            </button>
          </div>
          <div className="flex gap-4 flex-col md:flex-row items-center md:justify-center">
            <select
              onChange={(e) => {
                setCurrentTimezone(e.currentTarget.value);
              }}
              className="py-3 bg-slate-50 px-3 text-sm"
            >
              <option>Select Timezone</option>
              {timeZones?.length > 0 &&
                timeZones?.map((d, i) => {
                  return <option key={"timezone-" + i}>{d}</option>;
                })}
            </select>
            {currentTime && <span className="bg-slate-600 w-28 text-center py-2 text-white font-bold">{dateFormat(currentTime, "HH:MM:ss")}</span>}
          </div>
        </div>
        <h1 className="font-bold text-1xl my-6 text-center">User Profile</h1>
        <div className="flex flex-col md:flex-row item justify-between drop-shadow-sm bg-slate-50 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row items-center text-center md:text-start">
            <img src={userIcon5} className="w-[25%] md:w-[11%] bg-slate-200 rounded-full mr-4" />
            <div>
              <h4 className="font-semibold">{userDetails?.name}</h4>
              <p className="text-sm">
                @{userDetails?.username} | {userDetails?.company?.catchPhrase}
              </p>
            </div>
          </div>
          <div className="flex flex-col text-xs mt-4 md:mt-0 text-center md:text-start">
            <h4>
              {userDetails?.address?.suite}, {userDetails?.address?.street}, {userDetails?.address?.city} - {userDetails?.address?.zipcode}
            </h4>
            <p className="font-medium">
              {userDetails?.email} | {userDetails?.phone}
            </p>
          </div>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
          {postList?.length > 0 &&
            postList?.map((d) => {
              return (
                <li key={"userpost-" + d?.id} className="flex flex-col rounded-xl drop-shadow-md hover:drop-shadow-xl bg-slate-200 px-5 py-4 text-center">
                  <h5 className="font-bold">{d?.title}</h5>
                  <p className="text-sm">{d?.body}</p>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default UserDetails;
