import React from 'react';
import { useActionSummary, useActionCalendar } from '../utils/queries';

const ActionsOverview: React.FC = () => {
  const { data: summary, isLoading: loadingSummary } = useActionSummary();
  const { data: calendar, isLoading: loadingCalendar } = useActionCalendar();


  if (loadingSummary || loadingCalendar) return <div>Loading actions...</div>;

  type Summary = { data?: { totalImpact: number; count: number; streak: number } };
  type Calendar = { data?: Record<string, any[]> };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded p-4 shadow">
        <h3 className="font-bold text-green-700 mb-2">Your Impact</h3>
  <div>Total Impact: {(summary as Summary)?.data?.totalImpact ?? 0}</div>
  <div>Actions: {(summary as Summary)?.data?.count ?? 0}</div>
  <div>Streak: {(summary as Summary)?.data?.streak ?? 0} days</div>
      </div>
      <div className="bg-white rounded p-4 shadow">
        <h3 className="font-bold text-green-700 mb-2">Calendar</h3>
        <div className="grid grid-cols-7 gap-1">
          {calendar &&
            Object.entries((calendar as Calendar)?.data ?? {}).map(([date, acts]) => {
              const actsArr = acts as any[];
              return (
                <div key={date} className="text-xs text-center bg-green-100 rounded p-1">
                  <div>{date}</div>
                  <div>{actsArr.length} actions</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ActionsOverview;
