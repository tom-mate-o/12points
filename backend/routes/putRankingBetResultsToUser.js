// putRankingBetResultsToUserConfig.js

const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');

router.put('/', async (req, res) => {
  try {
    const userId = req.body.id;
    const bet = req.body.bet;
    console.log('userId:', userId);
    console.log('bet:', bet);

    const updatedUser = await User.findOneAndUpdate(
      { id: userId }, // Suchkriterien
      { bet: bet }, // Aktualisierungsdaten
      { new: true } // Optionen: gibt das aktualisierte Dokument zurück
    );

    if (updatedUser) {
      res.status(200).send({ message: 'Voting updated successfully in DB!' });
    } else {
      res.status(404).send({ message: 'User not found in DB' });
    }
  } catch (error) {
    console.error('Error updating voting in DB', error);
    res.status(500).send({ message: 'Error updating voting in DB' });
  }
});

module.exports = router;
