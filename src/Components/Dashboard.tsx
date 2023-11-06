import React from 'react';
import { IUser } from '../interface/User';

interface DashboardProps {
  loggedUser: IUser | null;
}

const Dashboard: React.FC<DashboardProps> = ({ loggedUser }) => {
  return (
    <div>
      {/* Your Dashboard component code here */}
      <h1>Dashboard</h1>
      {loggedUser && <p>Welcome, {loggedUser.username}!</p>}
    </div>
  );
};

export default Dashboard;
