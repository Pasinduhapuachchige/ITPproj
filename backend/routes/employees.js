const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Fetch All Employees (HR Manager, System Admin, and Recruiting Manager can fetch employees)
router.get('/', auth(['hr_manager', 'system_admin', 'recruiting_manager']), async (req, res) => {
  try {
    const employees = await User.find({}, { password: 0 }); // Exclude the password field
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch a Single Employee by ID (HR Manager, System Admin, and Recruiting Manager can fetch employees)
router.get('/:id', auth(['hr_manager', 'system_admin', 'recruiting_manager']), async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await User.findById(id, { password: 0 }); // Exclude the password field
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add Employee (System Admin or HR Manager can add employees)
router.post('/', auth(['system_admin', 'hr_manager']), async (req, res) => {
  const { employeeNumber, name, email, phoneNumber, password, role } = req.body;

  try {
    const existingEmployee = await User.findOne({ employeeNumber });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Employee number already exists' });
    }

    const user = new User({ employeeNumber, name, email, phoneNumber, password, role });
    await user.save();
    res.status(201).json({ message: 'Employee added successfully' });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ message: 'Employee number or email already exists' });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

// Update Employee (System Admin or HR Manager can update employees)
router.put('/:id', auth(['system_admin', 'hr_manager']), async (req, res) => {
  const { id } = req.params;
  const { employeeNumber, name, email, phoneNumber, role } = req.body;

  try {
    if (employeeNumber) {
      const existingEmployee = await User.findOne({ employeeNumber, _id: { $ne: id } });
      if (existingEmployee) {
        return res.status(400).json({ message: 'Employee number already exists' });
      }
    }

    const updatedEmployee = await User.findByIdAndUpdate(
      id,
      { employeeNumber, name, email, phoneNumber, role },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ message: 'Employee updated successfully', employee: updatedEmployee });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Employee (System Admin or HR Manager can delete employees)
router.delete('/:id', auth(['system_admin', 'hr_manager']), async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEmployee = await User.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;