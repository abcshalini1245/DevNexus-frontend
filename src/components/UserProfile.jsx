 
import SkeletonCard from "./SkeletonCard";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

import {
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaMapMarkerAlt,
  FaBuilding,
  FaGraduationCap,
  FaUserGraduate,
} from "react-icons/fa";

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/profile/" + userId,
        {
          withCredentials: true,
        }
      );

      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) {
  return (
    <div className="flex justify-center mt-10">
      <SkeletonCard />
    </div>
  );
}

  return (
    <div className="max-w-6xl mx-auto px-5 py-24">

      {/* Header */}

      <div className="card bg-base-200 shadow-2xl hover:shadow-primary/20 transition-all duration-300">

        <div className="card-body items-center text-center">

          <div className="avatar">
            <div className="w-44 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={user.photourl} alt="profile" />
            </div>
          </div>

          <h1 className="text-5xl font-bold mt-4">
            {user.firstName} {user.lastName}
          </h1>

          <p className="text-lg opacity-70">
            {user.age} • {user.gender}
          </p>

          {user.location && (
            <div className="flex items-center gap-2 text-primary mt-2">
              <FaMapMarkerAlt />
              <span>{user.location}</span>
            </div>
          )}

        </div>

      </div>

      {/* About */}

      <div className="card bg-base-200 shadow-xl mt-8 hover:shadow-primary/20 transition-all">

        <div className="card-body">

          <h2 className="card-title text-3xl">
            About
          </h2>

          <p className="leading-8 text-base-content/80">
            {user.about || "No description added."}
          </p>

        </div>

      </div>

      {/* Education & Company */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

        {user.education && (

          <div className="card bg-base-200 shadow-xl hover:shadow-primary/20 transition-all">

            <div className="card-body">

              <h2 className="card-title text-2xl">

                <FaGraduationCap />

                Education

              </h2>

              <p>{user.education}</p>

            </div>

          </div>

        )}

        {user.company && (

          <div className="card bg-base-200 shadow-xl hover:shadow-primary/20 transition-all">

            <div className="card-body">

              <h2 className="card-title text-2xl">

                <FaBuilding />

                Company

              </h2>

              <p>{user.company}</p>

            </div>

          </div>

        )}

      </div>

      {/* Experience */}

      {user.experience && (

        <div className="card bg-base-200 shadow-xl mt-8 hover:shadow-primary/20 transition-all">

          <div className="card-body">

            <h2 className="card-title text-2xl">

              <FaUserGraduate />

              Experience

            </h2>

            <p>{user.experience}</p>

          </div>

        </div>

      )}

      {/* Skills */}

      <div className="card bg-base-200 shadow-xl mt-8 hover:shadow-primary/20 transition-all">

        <div className="card-body">

          <h2 className="card-title text-3xl">
            Skills
          </h2>

          <div className="flex flex-wrap gap-4 mt-3">

            {user.skills?.length ? (
              user.skills.map((skill, index) => (
                <div
                  key={index}
                  className="badge badge-primary badge-lg px-4 py-4"
                >
                  {skill}
                </div>
              ))
            ) : (
              <p>No skills added.</p>
            )}

          </div>

        </div>

      </div>

      {/* Social Links */}

      {(user.github || user.linkedin || user.portfolio) && (

        <div className="card bg-base-200 shadow-xl mt-8 hover:shadow-primary/20 transition-all">

          <div className="card-body">

            <h2 className="card-title text-3xl">
              Social Links
            </h2>

            <div className="flex flex-wrap gap-5 mt-4">

              {user.github && (

                <a
                  href={user.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline gap-2"
                >
                  <FaGithub />
                  GitHub
                </a>

              )}

              {user.linkedin && (

                <a
                  href={user.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-info btn-outline gap-2"
                >
                  <FaLinkedin />
                  LinkedIn
                </a>

              )}

              {user.portfolio && (

                <a
                  href={user.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-success btn-outline gap-2"
                >
                  <FaGlobe />
                  Portfolio
                </a>

              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default UserProfile;