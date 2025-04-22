import React from 'react';
import Layout from '../components/Layout';

const AnalyticsPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6\">
        <h1 className="text-2xl font-bold text-gray-800\">Analytics</h1>
        <p className="text-gray-600 mt-1\">View reports and metrics</p>
        <div className="bg-white rounded-lg shadow-md p-6 mt-6\">
          <h2 className="text-lg font-semibold text-gray-800\">Reports</h2>
          <p className="text-gray-500\">Detailed analytics will be displayed here.</p>
        </div>
      </div>
    </Layout>
  );
};

export default AnalyticsPage; 