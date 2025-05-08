import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,

  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
 
  reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,
  cloud_name:process.env.CLOUD_NAME,
 cloudinary_api_key:process.env.CLOUDINARY_API_KEY,
 cloudinary_api_secret:process.env.CLOUDINARY_API_SECRET,

send_email:process.env.SEND_EMAIL

};
