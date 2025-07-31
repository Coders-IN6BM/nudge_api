import User from "../src/user/user.model.js";
import { hash } from "argon2";

export const crearAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: "ADMIN_ROLE" });

    if (adminExists) {
      console.log("Admin already exists. Skipping creation.");
      return;
    }

    const hashedPassword = await hash("ADMINB12"); 
    
    const adminUser = new User({
      name: "Admin",
      surname: "System",
      userName: "admin_system", 
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "ADMIN_ROLE", 
      phone: "12345778"
    });

    await adminUser.save();
    console.log("Default admin created successfully.");
    console.log("Admin credentials - Username: admin_system, Password: Admin123!@#");
  } catch (err) {
    console.error("Error creating default admin:", err);
  }
};