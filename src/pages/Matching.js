import React, { useContext } from 'react';
import { OrganContext } from '../context/OrganContext'; // Import OrganContext
import './Matching.css';

const Matching = () => {
  const { matches } = useContext(OrganContext); // Use OrganContext

  return (
    <div className="matching">
      <h2>Matching Donors and Recipients</h2>
      <p className="matching-description">
        Below is the list of matches between donors and recipients. This table helps track organ compatibility and donation status.
      </p>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Donor</th>
            <th>Recipient</th>
            <th>Organ</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match.id}>
              <td>{match.id}</td>
              <td>{match.donor}</td>
              <td>{match.recipient}</td>
              <td>{match.organ}</td>
              <td>
                <span className={`status ${match.status.toLowerCase()}`}>
                  {match.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Matching;