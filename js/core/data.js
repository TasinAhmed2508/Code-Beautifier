export const DEFAULT_CODE = `import React, { useState } from 'react';

function AwesomeCard() {
  const [count, setCount] = useState(0);

  return (
    <div className="card">
      <h1>Hello World</h1>
      <button onClick={() => setCount(c => c + 1)}>
        Count is {count}
      </button>
    </div>
  );
}`;

export const THEMES = {
  ray: 'linear-gradient(140deg, rgb(207, 47, 152), rgb(106, 61, 236))',
  'ray-slate': 'radial-gradient(circle at top, rgba(81, 208, 248, 0.16), transparent 55%), radial-gradient(circle at 85% 20%, rgba(150, 129, 194, 0.18), transparent 45%), linear-gradient(160deg, rgba(10, 12, 16, 0.98), rgba(20, 23, 30, 0.92))',
  'ray-moss': 'radial-gradient(circle at top, rgba(109, 215, 159, 0.2), transparent 55%), radial-gradient(circle at 85% 15%, rgba(228, 177, 101, 0.2), transparent 45%), linear-gradient(160deg, rgba(9, 13, 9, 0.98), rgba(16, 20, 14, 0.92))',
  'ray-arctic': 'radial-gradient(circle at top, rgba(46, 217, 255, 0.2), transparent 55%), radial-gradient(circle at 85% 15%, rgba(153, 132, 238, 0.2), transparent 45%), linear-gradient(160deg, rgba(8, 12, 16, 0.98), rgba(14, 18, 24, 0.92))',
  'ray-ember': 'radial-gradient(circle at top, rgba(255, 175, 101, 0.2), transparent 55%), radial-gradient(circle at 85% 15%, rgba(233, 120, 161, 0.2), transparent 45%), linear-gradient(160deg, rgba(16, 12, 8, 0.98), rgba(22, 18, 12, 0.92))',
  midnight: 'linear-gradient(135deg, #0f172a, #4c1d95, #0f172a)',
  ocean: 'linear-gradient(135deg, #2563eb, #06b6d4, #10b981)',
  sunset: 'linear-gradient(135deg, #f97316, #ec4899, #8b5cf6)',
  forest: 'linear-gradient(135deg, #10b981, #0f766e, #064e3b)',
  fire: 'linear-gradient(135deg, #dc2626, #f97316, #facc15)',
  nebula: 'linear-gradient(135deg, #312e81, #7e22ce, #db2777)',
  clean: '#e2e8f0'
};

export const PADDINGS = ['small', 'medium', 'large'];
export const WINDOW_STYLES = ['mac', 'win', 'none'];
