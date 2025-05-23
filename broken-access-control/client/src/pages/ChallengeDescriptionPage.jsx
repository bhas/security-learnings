import { useState } from 'react';

const challenges = [
  {
    title: 'Challenge 1: I spy with my little eye',
    description: 'It seems an outsider has managed to bypass the authentication and started sharing the names of all users on internet. We cannot have our users\' information shared in public. Find out how this could have happened.',
    hint: 'VmVyaWZ5IHRoYXQgYWxsIGVuZHBvaW50cyBoYXZlIHN1ZmZpY2llbnQgcGVybWlzc2lvbnMgY2hlY2tzLg=='
  },
  {
    title: 'Challenge 2: Comments out of control',
    description: 'Poor emilyr has written a really mean comment on the latest announcement. She says she did not write it. Can you find out if someoen else could have done it or do we need to punish her?',
    hint: 'VGhlIFVJIG1heSBub3QgYWxsb3cgeW91IHRvIHBvc3QgdW5kZXIgYW5vdGhlciBwZXJzb25zIG5hbWUsIGJ1dCBtYXliZSB0aGUgQVBJIGRvZXMuIFRyeSBleHBlcmllbWVudCBjYWxsaW5nIHRoZSBBUEkgd2l0aCBkaWZmZXJlbnQgYXJndW1lbnRzIHVzaW5nIFBvc3RtYW4u'
  },
  {
    title: 'Challenge 3: I see, I like, I take',
    description: 'One user claims that she wrote the post "Writing with Style" but it is not in her name anymore. Can you find out how this could have happened?',
    hint: 'VGhlIEFQSSBoYXZlIGEgbG90IG9mIGVuZHBvaW50cywgc29tZSBub3QgYWNjZXNpYmxlIGZyb20gdGhlIFVJLiBUcnkgdG8gZmluZCB0aGUgb25lIHRoYXQgYWxsb3dzIHlvdSB0byBjaGFuZ2UgdGhlIG93bmVyIG9mIGEgcG9zdC4='
  },
  {
    title: 'Challenge 4: An uncomfortable offer',
    description: 'The company was blackmailed today where an anonumous party claimed that they had a lot of sensitive user data. As proof they shared the sensitive details of the manager. He panicked and payd the hackers. How could the hackers have gotten access to this sensitive information?',
    hint: 'SWYgdGhlIGlucHV0cyBmb3IgYW4gZW5kcG9pbnQgaXMgbm90IHByb3Blcmx5IHZhbGlkYXRlZCBhIG1hbGljaW91cyB1c2VyIGNvdWxkIGJlIGFibGUgdG8gYWNjZXNzIHNlbnNpdGl2ZSBpbmZvcm1hdGlvbi4gTWF5YmUgdGhlIGhhY2tlciBjb3VsZCBoYXZlIGd1ZXNzZWQgdGhlIHRoZSBVUkwgdG8gZ2V0IHRoaXMgaW5mb3JtYXRpb24/'
  },
];

export default function ChallengeDescriptionPage() {
  const [openHint, setOpenHint] = useState(null);

  return (
    <div className="challenge-description-page main-container">
      <h2>Challenges</h2>
      <p>
       <b> You're company have been hacked!</b> Your boss is not happy and you need to find out how this could have happened. 
       To help you solve the below challenges they have provided you with a developer login:
      </p>
      <ul>
            <li>Username: developer</li>
            <li>Password: 1234</li>
       </ul>
      <p>
        These challenges helps you understand how hackers can exploit <a href='https://owasp.org/Top10/A01_2021-Broken_Access_Control/'>Broken Access Control Vulnerabilities</a>.
        Once you solve them, try to find out how to fix them.
      </p>
      <p>
        <b>Want an extra challenge?</b> Try to solve the challenges without looking at the hints or the API code. If you get stuck, you can always look at the hints.
      </p>
      {challenges.map((c, idx) => (
        <div key={idx} style={{marginBottom:20}}>
          <h3>{c.title}</h3>
          <p>{c.description}</p>
          <button onClick={() => setOpenHint(openHint === idx ? null : idx)}>
            {openHint === idx ? 'Hide Hint' : 'Show Hint'}
          </button>
          {openHint === idx && <div className="hint" style={{background:'#eee',padding:10,marginTop:5}}>{atob(c.hint)}</div>}
        </div>
      ))}
    </div>
  );
}
