export const order = [
  {
    id: "6c36d6fa-f694-4f9c-9b2c-6f7049d38f4a",
    userId: "0fe36d16-49bc-4aab-a227-f84df899a6cb",
    cartId: "cadff0c5-0079-4db8-b6bf-84c9c2633ca3",
    items: [
      {
        product: {
          id: "5c293ad0-19d0-41ee-baa3-4c648f9f7697",
          title: "Book",
          description: "Interesting book",
          price: 200,
        },
        count: 2,
      },
      {
        product: {
          id: "afdd68c4-d359-45e6-b9fd-c8fdb2a162a0",
          title: "Pen",
          description: "Cute pen",
          price: 20,
        },
        count: 5,
      },
    ],
    payment: {
      type: "paypal",
      address: "London",
      creditCard: "1234-1234-1234-1234",
    },
    delivery: {
      type: "post",
      address: "London",
    },
    comments: "",
    status: "created",
    total: 500,
  },
];
