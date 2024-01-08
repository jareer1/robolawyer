import React from 'react';
import './App.css';
import Signup from './components/Signup';
import LoginForm from './components/Login';
import UploadDocuments from './components/UploadDocuments';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GiveFeedback from './components/GiveFeedback';
import ChangePassword from './components/ChangePassword';
import UserHomepage from './components/UserHomepage'
import BlockUser from './components/BlockUser';
import AdminHomepage from './components/AdminHomepage';
import ViewFeedback from './components/ViewFeedback'
import LegalQuery from './components/LegalQuery'
import ChangePasswordAdmin from './components/ChangePasswordAdmin'
import DeactivateAccount from './components/DeactivateUser'
import EditProfile from './components/EditProfile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/Login" element={<LoginForm />} />
          <Route path="/UploadDocuments" element={<UploadDocuments />} />
          <Route path="/GiveFeedback" element={<GiveFeedback />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
          <Route path="/UserHomepage" element={<UserHomepage />} />
          <Route path="/BlockUser" element={<BlockUser />} />
          <Route path="/AdminHomepage" element={<AdminHomepage />} />
          <Route path="/ViewFeedback" element={<ViewFeedback />} />
          <Route path="/LegalQuery" element={<LegalQuery />} />
          <Route path="/ChangePasswordAdmin" element={<ChangePasswordAdmin />} />
          <Route path="/DeactivateAccount" element={<DeactivateAccount />} />
          <Route path="/EditProfile" element={<EditProfile />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
