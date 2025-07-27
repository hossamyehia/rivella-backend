import { globalError } from "../utils/middleware/globalError.js";
import AppError from "../utils/services/AppError.js";
import AdminRouter from "./admin/admin.routes.js";

export function init(app) {
    let Base = `api/v1/rivella`;

    app.use(`${Base}/admin`, AdminRouter);

    app.all("*", (req, res, next) => {
        next(new AppError(`Invalid Url: ${req.originalUrl}`, 404));
    });

    app.use(globalError);
}







    
    