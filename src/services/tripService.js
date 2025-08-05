const API_URL = 'http://localhost:5001/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.error || 'Request failed');
    error.details = data.details;
    throw error;
  }
  return data.data;
};

export const getTrips = async () => {
  try {
    const response = await fetch(`${API_URL}/trips`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching trips:', error);
    throw error;
  }
};

export const getTrip = async (id) => {
  try {
    const response = await fetch(`${API_URL}/trips/${id}`);
    return handleResponse(response);
  } catch (error) {
    console.error(`Error fetching trip with id ${id}:`, error);
    throw error;
  }
};

export const createTrip = async (tripData) => {
  try {
    // Ensure data is in the correct format
    const formattedData = {
      ...tripData,
      price: Number(tripData.price),
      dates: Array.isArray(tripData.dates) 
        ? tripData.dates 
        : [tripData.dates].filter(Boolean),
      image_url: tripData.image_url || null
    };

    const response = await fetch(`${API_URL}/trips`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
    });

    return handleResponse(response);
  } catch (error) {
    console.error('Error creating trip:', error);
    throw error;
  }
};

export const updateTrip = async (id, tripData) => {
  try {
    // Ensure data is in the correct format
    const formattedData = {
      ...tripData,
      price: Number(tripData.price),
      dates: Array.isArray(tripData.dates) 
        ? tripData.dates 
        : [tripData.dates].filter(Boolean),
      image_url: tripData.image_url || null
    };

    const response = await fetch(`${API_URL}/trips/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
    });

    return handleResponse(response);
  } catch (error) {
    console.error(`Error updating trip with id ${id}:`, error);
    throw error;
  }
};

export const deleteTrip = async (id) => {
  try {
    const response = await fetch(`${API_URL}/trips/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Error deleting trip with id ${id}:`, error);
    throw error;
  }
};
