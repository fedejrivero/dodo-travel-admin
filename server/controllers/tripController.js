const Trip = require('../models/tripModel');

// @desc    Get all trips
// @route   GET /api/trips
// @access  Public
exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.findAll();
    res.status(200).json({ success: true, count: trips.length, data: trips });
  } catch (error) {
    console.error('Error fetching trips:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get single trip
// @route   GET /api/trips/:id
// @access  Public
exports.getTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    
    if (!trip) {
      return res.status(404).json({ success: false, error: 'Trip not found' });
    }
    
    res.status(200).json({ success: true, data: trip });
  } catch (error) {
    console.error('Error fetching trip:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Create new trip
// @route   POST /api/trips
// @access  Private/Admin
exports.createTrip = async (req, res) => {
  try {
    const trip = await Trip.create(req.body);
    res.status(201).json({ success: true, data: trip });
  } catch (error) {
    console.error('Error creating trip:', error);
    res.status(500).json({ success: false, error: 'Error creating trip' });
  }
};

// @desc    Update trip
// @route   PUT /api/trips/:id
// @access  Private/Admin
exports.updateTrip = async (req, res) => {
  try {
    const trip = await Trip.update(req.params.id, req.body);
    
    if (!trip) {
      return res.status(404).json({ success: false, error: 'Trip not found' });
    }
    
    res.status(200).json({ success: true, data: trip });
  } catch (error) {
    console.error('Error updating trip:', error);
    res.status(500).json({ success: false, error: 'Error updating trip' });
  }
};

// @desc    Delete trip
// @route   DELETE /api/trips/:id
// @access  Private/Admin
exports.deleteTrip = async (req, res) => {
  try {
    const deleted = await Trip.delete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Trip not found' });
    }
    
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error('Error deleting trip:', error);
    res.status(500).json({ success: false, error: 'Error deleting trip' });
  }
};
