const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    index: true,
  },
  avatarUrl: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 50,
  },
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  hashedPassword: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 60,
  },
  friendcode: {
    type: String,
    required: false,
  },
  recievedPostsIds: [
    {
      id: {
        type: String,
        required: true,
      },
      read: {
        type: Boolean,
        default: false,
      },
    },
  ],
  friendIds: [
    {
      friendcode: {
        type: String,
        required: true,
      },
      read: {
        type: Boolean,
        default: false,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  userSettings: {
    type: Array,
    default: [{ theme: 'sunriseSunset-theme' }, { notificationTime: '19:00' }],
  },
  messagesCount: {
    type: String,
    default: '0',
  },
  voting: {
    type: Object,
    default: { country1: '12', country2: '10', country3: '8' },
  },
  bet: {
    type: Object,
    default: {
      country1: 'Platz 12',
      country2: ' Platz 10',
      country3: 'Platz 8',
    },
  },
});

const User = mongoose.model('UserCollection', userSchema); //"UserCollection" ist the name of the collection in the database

module.exports = User;
