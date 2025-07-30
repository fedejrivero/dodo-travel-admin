const API_URL = 'http://localhost:5001/api';

export const getTrips = async () => {
  try {
    const response = await fetch(`${API_URL}/trips`);
    if (!response.ok) {
      throw new Error('Failed to fetch trips');
    }
    const data = await response.json();
    return data.data; // Return the trips array from the response
  } catch (error) {
    console.error('Error fetching trips:', error);
    throw error;
  }
};

export const getTrip = async (id) => {
  try {
    const response = await fetch(`${API_URL}/trips/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch trip');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching trip ${id}:`, error);
    throw error;
  }
};

export const createTrip = async (tripData) => {
  try {
    const response = await fetch(`${API_URL}/trips`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tripData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create trip');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error creating trip:', error);
    throw error;
  }
};
