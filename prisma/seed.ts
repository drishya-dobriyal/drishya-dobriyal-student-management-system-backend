import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Create Users
  const userCount = 5;
  const users = [];
  
  for (let i = 0; i < userCount; i++) {
    const user = await prisma.user.create({
      data: {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        role: i % 2 === 0 ? 'ADMIN' : 'TEACHER',
      },
    });
    users.push(user);
  }

  // Create Courses
  const courseCount = 5;
  const courses = [];

  for (let i = 0; i < courseCount; i++) {
    const course = await prisma.course.create({
      data: {
        title: faker.lorem.words(3),
        userId: users[faker.datatype.number({ min: 0, max: userCount - 1 })].id,
      },
    });
    courses.push(course);
  }

  // Create Students
  const studentCount = 10;

  for (let i = 0; i < studentCount; i++) {
    const student = await prisma.student.create({
      data: {
        name: faker.name.fullName(),
        attendance: faker.datatype.boolean(),
        performance: faker.lorem.sentence(),
        userId: users[faker.datatype.number({ min: 0, max: userCount - 1 })].id,
        courses: {
          connect: [
            {
              id: courses[faker.datatype.number({ min: 0, max: courseCount - 1 })].id,
            },
          ],
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
