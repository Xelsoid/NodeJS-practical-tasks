import { CartEntity } from "../schemas/cart.entity.js";

export const cart: CartEntity[] = [
  {
    id: "1434fec6-cd85-420d-95c0-eee2301a971d",
    userId: "0fe36d16-49bc-4aab-a227-f84df899a6cb",
    isDeleted: false,
    items: [
      {
        product: {
          id: "51422fcd-0366-4186-ad5b-c23059b6f64f",
          title: "Book",
          description: "A very interesting book",
          price: 100,
        },
        count: 2,
      },
    ],
  },
];
