import path from "path"
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import dbConnection from "./database/connection.js";
import { globalError } from "./src/utils/middleware/globalError.js";
import AppError from "./src/utils/services/AppError.js";
import AdminRouter from "./src/modules/admin/admin.routes.js";
import CityRouter from "./src/modules/city/city.routes.js";
import villageRouter from "./src/modules/village/village.routes.js";
import ChaletRouter from "./src/modules/chalet/chalet.routes.js";
import bookingRequestRouter from "./src/modules/bookingRequest/bookingRequest.routes.js";
import reservationRouter from "./src/modules/reservation/reservation.routes.js";
import UserRouter from "./src/modules/user/user.routes.js";
import couponRouter from "./src/modules/coupon/coupon.routes.js";
import { isAdmin } from "./src/utils/middleware/auth.js";
import ContactRouter from "./src/modules/contact/contact.routes.js";
import WishlistRouter from "./src/modules/wishlist/wishlist.routes.js";
import featureRouter from "./src/modules/feature/feature.route.js";
import termsRouter from "./src/modules/terms/terms.route.js";
import lookupsRouter from "./src/modules/lookups/lookups.route.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
const baseUrl = process.env.BASE_URL

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(morgan("dev"));

dbConnection();

app.use(`/${baseUrl}/user`, UserRouter)
app.use(`/${baseUrl}/admin`, AdminRouter)
app.use(`/${baseUrl}/city`, CityRouter)
app.use(`/${baseUrl}/village`, villageRouter)
app.use(`/${baseUrl}/chalet`, ChaletRouter)
app.use(`/${baseUrl}/booking`, bookingRequestRouter)
app.use(`/${baseUrl}/reservation`, isAdmin, reservationRouter)
app.use(`/${baseUrl}/coupon`, couponRouter)
app.use(`/${baseUrl}/contact`, ContactRouter)
app.use(`/${baseUrl}/wishlist`, WishlistRouter)
app.use(`/${baseUrl}/feature`, featureRouter)
app.use(`/${baseUrl}/term`, termsRouter);
app.use(`/${baseUrl}/lookups`, lookupsRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});


app.use((req, res, next) => {
  next(new AppError(`Invalid Url: ${req.originalUrl}`, 404))
  // res.status(404).json({ message: `Invalid Url: ${req.originalUrl}` });
});

app.use(globalError);
