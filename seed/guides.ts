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
      "Agar ma'lum sabablarga ko'ra dars qoldirishga majbur bo'lsangiz, birinchi o'rinda o'rningizga dars o'tib berish uchun o'qituvchi topishingiz kerak. Buni yo'nalishingiz bo'yicha guruhdagi boshqa o'qituvchilardan so'rashingiz mumkin.",
  },
  {
    title: 'Ish haqida maslahatnoma',
    content:
      "Kompaniya ichki qoidalari va farmonlari. Bu qoidalarni ishchilarga qanday amalga oshirishlari kerakligini tushuntiring. Misol uchun, ish haqida xabar qilish, amaliyotlar, reja-hisoblar va qo'llanmalar mavzusida bo'lishi mumkin.",
  },
  {
    title: 'Maxsus maqsadlar',
    content:
      "Kompaniya o'zining bosh maqsadlari va ustuvor vazifalari haqida so'z bering. Shu maqsadlar orqali ishchilarga qanday qo'yishlari lozimligini tushuntingsiz.",
  },
  {
    title: 'Maslahat uchun rejalashtirish',
    content:
      "Ishchilar uchun yutuqlar va so'rovlar. Ishchilarning maslahat so'rovlariga tez-tez javob berish usullarini ta'riflang. Maslahat tashqari, ishchilarning maslahatni qanday yaratishlari va topishlari kerakligini tushuntiring.",
  },
  {
    title: 'Konfidensiallik',
    content:
      "Xodimlarga konfidensial ma'lumotlar, ma'lumotlar himoyasi va ma'lumotlarni saqlash qoidalarini ta'riflang. Shu bilan birga, maxfiylikni saqlash uchun kerak bo'lgan muammolar va arizalar bo'yicha rejalashtirishni ham ko'rsating.",
  },
  {
    title: 'Qonunlar va Voqealarni tushunish',
    content:
      "Qonunlar, voqealar, kompaniya etika va ro'yxatdan o'tish shartlari haqida so'z bering. Ishchilarning qonunlarga rioya qilishini talab qilishingiz mumkin.",
  },
  {
    title: "Ta'lim va Rivojlantirish",
    content:
      "Ishchilarning o'zlarini rivojlantirishlari va ta'limlari uchun kompaniya tomonidan qo'llaniladigan imkoniyatlarni ta'riflang. Shu bilan birga, ta'lim jarayonini qanday o'tkazishni ham tushuntingsiz.",
  },
  {
    title: 'Ish va Hayotni moslashuv',
    content:
      "Ish va hayotning moslashishiga oid qoidalarni ta'riflang. Ish va shaxsiy hayot o'rtasidagi sevimlilikni va savodniklikni oshirishni ko'rsating.",
  },
  {
    title: 'Ish faoliyatining samaradorligi',
    content:
      "Ish faoliyati samarali yuritiladi va yutuqlari oshiriladi. Ishchilarning qanday qilib o'zlarini samarali qilishlari kerakligini tushuntingsiz.",
  },
  {
    title: 'Tashriflar va Ijro etish',
    content:
      "Qanday tashriflar, ijro etish va vazifalar taqsimoti haqida ma'lumot bering. Ishchilarning kim qaysi vazifalardan mas'uliyat olishi kerakligini ko'rsating.",
  },
  {
    title: 'Boshqalar bilan munosabatlar',
    content:
      "Kompaniya ichki qoidalarida boshqalar bilan qanday munosabat kurishingiz kerakligini tushuntingsiz. Qo'shimcha ma'lumotlarni, ishchilarning qanday qilib boshqalar bilan birgalikda ishlay olishlari kerakligini ko'rsating.",
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
