import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const nestSchema = new Schema(
  {
    title: String,
    content: String,
    notify: Boolean,
  },
  { versionKey: false },
);

const Nest = mongoose.model('guides', nestSchema);

const seedData = [
  {
    title: "Oylik maoshni sir saqlash bo'yicha tartib",
    content:
      "Sizning oylik maoshingiz, kompaniya va siz o'rtangizda qolishi kerak. Bir xil darajadagi hodim bo'lishlariga qaramasdan, ma'lum sabablarga ko'ra shartnomada turli xil moashga kelishilgan bo'lishi mumkin.",
  },
  {
    title: "O'qituvchi va yordamchi o'qituvchilarning dars qoldirish tartibi",
    content:
      "Sizning oylik maoshingiz, kompaniya va siz o'rtangizda qolishi kerak. Bir xil darajadagi hodim bo'lishlariga qaramasdan, ma'lum sabablarga ko'ra shartnomada turli xil moashga kelishilgan bo'lishi mumkin.",
  },
];

export async function guidesSeed() {
  try {
    await Nest.deleteMany();
    await Nest.insertMany(seedData);
    console.log("Guide listiga Seedlar qo'shildi");
  } catch (error) {
    console.error('Guide listida Seedda xato yuz berdi:', error);
  }
}
