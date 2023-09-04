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
    first_name: 'Nigora',
    last_name: 'Saidova',
    age: 28,
    role: 'admin',
    username: 'nigora28',
    password: hashSync('Nigora123', 10),
  },
  {
    first_name: 'Shokhsanam',
    last_name: 'Aliyeva',
    age: 25,
    role: 'admin',
    username: 'shokhsanam25',
    password: hashSync('Shokhsanam567', 10),
  },
  {
    first_name: 'Jasur',
    last_name: 'Karimov',
    age: 32,
    role: 'admin',
    username: 'jasur32',
    password: hashSync('Jasur#12345', 10),
  },
  {
    first_name: 'Shaxzoda',
    last_name: 'Yunusova',
    age: 29,
    role: 'admin',
    username: 'shaxzoda29',
    password: hashSync('Shaxzoda6789', 10),
  },
  {
    first_name: 'Ulugbek',
    last_name: 'Muminov',
    age: 27,
    role: 'employee',
    username: 'ulugbek27',
    password: hashSync('UlugbekX12', 10),
  },
  {
    first_name: 'Nodira',
    last_name: 'Sultonova',
    age: 31,
    role: 'employee',
    username: 'nodira31',
    password: hashSync('Nodira456', 10),
  },
  {
    first_name: 'Ibrohim',
    last_name: 'Xasanov',
    age: 24,
    role: 'employee',
    username: 'ibrohim24',
    password: hashSync('Ibrohim#7890', 10),
  },
  {
    first_name: 'Zuhra',
    last_name: 'Toshpulatova',
    age: 26,
    role: 'employee',
    username: 'zuhra26',
    password: hashSync('Zuhra5678', 10),
  },
  {
    first_name: 'Sherzodbek',
    last_name: 'Qurbonov',
    age: 28,
    role: 'employee',
    username: 'sherzodbek28',
    password: hashSync('Sherzodbek1234', 10),
  },
  {
    first_name: 'Dilnoza',
    last_name: 'Ochilova',
    age: 29,
    role: 'employee',
    username: 'dilnoza29',
    password: hashSync('Dilnoza@5678',10),
  },
  {
    first_name: 'Nargiza',
    last_name: 'Saidova',
    age: 25,
    role: 'employee',
    username: 'nargiza25',
    password: hashSync('NargizaX123', 10),
  },
  {
    first_name: 'Akram',
    last_name: 'Aliyev',
    age: 31,
    role: 'employee',
    username: 'akram31',
    password: hashSync('Akram#12345',10),
  },
  {
    first_name: 'Sarvar',
    last_name: 'Karimov',
    age: 28,
    role: 'employee',
    username: 'sarvar28',
    password: hashSync('Sarvar12345', 10),
  },
  {
    first_name: 'Gulnoza',
    last_name: 'Yunusova',
    age: 27,
    role: 'employee',
    username: 'gulnoza27',
    password: hashSync('Gulnoza#1234',10),
  },
  {
    first_name: 'Nasiba',
    last_name: 'Muminova',
    age: 24,
    role: 'employee',
    username: 'nasiba24',
    password: hashSync('Nasiba5678', 10),
  },
  {
    first_name: 'Ilyos',
    last_name: 'Xasanov',
    age: 26,
    role: 'employee',
    username: 'ilyos26',
    password: hashSync('IlyosX7890', 10),
  },
  {
    first_name: 'Nargiz',
    last_name: 'Toshpulatova',
    age: 32,
    role: 'employee',
    username: 'nargiz32',
    password: hashSync('Nargiz#1234',10),
  },
  {
    first_name: 'Jaloliddin',
    last_name: 'Qurbonov',
    age: 29,
    role: 'employee',
    username: 'jaloliddin29',
    password: hashSync('Jaloliddin12345', 10),
  },
  {
    first_name: 'Shaxlo',
    last_name: 'Ochilova',
    age: 30,
    role: 'employee',
    username: 'shaxlo30',
    password: hashSync('Shaxlo@1234',10),
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
