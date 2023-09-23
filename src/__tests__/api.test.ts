import request from "supertest";
import { PUBLIC_HOLIDAYS_API_URL } from "../config";

describe("Nager.Date API tests", () => {
  describe("/LongWeekend endpoint tests", () => {
    it("should trigger call and receive 200 status code and response data", async () => {
      const year = 2023;
      const countryCode = "GB";

      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(
        `/LongWeekend/${year}/${countryCode}`,
      );

      expect(status).toEqual(200);
      expect(body).toEqual(
        expect.arrayContaining([
          {
            dayCount: expect.any(Number),
            endDate: expect.any(String),
            needBridgeDay: expect.any(Boolean),
            startDate: expect.any(String),
          },
        ]),
      );
    });

    it("should trigger call and receive 404 status code in case of county code is not valid", async () => {
      const year = 2023;
      const countryCode = "QQ";

      const { status } = await request(PUBLIC_HOLIDAYS_API_URL).get(
        `/LongWeekend/${year}/${countryCode}`,
      );

      expect(status).toEqual(404);
    });

    it("should trigger call and receive 404 status code in case of year is not valid", async () => {
      const year = -1;
      const countryCode = "GB";

      const { status } = await request(PUBLIC_HOLIDAYS_API_URL).get(
        `/LongWeekend/${year}/${countryCode}`,
      );

      expect(status).toEqual(404);
    });
  });

  describe("/PublicHolidays endpoint tests", () => {
    it("should trigger call and receive 200 status code and response data", async () => {
      const year = 2023;
      const countryCode = "GB";

      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(
        `/PublicHolidays/${year}/${countryCode}`,
      );

      expect(status).toEqual(200);
      expect(body).toEqual(
        expect.arrayContaining([
          {
            counties: expect.arrayContaining([expect.any(String)]),
            countryCode: expect.any(String),
            date: expect.any(String),
            fixed: expect.any(Boolean),
            global: expect.any(Boolean),
            launchYear: expect.any(Object),
            localName: expect.any(String),
            name: expect.any(String),
            types: expect.arrayContaining([expect.any(String)]),
          },
        ]),
      );
    });

    it("should trigger call and receive 404 status code in case of county code is not valid", async () => {
      const year = 2023;
      const countryCode = "QQ";

      const { status } = await request(PUBLIC_HOLIDAYS_API_URL).get(
        `/PublicHolidays/${year}/${countryCode}`,
      );

      expect(status).toEqual(404);
    });

    it("should trigger call and receive 404 status code in case of year is not valid", async () => {
      const year = -1;
      const countryCode = "GB";

      const { status } = await request(PUBLIC_HOLIDAYS_API_URL).get(
        `/PublicHolidays/${year}/${countryCode}`,
      );

      expect(status).toEqual(400);
    });
  });
});
