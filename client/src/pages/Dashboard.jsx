import React, {useEffect,useState} from 'react'
import { useLocation } from 'react-router-dom'
import DashProfile from '../components/DashProfile';
import DashSidebar from '../components/DashSidebar';
import DashPosts from '../components/DashPosts';
import DashUser from '../components/DashUser'
import DashComments from '../components/DashComments';
import DashboardComp from '../components/DashboardComp';

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect( () => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  }, [location.search])
  return (
    <div className='min-h-screen flex flex-col md:flex-row '>
      {/* sidebar */}
      <div className="md:w-56">
         <DashSidebar/>
      </div>

      <div className="w-full">
      {/* profile... */}
       {tab === 'profile' && <DashProfile/>}
       {/* posts */}
       {tab=== 'posts' && <DashPosts/>}
       {/* users */}
       {tab=== 'users' && <DashUser/>}
       {/* comments */}
       {tab === 'comments' && <DashComments/> }
       {/* dashbordComp */}
       {tab === 'dashboardComp' && <DashboardComp/> }
      </div>
    </div>
  )
}
