// putVotingResultsToUserConfig.js

import axios from 'axios';
import showNotifications from '../components/showNotifications/showNotificationsToastify';

export async function putVotingResultsToUserConfig(id, voting) {
  showNotifications('config called');
  try {
    const config = {
      method: 'put',
      url: `${process.env.REACT_APP_BACKEND_URL}/api/putVotingResultsToUser`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ id: id.id, voting: voting }),
    };
    showNotifications('config called');

    const response = await axios(config);
    showNotifications('config called');
    console.log(response.data.message);

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
