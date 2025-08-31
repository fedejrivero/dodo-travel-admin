// const API_URL = 'http://localhost:5001/api';
const API_URL = 'https://srv942210.hstgr.cloud/api';

/**
 * Fetches rates for a specific trip by its ID
 * @param {string|number} tripId - The ID of the trip to get rates for
 * @returns {Promise<Array>} A promise that resolves to an array of rates for the trip
 * @throws {Error} If the request fails or returns an error status
 */
export const getRatesByTripId = async (tripId) => {
  try {
    const response = await fetch(`${API_URL}/rates/trip/${tripId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to fetch rates');
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching rates for trip ${tripId}:`, error);
    throw error;
  }
};

export const createRate = async (rateData) => {
  try {
    const formattedData = {
      ...rateData,
      assist: !!(rateData.assist) ? 1 : 0,
      excursions:!!(rateData.excursions) ? 1 : 0,
    };

    const response = await fetch(`${API_URL}/rates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to create rate');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating rate:', error);
    throw error;
  }
};

export const deleteRate = async (rateId) => {
  try {
    const response = await fetch(`${API_URL}/rates/${rateId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to delete rate');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting rate:', error);
    throw error;
  }
};

export const deleteRatesByTripId = async (tripId) => {
  try {
    const response = await fetch(`${API_URL}/rates/trip/${tripId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to delete rates');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting rates:', error);
    throw error;
  }
};
// Add more rate-related service methods here as needed
