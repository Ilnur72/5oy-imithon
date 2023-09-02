import { hashSync } from 'bcryptjs';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const nestSchema = new Schema(
  {
    first_name: String,
    last_name: String,
    age: Number,
    role: String,
    username: String,
    password: String,
  },
  { versionKey: false },
);

const Nest = mongoose.model('users', nestSchema);

const seedData = [
  {
    first_name: 'admin',
    last_name: 'admin',
    age: 19,
    role: 'admin',
    username: 'admin',
    password: hashSync('admin1234', 10),
  },
  {
    first_name: 'John',
    last_name: 'Doe',
    age: 26,
    role: 'employee',
    username: 'john',
    password: hashSync('john1234', 10),
  },
  {
    first_name: 'Foo',
    last_name: 'Bar',
    age: 26,
    role: 'employee',
    username: 'foobar',
    password: hashSync('foo1234', 10),
  },
];

export async function usersSeed() {
  try {
    await Nest.deleteMany();
    await Nest.insertMany(seedData);
    console.log("Users listiga Seedlar qo'shildi");
  } catch (error) {
    console.error('Users listida Seedda xato yuz berdi:', error);
  }
}
