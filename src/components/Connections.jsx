


import SkeletonCard from "./SkeletonCard";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";



const Connections = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const connections = useSelector((store) => store.connection);

  const fetchConnections = async () => {
    // Don't fetch again if already in Redux
    if (connections) return;

    try {
      const res = await axios.get(
        BASE_URL + "/user/connections",
        {
          withCredentials: true,
        }
      );

      dispatch(addConnections(res.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections)
    return (
        <div className="flex justify-center mt-10">
      <SkeletonCard />
    </div>
    );

  if (connections.length === 0)
    return (
      <h1 className="text-center text-2xl font-bold my-10">
        No Connections Found
      </h1>
    );

  return (
    
    <div className="my-10">
      <h1 className="text-center text-3xl font-bold mb-8">
        Connections
      </h1>

      <div className="flex flex-col items-center gap-5">
        {connections.map((connection) => {
          const {
            _id,
            firstName,
            lastName,
            age,
            gender,
            about,
            photourl,
          } = connection;

          return (
            <div
  key={_id}
  className="
    w-[95%]
    md:w-2/4
    bg-base-300
    rounded-xl
    shadow-md
    p-5
    flex
    flex-col
    md:flex-row
    items-center
    md:items-center
    text-center
    md:text-left
    gap-4
  "
>
              <img
                src={photourl}
                alt={firstName}
                className="w-28 h-28 md:w-24 md:h-24 rounded-full object-cover"
              />

              <div className="flex-1 w-full">
                <h2 className="text-m font-bold">
                  {firstName} {lastName}
                </h2>

                <p className="text-gray-400">
                  {age}, {gender}
                </p>

                <p className="mt-1 line-clamp-2">{about}</p>
              

          <div className="flex gap-3 mt-4">

  <Link to={`/profile/${_id}`}>
    <button className="btn btn-primary">
      View Profile
    </button>
  </Link>

  <button
    className="btn btn-secondary"
    onClick={() => navigate(`/chat/${_id}`)}
  >
    Message
  </button>

</div>
              </div>
            </div>
          );
        })}
     
      

    </div>
     </div>
  );
};



export default Connections;
