require("dotenv").config();
const mongoose = require("mongoose");
const { Product, BRANDS, TYPES } = require("../models/Product");

const MONGO_URI = process.env.MONGO_URI;

const seedProducts = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected for seeding");

    await Product.deleteMany();
    console.log("Existing products cleared");

    const products = [
      // ==================== APPLE (6) ====================
      {
        name: "Apple iPhone",
        brand: "Apple",
        type: "Phone",
        price: 999,
        imageUrl:
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        description: "Apple iPhone smartphone.",
      },
      {
        name: "Apple iPhone Pro",
        brand: "Apple",
        type: "Phone",
        price: 1199,
        imageUrl:
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        description: "Apple iPhone Pro model.",
      },

      {
        name: "Apple MacBook",
        brand: "Apple",
        type: "Laptop",
        price: 1299,
        imageUrl:
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
        description: "Apple MacBook laptop.",
      },
      {
        name: "Apple MacBook Air",
        brand: "Apple",
        type: "Laptop",
        price: 999,
        imageUrl:
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
        description: "Apple MacBook Air laptop.",
      },

      {
        name: "Apple AirPods",
        brand: "Apple",
        type: "Accessory",
        price: 199,
        imageUrl:
          "https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/24043258/concave.jpg?crop=0%2C0%2C100%2C100&quality=90&strip=all",
        description: "Apple AirPods earbuds.",
      },
      {
        name: "Apple AirPods",
        brand: "Apple",
        type: "Accessory",
        price: 99,
        imageUrl:
          "https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/24043258/concave.jpg?crop=0%2C0%2C100%2C100&quality=90&strip=all3",
        description: "Apple AirPods earbuds.",
      },

      // ==================== SAMSUNG (6) ====================
      {
        name: "Samsung Galaxy Phone",
        brand: "Samsung",
        type: "Phone",
        price: 899,
        imageUrl:
          "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
        description: "Samsung Galaxy smartphone.",
      },
      {
        name: "Samsung Galaxy Ultra",
        brand: "Samsung",
        type: "Phone",
        price: 1199,
        imageUrl:
          "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
        description: "Samsung Galaxy Ultra smartphone.",
      },

      {
        name: "Samsung Galaxy Book",
        brand: "Samsung",
        type: "Laptop",
        price: 1399,
        imageUrl:
          "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9",
        description: "Samsung Galaxy Book laptop.",
      },
      {
        name: "Samsung Galaxy Book Lite",
        brand: "Samsung",
        type: "Laptop",
        price: 1199,
        imageUrl:
          "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9",
        description: "Samsung Galaxy Book Lite laptop.",
      },

      {
        name: "Samsung Earbuds",
        brand: "Samsung",
        type: "Accessory",
        price: 179,
        imageUrl:
          "https://images.unsplash.com/photo-1601524909162-ae8725290836",
        description: "Samsung wireless earbuds.",
      },
      {
        name: "Samsung Earbuds Pro",
        brand: "Samsung",
        type: "Accessory",
        price: 229,
        imageUrl:
          "https://images.unsplash.com/photo-1601524909162-ae8725290836",
        description: "Samsung earbuds Pro version.",
      },

      // ==================== SONY (6) ====================
      {
        name: "Sony Xperia Phone",
        brand: "Sony",
        type: "Phone",
        price: 1099,
        imageUrl: "https://images.unsplash.com/photo-1542751110-97427bbecf20",
        description: "Sony Xperia smartphone.",
      },
      {
        name: "Sony Xperia Pro",
        brand: "Sony",
        type: "Phone",
        price: 1299,
        imageUrl: "https://images.unsplash.com/photo-1542751110-97427bbecf20",
        description: "Sony Xperia Pro smartphone.",
      },

      {
        name: "Sony VAIO Laptop",
        brand: "Sony",
        type: "Laptop",
        price: 1299,
        imageUrl:
          "https://images.unsplash.com/photo-1587614382346-4ec70e388b28",
        description: "Sony VAIO laptop.",
      },
      {
        name: "Sony VAIO Slim",
        brand: "Sony",
        type: "Laptop",
        price: 1199,
        imageUrl:
          "https://images.unsplash.com/photo-1587614382346-4ec70e388b28",
        description: "Sony VAIO slim laptop.",
      },

      {
        name: "Sony Headphones",
        brand: "Sony",
        type: "Accessory",
        price: 349,
        imageUrl:
          "https://images.unsplash.com/photo-1583394838336-acd977736f90",
        description: "Sony noise cancelling headphones.",
      },
      {
        name: "Sony Headphones Lite",
        brand: "Sony",
        type: "Accessory",
        price: 249,
        imageUrl:
          "https://images.unsplash.com/photo-1583394838336-acd977736f90",
        description: "Sony headphones lite version.",
      },

      // ==================== DELL (6) ====================
      {
        name: "Dell XPS",
        brand: "Dell",
        type: "Laptop",
        price: 1299,
        imageUrl:
          "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04",
        description: "Dell XPS laptop.",
      },
      {
        name: "Dell XPS Plus",
        brand: "Dell",
        type: "Laptop",
        price: 1499,
        imageUrl:
          "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04",
        description: "Dell XPS Plus laptop.",
      },

      // Dell has no phone → reuse PHONE image from same type rule
      {
        name: "Dell Mobile Phone",
        brand: "Dell",
        type: "Phone",
        price: 799,
        imageUrl:
          "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
        description: "Dell branded smartphone.",
      },
      {
        name: "Dell Mobile Phone Pro",
        brand: "Dell",
        type: "Phone",
        price: 899,
        imageUrl:
          "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
        description: "Dell branded smartphone Pro.",
      },

      {
        name: "Dell Keyboard & Mouse",
        brand: "Dell",
        type: "Accessory",
        price: 199,
        imageUrl:
          "https://images.unsplash.com/photo-1615655406736-b37c4fabf923",
        description: "Dell keyboard and mouse combo.",
      },
      {
        name: "Dell Office Accessories",
        brand: "Dell",
        type: "Accessory",
        price: 149,
        imageUrl:
          "https://images.unsplash.com/photo-1615655406736-b37c4fabf923",
        description: "Dell office accessories.",
      },

      // ==================== HP (6) ====================
      {
        name: "HP Spectre",
        brand: "HP",
        type: "Laptop",
        price: 1499,
        imageUrl:
          "https://images.unsplash.com/photo-1602080858428-57174f9431cf",
        description: "HP Spectre laptop.",
      },
      {
        name: "HP Spectre Plus",
        brand: "HP",
        type: "Laptop",
        price: 1699,
        imageUrl:
          "https://images.unsplash.com/photo-1602080858428-57174f9431cf",
        description: "HP Spectre Plus laptop.",
      },

      // HP phone → reuse PHONE image
      {
        name: "HP Smartphone",
        brand: "HP",
        type: "Phone",
        price: 699,
        imageUrl:
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        description: "HP branded smartphone.",
      },
      {
        name: "HP Smartphone Pro",
        brand: "HP",
        type: "Phone",
        price: 799,
        imageUrl:
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        description: "HP smartphone Pro version.",
      },

      {
        name: "HP Laptop Accessories",
        brand: "HP",
        type: "Accessory",
        price: 99,
        imageUrl:
          "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9",
        description: "HP laptop accessories.",
      },
      {
        name: "HP Premium Accessories",
        brand: "HP",
        type: "Accessory",
        price: 149,
        imageUrl:
          "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9",
        description: "HP premium accessories.",
      },
    ];

    // Enum safety check
    products.forEach((p) => {
      if (!BRANDS.includes(p.brand) || !TYPES.includes(p.type)) {
        throw new Error(`Invalid enum in product: ${p.name}`);
      }
    });

    await Product.insertMany(products);
    console.log(`${products.length} products seeded successfully`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedProducts();
