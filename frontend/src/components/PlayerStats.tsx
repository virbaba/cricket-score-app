import React from 'react';

interface Batsman {
  _id: string;
  name: string;
  runs: number;
  balls: number;
}

type Props = {
  batsmen: Batsman[] | null;
};

export default function PlayerStats({ batsmen }: Props) {
  return (
    <div className="border rounded p-4 flex-1">
      <h3 className="font-semibold mb-2">Batsman Scorecard</h3>
      {(!batsmen || batsmen.length === 0) ? (
        <p className="text-gray-500 text-sm">No batsman data.</p>
      ) : (
        <table className="w-full text-left table-auto">
          <thead>
            <tr>
              <th className="pb-2">Name</th>
              <th className="pb-2">Runs</th>
              <th className="pb-2">Balls</th>
            </tr>
          </thead>
          <tbody>
            {batsmen.map((b) => (
              <tr key={b._id} className="even:bg-gray-50">
                <td className="py-1">{b.name}</td>
                <td className="py-1">{b.runs}</td>
                <td className="py-1">{b.balls}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
