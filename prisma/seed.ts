import bcryptjs from "bcryptjs";

import prisma from "../lib/prisma";

async function main() {
  // Check or create the admin role
  const adminRole = await prisma.role.upsert({
    where: { name: "admin" },
    update: {},
    create: { name: "admin" },
  });

  console.log(`Role ensured: ${adminRole.name}`);

  // Check if profile already exists (you can modify criteria if needed)
  let profile = await prisma.profile.findFirst({
    where: {
      firstName: "Admin",
      lastName: "User",
    },
  });

  if (!profile) {
    profile = await prisma.profile.create({
      data: {
        firstName: "Admin",
        middleName: "System",
        lastName: "User",
        birthDate: new Date("1990-01-01"),
        phoneNum: "1234567890",
        address: "123 Admin St, System City",
        image_url: "https://via.placeholder.com/150",
      },
    });
    console.log("Created admin profile");
  } else {
    console.log("Admin profile already exists");
  }

  // Hash password securely
  const hashedPassword = await bcryptjs.hash("admin123", 10);

  // Upsert the admin user
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {
      roleId: adminRole.id,
      profileId: profile.id,
    },
    create: {
      username: "admin",
      email: "admin@example.com",
      password: hashedPassword,
      roleId: adminRole.id,
      profileId: profile.id,
    },
  });

  console.log(`Admin user ensured: ${adminUser.email}`);
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
