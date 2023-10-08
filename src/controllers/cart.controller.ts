import express, { Response, Request, NextFunction } from "express";
import bodyParser from "body-parser";
import {CART_ENDPOINTS, METHOD} from '../constants/index.js'
import { logger } from "../utils/index";
import { isUserExists } from "../servises/user.service"
import {
    returnCartTotal,
    updateUserCart,
    returnUserCartData
} from "../servises/cart.service";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);

const validateCartRequest = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.header('x-user-id');

    if(!userId) {
        res.status(403)
            .send({
                "data": null,
                "error": {
                    message: "You must be authorized user"
                }
            });
        return;
    }

    const isExistingUser = isUserExists(userId);
    if(!isExistingUser) {
        res.status(401)
            .send({
                "data": null,
                "error": {
                    message: "User is not authorized"
                }
            });
        return;
    }

    const isPUTMethod = req.method === METHOD.PUT;
    const productId = req.body?.productId;
    if(isPUTMethod && !productId) {
        res.status(400)
            .send({
                "data": null,
                "error": {
                    message: "Products are not valid"
                }
            });
        return;
    }

    const cart = returnUserCartData(userId)
    if(isPUTMethod && !cart) {
        // throw error?
        res.status(404)
            .send({
                "data": null,
                "error": {
                    message: "Cart was not found"
                }
            });
        return;
    }

    next();
}

app.get(CART_ENDPOINTS.PROFILE_CART, validateCartRequest, async (req: Request, res: Response, next: NextFunction) => {
    const userCart = returnUserCartData(req.header('x-user-id'));
    const cartTotal = returnCartTotal(userCart.items);

    if(!userCart || !cartTotal){
        throw(new Error("Internal Server error"));
    }

    res.status(200).send({
        "data": {
            "cart": userCart,
            "total": cartTotal
        },
        "error": null
    });
    return;
})

app.put(CART_ENDPOINTS.PROFILE_CART, validateCartRequest, async (req: Request, res: Response, next: NextFunction) => {
    const updatedCart = updateUserCart(req.header('x-user-id'), req.body);
    const cartTotal = returnCartTotal(updatedCart?.items);

    if(!updatedCart || !cartTotal){
        throw(new Error("Internal Server error"));
    }

    res.status(200).send({
        "data": {
            "cart": updatedCart,
            "total": cartTotal
        },
        "error": null
    });
    return;
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500);
    res.send({ message: err.message });
    return;
});

// app.post(CART_ENDPOINTS.PROFILE_CART,  logger, async (req: Request, res: Response) => {
//
// });

app.listen(3000, () => {
    console.log('Server is started');
})
