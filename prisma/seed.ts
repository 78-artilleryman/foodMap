import { PrismaClient } from '@prisma/client';
// import * as data from '../src/data/stores_data.json';

const prisma = new PrismaClient();

// async function seedData() {
//   data?.['DATA']?.map(async store => {
//     const storeData = {
//       phone: store?.tel_no,
//       address: store?.rdn_code_nm,
//       lat: store?.y_dnts,
//       lag: store?.x_cnts,
//       name: store?.upso_nm,
//       category: store?.bizcnd_code_nm,
//       stroeType: store?.cob_code_nm,
//       foodCertifyName: store?.crtfc_gbn_nm,
//     };

//     const res = await prisma.store.create({
//       data: storeData,
//     });
//     console.log(res);
//   });
// }

async function main() {
  // wait seedData();
}

main()
  .catch(e => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
