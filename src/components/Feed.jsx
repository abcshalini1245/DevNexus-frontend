import EmptyState from "./EmptyStates";


import SkeletonCard from "./SkeletonCard";

import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { BASE_URL } from "../utils/constants";
import { addFeed, appendFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  // ---------------- Filters ----------------

  const [gender, setGender] = useState("");
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");

  // ⭐ NEW
  // Current page for pagination
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  // ---------------- Fetch Feed ----------------

  const getFeed = async (currentPage) => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        params: {
          page: currentPage,
          limit: 10,

          skills,
          gender,
          location,
        },

        withCredentials: true,
      });

      // ⭐ NEW
      // First page replaces feed
      if (currentPage === 1) {
        dispatch(addFeed(res.data));
      }

      // Other pages append users
      else {
        dispatch(appendFeed(res.data));
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- Filters Changed ----------------

  useEffect(() => {
    // ⭐ NEW
    // Reset to first page whenever filters change

    setPage(1);

    getFeed(1);

  }, [skills, gender, location]);

  // ---------------- Page Changed ----------------

  useEffect(() => {
    // ⭐ NEW
    // Skip because first page already loaded above

    if (page === 1) return;

    getFeed(page);

  }, [page]);

  // ---------------- Prefetch ----------------

  useEffect(() => {

    if (!feed) return;

    // ⭐ NEW
    // When only 3 profiles remain,
    // automatically fetch next page

    if (feed.length <= 3) {

      setPage((prev) => prev + 1);

    }

  }, [feed]);

  if (!feed) {
  return (
    <div className="flex justify-center mt-10">
      <SkeletonCard />
    </div>
  );
}

 if (feed.length === 0) {
  return <EmptyState />;
}

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <h1 className="text-4xl font-bold text-center mb-8">
        Discover Developers
      </h1>

      {/* ---------------- Filter Bar ---------------- */}

      <div className="bg-base-200 rounded-xl shadow-lg p-6 mb-10">

        <div className="flex flex-wrap items-center justify-center gap-4">

           <label className="form-control mb-0">
  
  <select
    className="select select-bordered w-56"
    value={location}
    onChange={(e) => setLocation(e.target.value)}
  >
    <option value="">State</option>
    <option value="Andhra Pradesh">Andhra Pradesh</option>
    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
    <option value="Assam">Assam</option>
    <option value="Bihar">Bihar</option>
    <option value="Chhattisgarh">Chhattisgarh</option>
    <option value="Goa">Goa</option>
    <option value="Gujarat">Gujarat</option>
    <option value="Haryana">Haryana</option>
    <option value="Himachal Pradesh">Himachal Pradesh</option>
    <option value="Jharkhand">Jharkhand</option>
    <option value="Karnataka">Karnataka</option>
    <option value="Kerala">Kerala</option>
    <option value="Madhya Pradesh">Madhya Pradesh</option>
    <option value="Maharashtra">Maharashtra</option>
    <option value="Manipur">Manipur</option>
    <option value="Meghalaya">Meghalaya</option>
    <option value="Mizoram">Mizoram</option>
    <option value="Nagaland">Nagaland</option>
    <option value="Odisha">Odisha</option>
    <option value="Punjab">Punjab</option>
    <option value="Rajasthan">Rajasthan</option>
    <option value="Sikkim">Sikkim</option>
    <option value="Tamil Nadu">Tamil Nadu</option>
    <option value="Telangana">Telangana</option>
    <option value="Tripura">Tripura</option>
    <option value="Uttar Pradesh">Uttar Pradesh</option>
    <option value="Uttarakhand">Uttarakhand</option>
    <option value="West Bengal">West Bengal</option>
    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
    <option value="Chandigarh">Chandigarh</option>
    
    <option value="Delhi">Delhi</option>
    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
    <option value="Ladakh">Ladakh</option>
    <option value="Lakshadweep">Lakshadweep</option>
    <option value="Puducherry">Puducherry</option>
  </select>
</label>


          <select
            className="select select-bordered w-48"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>

          <select
            className="select select-bordered w-56"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          >
            <option value="">Skills</option>

            <option value="React">React</option>
            <option value="Node.js">Node.js</option>
            <option value="Express">Express</option>
            <option value="MongoDB">MongoDB</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Redux">Redux</option>
            <option value="Tailwind CSS">Tailwind CSS</option>
          </select>

          <button
            className="btn btn-outline"
            onClick={() => {

              setSkills("");
              setGender("");
              setLocation("");

            }}
          >
            Clear
          </button>

        </div>

      </div>

      {/* ---------------- User Card ---------------- */}

      <div className="flex justify-center">

        <UserCard user={feed[0]} />

      </div>

    </div>
  );
};

export default Feed;