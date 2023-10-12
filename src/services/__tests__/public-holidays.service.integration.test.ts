import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from "../public-holidays.service";

describe("Services integration tests", () => {
  describe("getListOfPublicHolidays tests", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should trigger call and receive not empty data", async () => {
      const year = 2023;
      const country = "GB";
      const result = await getListOfPublicHolidays(year, country);
      expect(result.length).toBeTruthy();
    });

    it("shouldn't trigger call and throw an exception in case of wrong country", async () => {
      const year = 2023;
      const country = "BY";

      await expect(getListOfPublicHolidays(year, country)).rejects.toThrowError(
        `Country provided is not supported, received: ${country}`,
      );
    });

    it("shouldn't trigger call and throw an exception in case of wrong year", async () => {
      const year = 1;
      const country = "GB";

      await expect(getListOfPublicHolidays(year, country)).rejects.toThrowError(
        `Year provided not the current, received: ${year}`,
      );
    });
  });

  describe("checkIfTodayIsPublicHoliday tests", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("shouldn't trigger call and throw an exception in case of wrong country", async () => {
      const country = "BY";

      await expect(checkIfTodayIsPublicHoliday(country)).rejects.toThrowError(
        `Country provided is not supported, received: ${country}`,
      );
    });
  });

  describe("getNextPublicHolidays tests", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("shouldn't trigger call and throw an exception in case of wrong country", async () => {
      const country = "BY";

      await expect(getNextPublicHolidays(country)).rejects.toThrowError(
        `Country provided is not supported, received: ${country}`,
      );
    });

    it("should trigger call and return none empty data", async () => {
      const genderResponse = await getNextPublicHolidays("GB");
      expect(genderResponse.length).toBeTruthy();
    });
  });
});
