import React from 'react'
import Header from '../../components/Header'
import DashboardCard from '../../components/DashboardCard'
import TaskSection from '../../components/TaskSection'
import Recent from '../../components/Recent'

const Dashboard = () => {
  return (
    <div >
      <Header />
      <div className='mt-6'>
        <h2 className='font-medium text-xl mb-4'>Dashboard</h2>
        <DashboardCard />
        <div className='md:flex items-start gap-3'>
          <TaskSection />
          <Recent/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
