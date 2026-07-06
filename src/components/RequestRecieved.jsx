// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addRequests } from "../utils/requestSlice";

// const Requests = () => {
//   const dispatch = useDispatch();
//   const requests = useSelector((store) => store.requests);

//   const fetchRequests = async () => {
//   try {
//     const res = await axios.get(
//       BASE_URL + "/user/requests/recieved",
//       {
//         withCredentials: true,
//       }
//     );

//     dispatch(addRequests(res.data));
//   } catch (err) {
//     console.error(err);
//   }
// };

//   useEffect(() => {
//     fetchRequests();
//   }, []);


//   if (!Requests)
//     return (
//       <h1 className="text-center text-2xl font-bold my-10">
//         Loading...
//       </h1>
//     );

//   if (Requests.length === 0)
//     return (
//       <h1 className="text-center text-2xl font-bold my-10">
//         No Request Found
//       </h1>
//     );

//   return (
//     <div className="my-10">
//       <h1 className="text-center text-3xl font-bold mb-8">
//         Requests
//       </h1>

//       <div className="flex flex-col items-center gap-5">
//         {Requests.map((Requests) => {
//           const {
//             _id,
//             firstName,
//             lastName,
//             age,
//             gender,
//             about,
//             photourl,
//           } = Requests;

//           return (
//             <div
//               key={_id}
//               className="flex w-2/4 bg-base-300 rounded-xl shadow-md p-2 items-center gap-3"
//             >
//               <img
//                 src={photourl}
//                 alt={firstName}
//                 className="w-12 h-12 rounded-full object-cover"
//               />

//               <div>
//                 <h2 className="text-m font-bold">
//                   {firstName} {lastName}
//                 </h2>

//                 <p className="text-gray-400">
//                   {age}, {gender}
//                 </p>

//                 <p className="mt-1">{about}</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );

// }; 

// export default Requests;




// import axios from "axios";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { BASE_URL } from "../utils/constants";
// import { addRequests } from "../utils/requestSlice";
// import { removeRequest } from "../utils/requestSlice";

// const Requests = () => {
//   const dispatch = useDispatch();
//   const requests = useSelector((store) => store.requests);

//   const fetchRequests = async () => {
//     // Don't fetch again if already in Redux
//     if (requests) return;

//     try {
//       const res = await axios.get(
//         BASE_URL + "/user/requests/recieved",
//         {
//           withCredentials: true,
//         }
//       );

//       console.log(res.data);

//       dispatch(addRequests(res.data));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   if (!requests) {
//     return (
//       <h1 className="text-center text-2xl font-bold my-10">
//         Loading...
//       </h1>
//     );
//   }

//   if (requests.length === 0) {
//     return (
//       <h1 className="text-center text-2xl font-bold my-10">
//         No Request Found
//       </h1>
//     );
//   }

//   const reviewRequest = async (status, requestId) => {
//   try {
//     await axios.post(
//       BASE_URL + "/request/review/" + status + "/" + requestId,
//       {},
//       {
//         withCredentials: true,
//       }
//     );

//     dispatch(removeRequest(requestId));
//   } catch (err) {
//     console.error(err);
//   }
// };

//   return (
//     <div className="my-10">
//       <h1 className="text-center text-3xl font-bold mb-8">
//         Connection Requests
//       </h1>

//       <div className="flex flex-col items-center gap-5">
//         {requests.map((request) => {
//           const {
//             _id,
//             firstName,
//             lastName,
//             age,
//             gender,
//             about,
//             photourl,
//           } = request.fromUserId;

//           return (
//             <div
//               key={_id}
//               className="flex items-center justify-between w-2/4 bg-base-300 rounded-xl shadow-md p-5"
//             >
//               <div className="flex items-center gap-5">
//                 <img
//                   src={photourl}
//                   alt={firstName}
//                   className="w-24 h-24 rounded-full object-cover"
//                 />

//                 <div>
//                   <h2 className="text-xl font-bold">
//                     {firstName} {lastName}
//                   </h2>

//                   <p className="text-gray-400">
//                     {age}, {gender}
//                   </p>

//                   <p className="mt-2 line-clamp-2">{about}</p>
//                 </div>
//               </div>

//               <div className="flex gap-2">
//                 <button
//   className="btn btn-success"
//   onClick={() => reviewRequest("accepted", _id)}
// >
//   Accept
// </button>

// <button
//   className="btn btn-error"
//   onClick={() => reviewRequest("rejected", _id)}
// >
//   Reject
// </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Requests;



import SkeletonCard from "./SkeletonCard";

import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    if (requests) return;

    try {
      const res = await axios.get(
        BASE_URL + "/user/requests/recieved",
        {
          withCredentials: true,
        }
      );

      console.log(res.data);

      dispatch(addRequests(res.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const reviewRequest = async (status, requestId) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        {},
        {
          withCredentials: true,
        }
      );

      dispatch(removeRequest(requestId));
    } catch (err) {
      console.error(err);
    }
  };

  if (!requests) {
    return (
        <div className="flex justify-center mt-10">
      <SkeletonCard />
    </div>
    );
  }

  if (requests.length === 0) {
    return (
      <h1 className="text-center text-2xl font-bold my-10">
        No Request Found
      </h1>
    );
  }

  return (
    <div className="my-10">
      <h1 className="text-center text-3xl font-bold mb-8">
        Connection Requests
      </h1>

      <div className="flex flex-col items-center gap-5">
        {requests.map((request) => {
          const requestId = request._id;

          const {
            firstName,
            lastName,
            age,
            gender,
            about,
            photourl,
          } = request.fromUserId;

          return (
            <div
              key={requestId}
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
              <div className="flex items-center gap-5">
                <img
                  src={photourl}
                  alt={firstName}
                  className="w-24 h-24 rounded-full object-cover"
                />

                <div>
                  <h2 className="text-xl font-bold">
                    {firstName} {lastName}
                  </h2>

                  <p className="text-gray-400">
                    {age}, {gender}
                  </p>

                  <p className="mt-2">{about}</p>
                </div>
              </div>

              <div className="card-actions flex flex-wrap justify-start gap-2">
  <button
    className="btn btn-error"
       onClick={() =>
                    reviewRequest("rejected", requestId)
                  }
    
  >
    Reject
  </button>

  <button
    className="btn btn-success"
    // onClick={() => handleSendRequest("interested", _id)}
      onClick={() =>
                    reviewRequest("accepted", requestId)
                  }
  >
    Accept
  </button>
</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;