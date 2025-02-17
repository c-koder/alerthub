const Community = require("../api/models/community.model");

const communities = [
  {
    name: "Green Valley Neighborhood",
    description:
      "A friendly and peaceful neighborhood with plenty of green spaces.",
    code: "GVN123",
    avatar: "",
    isPublic: true,
    location: {
      city: "Springfield",
      district: "North District",
    },
    manager: "60b6f8d0d01f8f1a5f8b8c67",
    members: ["60b6f8d0d01f8f1a5f8b8c68", "60b6f8d0d01f8f1a5f8b8c69"],
    incidents: [],
  },
  {
    name: "Downtown Business Hub",
    description:
      "A community of local business owners working to revitalize downtown.",
    code: "DBH124",
    avatar: "",
    isPublic: false,
    location: {
      city: "Metropolis",
      district: "Central District",
    },
    manager: "60b6f8d0d01f8f1a5f8b8c71",
    members: ["60b6f8d0d01f8f1a5f8b8c72"],
    incidents: [],
  },
  {
    name: "Sunnydale Park Residents",
    description:
      "Residents of Sunnydale Park, a serene residential area with a great community vibe.",
    code: "SPR125",
    avatar: "",
    isPublic: true,
    location: {
      city: "Sunnydale",
      district: "West Side",
    },
    manager: "60b6f8d0d01f8f1a5f8b8c74",
    members: ["60b6f8d0d01f8f1a5f8b8c75", "60b6f8d0d01f8f1a5f8b8c76"],
    incidents: [],
  },
  {
    name: "Tech Innovators Collective",
    description:
      "A community for tech enthusiasts to collaborate and innovate.",
    code: "TIC126",
    avatar: "",
    isPublic: true,
    location: {
      city: "Techville",
      district: "Innovation District",
    },
    manager: "60b6f8d0d01f8f1a5f8b8c78",
    members: ["60b6f8d0d01f8f1a5f8b8c79"],
    incidents: [],
  },
  {
    name: "Mountain Explorers",
    description:
      "A community of hikers and outdoor enthusiasts who explore the mountains together.",
    code: "MEA127",
    avatar: "",
    isPublic: true,
    location: {
      city: "Rivertown",
      district: "Mountain District",
    },
    manager: "60b6f8d0d01f8f1a5f8b8c81",
    members: ["60b6f8d0d01f8f1a5f8b8c82"],
    incidents: [],
  },
  {
    name: "Urban Gardeners",
    description:
      "A group of people dedicated to growing sustainable urban gardens in the city.",
    code: "UG2A28",
    avatar: "",
    isPublic: true,
    location: {
      city: "Cityville",
      district: "Green District",
    },
    manager: "60b6f8d0d01f8f1a5f8b8c84",
    members: ["60b6f8d0d01f8f1a5f8b8c85", "60b6f8d0d01f8f1a5f8b8c86"],
    incidents: [],
  },
  {
    name: "Coastal Cleanup Crew",
    description:
      "A group dedicated to cleaning up the local beaches and preserving marine life.",
    code: "CCC129",
    avatar: "",
    isPublic: true,
    location: {
      city: "Beachtown",
      district: "Coastal District",
    },
    manager: "60b6f8d0d01f8f1a5f8b8c88",
    members: ["60b6f8d0d01f8f1a5f8b8c89"],
    incidents: [],
  },
  {
    name: "Neighborhood Watch Program",
    description:
      "A local neighborhood watch program to ensure safety and security in the area.",
    code: "NWP130",
    avatar: "",
    isPublic: true,
    location: {
      city: "Hometown",
      district: "East District",
    },
    manager: "60b6f8d0d01f8f1a5f8b8c91",
    members: ["60b6f8d0d01f8f1a5f8b8c92"],
    incidents: [],
  },
];

// @desc This asynchronous function populates the database with predefined mockup data
const seedDatabase = async () => {
  try {
    for (const community of communities) {
      const existingCommunity = await Community.findOne({
        name: community.name,
        code: community.code,
      });

      if (!existingCommunity) {
        await Community.create(community);
        console.log(`SEEDING: Inserted ${community.name} into the database.`);
      }
    }

    console.log("Database seeding completed.");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

module.exports = seedDatabase;
