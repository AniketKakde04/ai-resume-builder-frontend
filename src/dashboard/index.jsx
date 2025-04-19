import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import GlobalApi from '../../service/GlobalApi'
import { useUser } from '@clerk/clerk-react'
import ResumeCardItem from './components/ResumeCardItem'

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    user && GetResumesList();
  }, [user]);

  const GetResumesList = () => {
    GlobalApi.GetUserResume(user?.primaryEmailAddress?.emailAddress)
      .then(resp => {
        setResumeList(resp.data.data);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4 py-12">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold">My Resume</h2>
          <p className="text-gray-300 mt-2">Start creating AI-powered resumes for your next job role</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 backdrop-blur-md bg-white/10 p-6 rounded-2xl border border-white/20 shadow-lg">
          <AddResume />
          {resumeList.length > 0 && resumeList.map((resume, index) => (
            <ResumeCardItem key={index} resume={resume} refreshData={GetResumesList} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
