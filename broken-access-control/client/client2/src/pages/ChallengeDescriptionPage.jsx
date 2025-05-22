import { useState } from 'react';

const challenges = [
  {
    title: 'Challenge 1: Missing Authentication',
    description: 'Rumors say that the application that someone managed to bypass the authentication. Try to find out how.',
    hint: 'Verify that all endpoints have sufficient permissions checks.'
  },
  {
    title: 'Challenge 2: Comments out of control',
    description: 'Poor emilyr has written a really mean comment on the latest announcement. She says she did not write it. Can you find out if someoen else could have done it? Or do we need to punish her?',
    hint: 'The UI may not allow it, but maybe the API does. Try to call the API using Postman.'
  },
  {
    title: 'Challenge 3: I see, I like, I want',
    description: '',
    hint: 'The UI may not allow it, but maybe the API does. Try to call the API using Postman.'
  }
];

export default function ChallengeDescriptionPage() {
  const [openHint, setOpenHint] = useState(null);

  return (
    <div className="challenge-description-page main-container">
      <h2>Challenges</h2>
      {challenges.map((c, idx) => (
        <div key={idx} style={{marginBottom:20}}>
          <h3>{c.title}</h3>
          <p>{c.description}</p>
          <button onClick={() => setOpenHint(openHint === idx ? null : idx)}>
            {openHint === idx ? 'Hide Hint' : 'Show Hint'}
          </button>
          {openHint === idx && <div className="hint" style={{background:'#eee',padding:10,marginTop:5}}>{c.hint}</div>}
        </div>
      ))}
    </div>
  );
}
