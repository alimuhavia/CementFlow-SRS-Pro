
import React, { useState } from 'react';
import Layout from './components/Layout';
import SRSSectionView from './components/SRSSectionView';
import AIAssistant from './components/AIAssistant';
import PrototypeView from './components/PrototypeView';
import { SRSSectionType, ViewMode } from './types';
import { SRS_DATA } from './constants';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SRSSectionType>(SRSSectionType.INTRODUCTION);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.SPECIFICATION);

  const sections = Object.values(SRSSectionType);

  const getCurrentContext = () => {
    const data = SRS_DATA[activeSection];
    return `${data.title}: ${data.subtitle}. ${data.rawText || ''} ${data.requirements?.map(r => r.title + ': ' + r.description).join('; ') || ''}`;
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Toggle Controls */}
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">
              {viewMode === ViewMode.SPECIFICATION ? 'Project Specification' : 'Interactive Prototype'}
            </h2>
            <p className="text-slate-500 mt-2">
              {viewMode === ViewMode.SPECIFICATION 
                ? 'Review and refine the core architecture of your Cement Shop management system.' 
                : 'Interact with a live mockup of the system to validate user workflows.'}
            </p>
          </div>
          <div className="flex bg-slate-200 p-1 rounded-2xl shadow-inner">
            <button 
              onClick={() => setViewMode(ViewMode.SPECIFICATION)}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${viewMode === ViewMode.SPECIFICATION ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
            >
              SRS Document
            </button>
            <button 
              onClick={() => setViewMode(ViewMode.PROTOTYPE)}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${viewMode === ViewMode.PROTOTYPE ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Live Demo
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Area */}
          <section className={`lg:col-span-9 space-y-12`}>
            {viewMode === ViewMode.SPECIFICATION ? (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Internal Sidebar for Document */}
                <aside className="lg:col-span-1 space-y-1">
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-3 mb-4">Sections</p>
                   {sections.map((section) => (
                    <button
                      key={section}
                      onClick={() => setActiveSection(section)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center group ${
                        activeSection === section 
                          ? 'bg-sky-50 text-sky-700 shadow-sm border border-sky-100' 
                          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      {SRS_DATA[section].title}
                    </button>
                  ))}
                </aside>
                <div className="lg:col-span-3">
                  <SRSSectionView 
                    title={SRS_DATA[activeSection].title}
                    subtitle={SRS_DATA[activeSection].subtitle}
                    requirements={SRS_DATA[activeSection].requirements}
                    rawText={SRS_DATA[activeSection].rawText}
                  />
                  
                  <div className="mt-16 p-8 bg-slate-100 rounded-3xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-center">
                    <div className="bg-white p-4 rounded-full shadow-md mb-4">
                      <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-slate-800 font-bold mb-1">Add Sub-Requirement</h4>
                    <p className="text-slate-500 text-sm max-w-xs">Need to go deeper? Use the AI Assistant to generate technical edge-cases for this section.</p>
                  </div>
                </div>
              </div>
            ) : (
              <PrototypeView />
            )}
          </section>

          {/* AI Assistant Sidebar */}
          <aside className="lg:col-span-3">
            <div className="sticky top-28">
              <AIAssistant context={getCurrentContext()} />
              <div className="mt-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start space-x-3">
                <div className="bg-emerald-500 p-1 rounded-lg">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-emerald-800 uppercase tracking-tight">Analyst Pro-Tip</h5>
                  <p className="text-[11px] text-emerald-700 leading-relaxed mt-1">
                    When designing the <strong>{viewMode === ViewMode.PROTOTYPE ? 'Interface' : 'Logic'}</strong>, prioritize mobile responsiveness. Shop owners often manage stock while physically in the yard.
                  </p>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </Layout>
  );
};

export default App;
