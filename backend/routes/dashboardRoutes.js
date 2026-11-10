const express = require('express');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, (req, res) => {
  res.status(200).json({
    message: `Welcome back, ${req.user.name}`,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      memberSince: req.user.createdAt
    },
    stats: {
      ordersToday: 42,
      revenueToday: 318.5,
      topDrink: 'Flat White',
      loyaltyPoints: 120
    }
  });
});

module.exports = router;
