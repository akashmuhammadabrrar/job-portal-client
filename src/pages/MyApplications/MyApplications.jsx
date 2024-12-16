import React, { useEffect, useState } from "react";
import UseAuth from "../../hooks/UseAuth";
import axios from "axios";

const MyApplications = () => {
  const { user } = UseAuth();
  const [jobs, setJobs] = useState([]);
  console.log(jobs);

  useEffect(() => {
    // fetch(`http://localhost:3000/job-application?email=${user.email}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setJobs(data);
    // });

    axios
      .get(`http://localhost:3000/job-application?email=${user.email}`, {
        withCredentials: true,
      })
      .then((res) => console.log(setJobs(res.data)));
  }, [user.email]);

  return (
    <div>
      <h2 className="text-3xl">My Applications: {jobs.length}</h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Post</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {jobs.map((job) => (
              <tr key={job._id}>
                <th></th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={job.company_logo}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{job.title}</div>
                      <div className="text-sm opacity-50">{job.location}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {job.company}
                  <br />
                  <div className="">
                    <img className="w-6 rounded-full" src={job.photo} alt="" />
                  </div>
                </td>
                <td>{job.title}</td>
                <th>
                  <button className="btn btn-error text-slate-200 font-semibold btn-xs">
                    delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyApplications;
