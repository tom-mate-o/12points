// putVotingResultsToUserConfig.js

import axios from 'axios';
import showNotifications from '../components/showNotifications/showNotificationsToastify';

export async function putVotingResultsToUserConfig(id, voting) {
  try {
    const config = {
      method: 'put',
      url: `${process.env.REACT_APP_BACKEND_URL}/api/putVotingResultsToUser`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ id: id.id, voting: voting }),
    };

    const response = await axios(config);
    showNotifications('Voting successfully submitted', 'success');

    return true;
  } catch (error) {
    console.error('Fetch in Frontend failed', error);
    showNotifications(`Error: ${error.message}`, 'error');
    if (error.response && error.response.status === 400) {
      showNotifications('Something went wrong...', 'error');
    }
    return false;
  }
}
