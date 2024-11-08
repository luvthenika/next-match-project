import { membersData } from "./membersData";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seedMembers() {
  const hashedPassword = await bcrypt.hash('sdxnsma', 10);

  await Promise.all(membersData.map(async (member) => {
    await prisma.user.create({
      data: {
        email: member.email,
        fullName: member.name,
        username: member.username,
        passwordHash: hashedPassword,
        image: member.image,
        member: {
          create: {
            name: member.name,
            gender: member.gender,
            dateOfbirth: new Date(member.dateOfBirth),
            created: new Date(member.created),
            updated: new Date(member.lastActive),
            description: member.description,
            city: member.city,
            country: member.country,
            image: member.image,
            photo: {
              create: {
                url: member.image,
                publicId: '1'
              }
            }
          }
        }
      }
    });
  }));
}

seedMembers()
  .then(() => {
    console.log('Seeding completed.');
    prisma.$disconnect();
  })
  .catch((error) => {
    console.error('Error seeding members:', error);
    prisma.$disconnect();
  });
