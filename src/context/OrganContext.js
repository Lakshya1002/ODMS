import React, { createContext, useState } from 'react';

export const OrganContext = createContext();

export const OrganProvider = ({ children }) => {
  const [donors, setDonors] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [matches, setMatches] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const addDonor = (donor) => {
    const donorWithId = { id: donors.length + 1, ...donor };
    setDonors([...donors, donorWithId]);

    // Add to alerts
    setAlerts([...alerts, { id: alerts.length + 1, message: `New donor available: ${donor.name} for ${donor.organType}`, priority: 'High' }]);

    // Auto-match with recipient
    const matchedRecipient = recipients.find(rec => rec.organNeeded === donor.organType);
    if (matchedRecipient) {
      setMatches([...matches, { id: matches.length + 1, donor: donorWithId.name, recipient: matchedRecipient.name, organ: donor.organType, status: 'Matched' }]);
    }
  };

  const addRecipient = (recipient) => {
    const recipientWithId = { id: recipients.length + 1, ...recipient };
    setRecipients([...recipients, recipientWithId]);

    // Add to alerts
    setAlerts([...alerts, { id: alerts.length + 1, message: `New recipient registered: ${recipient.name} needs ${recipient.organNeeded}`, priority: 'Medium' }]);

    // Auto-match with donor
    const matchedDonor = donors.find(don => don.organType === recipient.organNeeded);
    if (matchedDonor) {
      setMatches([...matches, { id: matches.length + 1, donor: matchedDonor.name, recipient: recipientWithId.name, organ: recipient.organNeeded, status: 'Matched' }]);
    }
  };

  return (
    <OrganContext.Provider value={{ donors, recipients, matches, alerts, addDonor, addRecipient }}>
      {children}
    </OrganContext.Provider>
  );
};
