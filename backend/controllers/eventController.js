const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create({ ...req.body, user: req.user.id });
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: "Error creating event" });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({ user: req.user.id });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    
    res.json(event);
  } catch (error) {
    res.status(400).json({ message: "Error updating event" });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};