

import { useState, useEffect } from "react";
import ProfileCompletion from "./ProfileCompletion";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link } from "react-router-dom";

const EditProfile = ({ user }) => {

  // ==============================
  // USER STATES
  // ==============================

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [skills, setSkills] = useState(user?.skills || []);
  

  const [location, setLocation] = useState(user?.location || "");
  const [education, setEducation] = useState(user?.education || "");
  const [experience, setExperience] = useState(user?.experience || "");
  const [company, setCompany] = useState(user?.company || "");

  const [github, setGithub] = useState(user?.github || "");
  const [linkedin, setLinkedin] = useState(user?.linkedin || "");
  const [portfolio, setPortfolio] = useState(user?.portfolio || "");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
const [photourl, setPhotoUrl] = useState(user.photourl || "");
const [previewImage, setPreviewImage] = useState(user?.photourl || "");

  const dispatch = useDispatch();

  // ==============================
  // UPDATE FORM WHEN USER CHANGES
  // ==============================

  useEffect(() => {

    if (!user) return;

    setFirstName(user.firstName || "");
    setLastName(user.lastName || "");
    setAge(user.age || "");
    setGender(user.gender || "");
    setAbout(user.about || "");
    setSkills(user.skills || []);
    setPhotoUrl(user.photourl|| "");
   
setPreviewImage(user.photourl || "");

    setLocation(user.location || "");
    setEducation(user.education || "");
    setExperience(user.experience || "");
    setCompany(user.company || "");

    setGithub(user.github || "");
    setLinkedin(user.linkedin || "");
    setPortfolio(user.portfolio || "");
    

  }, [user]);

  // ==============================
  // SAVE PROFILE
  // ==============================
  const uploadImage = async () => {

  const formData = new FormData();
  formData.append("photo", file);

  const res = await axios.post(
    BASE_URL + "/upload",
    formData,
    {
      withCredentials: true,
    }
  );
  console.log(res.data);

  return res.data.photourl; 
};




 
  const saveProfile = async () => {

    try {
      
      setLoading(true);
      setError("");
      setSuccess("");


       let imageUrl = photourl;

    if (file) {
      imageUrl = await uploadImage();
      setPhotoUrl(imageUrl);
        setPreviewImage(imageUrl);
    }

    console.log(imageUrl);
    console.log("Gender being sent:", gender);

      const res = await axios.patch(

        BASE_URL + "/profile/edit",

        {
          firstName,
          lastName,
          photourl: imageUrl,
          age,
          gender,
          about,
          skills,
          location,
          education,
          experience,
          company,
          github,
          linkedin,
          portfolio,
        },

        {
          withCredentials: true,
        }

      );

      dispatch(addUser(res.data.data));

      setSuccess("Profile Updated Successfully!");

      setTimeout(() => {

        setSuccess("");

      }, 3000);

    } catch (err) {

      setError(err.response?.data || err.message);

    } finally {

      setLoading(false);

    }

  };

  return (

    // UPDATED : Better page width & spacing
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 px-6 py-20">

      {/* ===========================================
                  EDIT PROFILE FORM
      =========================================== */}

      <div className="card bg-base-300 w-full max-w-xl shadow-2xl rounded-2xl">

        <div className="card-body">

          <h2 className="text-3xl font-bold text-center">
            Edit Profile
          </h2>

          <p className="text-center opacity-70 mb-6">
            Keep your profile updated to attract more developers.
          </p>

          {/* ===========================================
                    BASIC INFORMATION
          =========================================== */}

          <h3 className="font-bold text-lg border-b pb-2 mb-4">
            👤 Basic Information
          </h3>

          {/* UPDATED : Two Column Layout */}

          <div className="grid grid-cols-2 gap-4">

            <label className="form-control">

              <div className="label">

                <span className="label-text">
                  First Name
                </span>

              </div>

              <input
                type="text"
                className="input input-bordered"
                placeholder="John"
                value={firstName}
                onChange={(e)=>setFirstName(e.target.value)}
              />

            </label>

            <label className="form-control">

              <div className="label">

                <span className="label-text">
                  Last Name
                </span>

              </div>

              <input
                type="text"
                className="input input-bordered"
                placeholder="Doe"
                value={lastName}
                onChange={(e)=>setLastName(e.target.value)}
              />

            </label>

          </div>

          {/* Photo */}

          {/* <label className="form-control mt-4">

            <div className="label">

              <span className="label-text">
                🖼 Profile Photo URL
              </span>

            </div>

            <input
              type="text"
              className="input input-bordered"
              placeholder="https://..."
              value={photourl}
              onChange={(e)=>setPhoto(e.target.value)}
            />

          </label> */}


          {/* ================= Profile Photo ================= */}

<div className="divider divider-start text-lg font-semibold">
  🖼️ Profile Photo
</div>

<div className="flex flex-col items-center gap-4 mb-6">

  {/* Live Preview */}
  <div className="avatar">
    <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">

     <img
  src={
    previewImage ||
    photourl ||
    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  }
  alt="Profile Preview"
  onError={(e) => {
    e.target.src =
      "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  }}
/>

    </div>
  </div>

  {/* URL Input */}
  <label className="form-control w-full">

    <div className="label">
      <span className="label-text font-medium">
        Paste Image URL
      </span>
    </div>
{/* 
    <input
      type="url"
      placeholder="https://example.com/profile.jpg"
      className="input input-bordered w-full"
      value={photourl}
      onChange={(e) => setPhoto(e.target.value)}
    /> */}
   <input
  type="file"
  onChange={(e) => {
  const selectedFile = e.target.files[0];

  if (selectedFile) {
    setFile(selectedFile);

    const preview = URL.createObjectURL(selectedFile);
    setPreviewImage(preview);
  }
}}
/>
    <div className="label">
      <span className="label-text-alt opacity-60">
        
      </span>
    </div>

  </label>

</div>

{/* ================= End Profile Photo ================= */}

          {/* Age + Gender */}

          <div className="grid grid-cols-2 gap-4 mt-4">

            <label className="form-control">

              <div className="label">

                <span className="label-text">
                  Age
                </span>

              </div>

              <input
                type="number"
                className="input input-bordered"
                value={age}
                onChange={(e)=>setAge(e.target.value)}
              />

            </label>

            <label className="form-control">

              <div className="label">

                <span className="label-text">
                  Gender
                </span>

              </div>

              <select
                className="select select-bordered"
                value={gender}
                onChange={(e)=>setGender(e.target.value)}
              >
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="other">other</option>
              </select>

            </label>

          </div>

          {/* Skills */}

          <label className="form-control mt-4">

            <div className="label">

              <span className="label-text">
                🚀 Skills
              </span>

            </div>

            <input
              className="input input-bordered"
              placeholder="React, Node.js, MongoDB"

              value={
                Array.isArray(skills)
                  ? skills.join(", ")
                  : skills
              }

              onChange={(e)=>

                setSkills(

                  e.target.value

                    .split(",")

                    .map((skill)=>skill.trim())

                    .filter(Boolean)

                )

              }

            />

          </label>

          {/* ===========================================
                       ABOUT
          =========================================== */}

          <h3 className="font-bold text-lg border-b pb-2 mt-8 mb-4">
            📝 About
          </h3>

          <label className="form-control">

            <textarea

              className="textarea textarea-bordered h-32"

              placeholder="Tell developers something about yourself..."

              value={about}

              onChange={(e)=>setAbout(e.target.value)}

            />

            <div className="text-right text-xs opacity-60 mt-1">

              {about.length}/300

            </div>

          </label>


                    {/* ===========================================
                 💼 PROFESSIONAL DETAILS
          =========================================== */}

          <h3 className="font-bold text-lg border-b pb-2 mt-8 mb-4">
            💼 Professional Details
          </h3>

          {/* Location */}

          <label className="form-control mb-4">
            <div className="label">
              <span className="label-text">📍 Location</span>
            </div>

            <input
              type="text"
              className="input input-bordered"
              placeholder="Durgapur, West Bengal"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </label>

          {/* Education */}

          <label className="form-control mb-4">
            <div className="label">
              <span className="label-text">🎓 Education</span>
            </div>

            <input
              type="text"
              className="input input-bordered"
              placeholder="M.Tech CSE, NIT Durgapur"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            />
          </label>

          {/* Experience */}

          <label className="form-control mb-4">
            <div className="label">
              <span className="label-text">💼 Experience</span>
            </div>

            <input
              type="text"
              className="input input-bordered"
              placeholder="Frontend Developer Intern"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </label>

          {/* Company */}

          <label className="form-control mb-4">
            <div className="label">
              <span className="label-text">🏢 Company</span>
            </div>

            <input
              type="text"
              className="input input-bordered"
              placeholder="OpenAI"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </label>

          {/* ===========================================
                    🔗 SOCIAL LINKS
          =========================================== */}

          <h3 className="font-bold text-lg border-b pb-2 mt-8 mb-4">
            🔗 Social Links
          </h3>

          {/* Github */}

          <label className="form-control mb-4">
            <div className="label">
              <span className="label-text">🐙 GitHub</span>
            </div>

            <input
              type="url"
              className="input input-bordered"
              placeholder="https://github.com/username"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
          </label>

          {/* LinkedIn */}

          <label className="form-control mb-4">
            <div className="label">
              <span className="label-text">💼 LinkedIn</span>
            </div>

            <input
              type="url"
              className="input input-bordered"
              placeholder="https://linkedin.com/in/username"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
          </label>

          {/* Portfolio */}

          <label className="form-control mb-2">
            <div className="label">
              <span className="label-text">🌐 Portfolio</span>
            </div>

            <input
              type="url"
              className="input input-bordered"
              placeholder="https://yourportfolio.com"
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
            />
          </label>

          {/* ==============================
                SUCCESS / ERROR MESSAGE
          ============================== */}

          {error && (
            <div className="alert alert-error mt-6">
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="alert alert-success mt-6">
              <span>{success}</span>
            </div>
          )}

          {/* ==============================
                SAVE BUTTON
          ============================== */}

          <button
            className={`btn w-full mt-8 ${
              success
                ? "btn-success"
                : loading
                ? "btn-neutral"
                : "btn-primary"
            }`}
            onClick={saveProfile}
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : success
              ? "Saved ✓"
              : "💾 Save Profile"}
          </button>

        </div>
      </div>
      
      {/* ===========================================
              LIVE PREVIEW
      =========================================== */}

      {/* UPDATED:
          Sticky preview so it remains visible while scrolling
      */}

      <div className="lg:sticky lg:top-24 flex flex-col gap-6 self-start">

        <UserCard
          user={{
            firstName,
            lastName,
            age,
            gender,
            about,
            photourl : previewImage || photourl,
            skills,
            location,
            education,
            experience,
            company,
            github,
            linkedin,
            portfolio,
          }}
        />

        <ProfileCompletion
          user={{
            photourl,
            about,
            skills,
            location,
            education,
            experience,
            company,
            github,
            linkedin,
            portfolio,
          }}
        />

        <div className="divider">Security</div>

<p className="text-sm opacity-70 mb-3">
  Want to update your password?
</p>

<Link
  to="/change-password"
  className="btn btn-outline btn-warning w-full"
>
  🔒 Change Password
</Link>

      </div>

    </div>
  );
};

export default EditProfile;