import React from 'react';
import CandidateList from '../components/Candidates/CandidateList';

const CandidatesPage: React.FC = () => {
  return (
    <div>
      {/* <h1 className="text-3xl font-semibold mb-6 text-gray-800">Candidates</h1> */}
      <CandidateList />
    </div>
  );
};

export default CandidatesPage;