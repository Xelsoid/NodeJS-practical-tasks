import { validateInput, shortenPublicHoliday } from "../helpers";
import holidayMocks from "../__mocks__/mock.json";

describe("Helpers tests", () => {
  describe("validateInput helper tests", () => {
    it.each([
      { year: 2023, country: "GB", expected: true },
      { year: 2023, country: "FR", expected: true },
      { year: 2023, country: "DE", expected: true },
      { year: 2023, country: "NL", expected: true },
    ])(
      "should validate user input year: $year and country: $country",
      ({ year, country, expected }) => {
        const result = validateInput({ year, country });
        expect(result).toEqual(expected);
      },
    );

    it.each([{ year: 2024 }, { year: 1 }, { year: 20233 }, { year: -102 }])(
      "should throw error in case not valid year: $year passed",
      ({ year }) => {
        expect(() => validateInput({ year, country: "GB" })).toThrow(
          new Error(`Year provided not the current, received: ${year}`),
        );
      },
    );

    it.each([
      { country: "BY" },
      { country: "UZ" },
      { country: "GR" },
      { country: "SR" },
    ])(
      "should throw error in case not valid country: $country passed",
      ({ country }) => {
        expect(() => validateInput({ year: 2023, country })).toThrow(
          new Error(`Country provided is not supported, received: ${country}`),
        );
      },
    );
  });

  describe("shortenPublicHoliday helper tests", () => {
    it("should shorten public holiday object for 'independence day'", () => {
      const result = shortenPublicHoliday(holidayMocks[0].mockedData);
      expect(result).toEqual(holidayMocks[0].mockedResponse);
    });
    it("should shorten public holiday object for 'x-mas'", () => {
      const result = shortenPublicHoliday(holidayMocks[1].mockedData);
      expect(result).toEqual(holidayMocks[1].mockedResponse);
    });
    it("should shorten public holiday object for 'new year'", () => {
      const result = shortenPublicHoliday(holidayMocks[2].mockedData);
      expect(result).toEqual(holidayMocks[2].mockedResponse);
    });
  });
});
