import React from 'react';

interface Bowler {
  _id: string;
  name: string;
  overs?: number;
  balls?: number;
  runsConceded?: number;
  wickets?: number;
}

type Props = {
  bowlers: Bowler[] | null;
};

export default function BowlerStats({ bowlers }: Props) {
  return (
    <div className="border rounded p-4 flex-1">
      <h3 className="font-semibold mb-2">Bowler Scorecard</h3>
      {(!bowlers || bowlers.length === 0) ? (
        <p className="text-gray-500 text-sm">No bowler data.</p>
      ) : (
        <table className="w-full text-left table-auto">
          <thead>
            <tr>
              <th className="pb-2">Name</th>
              <th className="pb-2">Overs</th>
              <th className="pb-2">Runs</th>
              <th className="pb-2">Wkts</th>
            </tr>
          </thead>
          <tbody>
            {bowlers.map((b) => (
              <tr key={b._id} className="even:bg-gray-50">
                <td className="py-1">{b.name}</td>
                <td className="py-1">{b.overs ?? 0}</td>
                <td className="py-1">{b.runsConceded ?? 0}</td>
                <td className="py-1">{b.wickets ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
