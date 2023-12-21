import React, { useState } from 'react'
import './Dashboard.scss'
import Loader from '../../Componenets/Loader/Loader'
import { Chart } from './Chart'
import Revenue from './Revenue'
import Users from './Users'

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState('false')

  return (
    <div className="content-body">
      {!isLoading ? (
        <Loader />
      ) : (
        <div className="container-fluid">
          <div className="row">
            <Chart />
            <Revenue />
            <Users />            
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;