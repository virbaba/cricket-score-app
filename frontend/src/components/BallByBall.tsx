import React from 'react';
import axios from 'axios';
import { ScoreEvent } from '../types/ScoreEvent';

type Props = {
  events: ScoreEvent[];
  onEdit: () => void;
};

export default function BallByBall({ events, onEdit }: Props) {
  const API = import.meta.env.VITE_API_URL;

  const handleEdit = async (e: ScoreEvent) => {
    // 1. Prompt for new runs (you can expand this to edit type/extras too)
    const newRuns = prompt('Enter updated runs for ball #' + e.ballNumber, String(e.runs));
    if (newRuns === null) return;
    const runs = parseInt(newRuns, 10);
    if (isNaN(runs)) {
      alert('Invalid number of runs');
      return;
    }

    // 2. Call the backend
    try {
      await axios.put(`${API}/event/${e._id}`, { runs });
      // 3. Re-fetch everything
      onEdit();
    } catch (err) {
      console.error('Failed to update event:', err);
      alert('Error updating event');
    }
  };

  return (
    <div className="space-y-1">
      <h4 className="font-semibold">Ball By Ball Commentary</h4>
      {events.map((e) => (
        <div key={e._id} className="flex justify-between p-2 border rounded">
          <span>
            Ball {e.ballNumber}: {e.type} ({e.runs} run{e.runs !== 1 ? 's' : ''})
          </span>
          <button
            onClick={() => handleEdit(e)}
            className="px-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer"
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}
