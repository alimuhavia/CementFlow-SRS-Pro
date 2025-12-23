
import React from 'react';
import { Requirement } from '../types';

interface SRSSectionViewProps {
  title: string;
  subtitle: string;
  requirements?: Requirement[];
  rawText?: string;
}

const SRSSectionView: React.FC<SRSSectionViewProps> = ({ title, subtitle, requirements, rawText }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 border-b border-slate-200 pb-4">
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">{title}</h2>
        <p className="text-slate-500 mt-1">{subtitle}</p>
      </div>

      {rawText && (
        <div className="prose prose-slate max-w-none">
          {rawText.split('\n').map((line, idx) => {
            const trimmed = line.trim();
            if (!trimmed) return <div key={idx} className="h-4" />;
            if (trimmed.startsWith('**')) {
              return <h3 key={idx} className="text-lg font-semibold mt-4 mb-2 text-slate-700">{trimmed.replace(/\*\*/g, '')}</h3>;
            }
            if (trimmed.startsWith('-')) {
              return <li key={idx} className="ml-4 text-slate-600">{trimmed.substring(1).trim()}</li>;
            }
            return <p key={idx} className="text-slate-600 leading-relaxed">{trimmed}</p>;
          })}
        </div>
      )}

      {requirements && (
        <div className="grid gap-6">
          {requirements.map((req) => (
            <div key={req.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                  <span className="bg-slate-100 text-slate-500 text-xs font-bold px-2 py-1 rounded-md border border-slate-200 group-hover:bg-sky-50 group-hover:text-sky-600 group-hover:border-sky-200 transition-colors">
                    {req.id}
                  </span>
                  <h4 className="text-lg font-bold text-slate-800">{req.title}</h4>
                </div>
                <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full border ${
                  req.priority === 'High' ? 'bg-red-50 text-red-600 border-red-200' :
                  req.priority === 'Medium' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                  'bg-emerald-50 text-emerald-600 border-emerald-200'
                }`}>
                  {req.priority} Priority
                </span>
              </div>
              <p className="text-slate-600 mb-4">{req.description}</p>
              {req.examples && req.examples.length > 0 && (
                <div className="bg-slate-50 rounded-lg p-4">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Examples / Edge Cases</span>
                  <ul className="space-y-1">
                    {req.examples.map((ex, i) => (
                      <li key={i} className="flex items-center text-sm text-slate-600">
                        <svg className="w-3 h-3 mr-2 text-sky-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SRSSectionView;
