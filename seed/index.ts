import mongoose from 'mongoose';

import { usersSeed } from './users';

mongoose.connect('mongodb://127.0.0.1:27017/imtihon');

async function seed() {
  try {
    await usersSeed();
  } catch (error) {
    console.error('Seedda xato yuz berdi:', error);
  } finally {
    mongoose.disconnect();
  }
}

seed();
