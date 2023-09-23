import { validateInput, shortenPublicHoliday } from "./helpers";
import holidayMocks from "./mock.json";

describe("Helpers tests", () => {
  describe("validateInput helper tests", () => {
    it.each([
      { year: 2023, country: "GB", expected: true },
      { year: 2023, country: "FR", expected: true },
      { year: 2023, country: "DE", expected: true },
      { year: 2023, country: "NL", expected: true },
      { year: NaN, country: "NL", expected: false },
      { year: 2023, country: "", expected: false },
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
    holidayMocks.forEach((holiday, index) => {
      it(`should shorten public holiday object for "${holiday.mockedData.name}", test index: ${index}`, () => {
        const result = shortenPublicHoliday(holiday.mockedData);
        expect(result).toEqual(holiday.mockedResponse);
      });
    });
  });
});
