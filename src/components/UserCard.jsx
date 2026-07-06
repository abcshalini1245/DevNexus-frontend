




import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";


import React from "react";

const UserCard = ({ user }) => {
    const dispatch = useDispatch();
  if (!user) return null;

  const { _id,firstName, lastName, age, gender, about, photourl,skills } = user;



  const handleSendRequest = async (status, userId) => {
  try {
    await axios.post(
      BASE_URL + "/request/send/" + status + "/" + userId,
      {},
      {
        withCredentials: true,
      }
    );

    dispatch(removeUserFromFeed(userId));
  } catch (err) {
    console.error(err);
  }
};

  return (
      <div className="card bg-base-300 w-[95%] sm:w-96 shadow-xl rounded-xl mx-auto">
      <figure>
        <img src={photourl} alt={firstName} className="w-full h-64 sm:h-72 object-cover"/>
      </figure>

      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>

        <p>{age} • {gender}</p>
        <p>{about}</p>

        <div className="flex flex-wrap gap-2">
      {skills?.slice(0, 4).map((skill, index) => (
        <span
          key={index}
          className="badge badge-outline badge-primary"
        >
          {skill}
        </span>
      ))}
    </div>

      <div className="card-actions flex-col sm:flex-row fixed-left-0 w-full">
      <button
  className="btn btn-error w-full sm:w-auto"
  onClick={() => handleSendRequest("ignored", _id)}
>
  Ignore
</button>

<button
  className="btn btn-success w-full sm:w-auto"
  onClick={() => handleSendRequest("interested", _id)}
>
  Interested
</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
