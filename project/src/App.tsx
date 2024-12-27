import React from 'react';
import { Header } from './components/Header';
import { IssueCertificate } from './components/IssueCertificate';
import { VerifyCertificate } from './components/VerifyCertificate';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <section id="issue">
              <IssueCertificate />
            </section>
            
            <section id="verify">
              <VerifyCertificate />
            </section>
          </div>

          <section className="mt-12 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-indigo-600 font-bold">1</span>
                </div>
                <h3 className="font-medium mb-2">Issue Certificate</h3>
                <p className="text-gray-600 text-sm">Educational institutions issue digital certificates secured by blockchain</p>
              </div>
              
              <div className="text-center p-4">
                <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-indigo-600 font-bold">2</span>
                </div>
                <h3 className="font-medium mb-2">Store on Blockchain</h3>
                <p className="text-gray-600 text-sm">Certificates are stored immutably on the blockchain network</p>
              </div>
              
              <div className="text-center p-4">
                <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-indigo-600 font-bold">3</span>
                </div>
                <h3 className="font-medium mb-2">Instant Verification</h3>
                <p className="text-gray-600 text-sm">Anyone can verify certificates authenticity instantly</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;