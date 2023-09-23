import {getListOfPublicHolidays, checkIfTodayIsPublicHoliday, getNextPublicHolidays} from "./public-holidays.service";
import holidaysMock from './mockResponse.json';
import holidaysFormatted from './mockFormattedResponse.json';
import axios from "axios";
import {shortenPublicHoliday, validateInput} from "../helpers";
import {PUBLIC_HOLIDAYS_API_URL} from "../config";

jest.mock('../helpers', () => ({
  validateInput: jest.fn(() => true),
  shortenPublicHoliday: jest.fn((data) => data)
}))

describe('Servises tests', () => {
  describe('getListOfPublicHolidays tests', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should trigger call with expected params', async () => {
      const year = 2023;
      const country = "GB";
      const axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(
          () => Promise.resolve({ data: holidaysMock })
      )
      const genderResponse = await getListOfPublicHolidays( year,  country);
      expect(axiosGetSpy).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${year}/${country}`)
    });

    it('should simulate call and return data', async () => {
      jest.spyOn(axios, 'get').mockImplementation(
          () => Promise.resolve({ data: holidaysMock })
      )
      const genderResponse = await getListOfPublicHolidays( 2023,  "GB");
      expect(genderResponse).toEqual(holidaysMock)
    });

    it('should simulate call and throw exception', async () => {
      jest.spyOn(axios, 'get').mockImplementation(
          () => Promise.reject(new Error('some error'))
      )
      const genderResponse = await getListOfPublicHolidays( 2023,  "GB");
      expect(genderResponse).toEqual([])
    });
  })

  describe('checkIfTodayIsPublicHoliday tests', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should trigger call with expected params', async () => {
      const country = "GB";
      const axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(
          () => Promise.resolve({ data: holidaysMock })
      )
      const genderResponse = await checkIfTodayIsPublicHoliday(country);
      expect(axiosGetSpy).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${country}`)
    });

    it('should simulate call and return 200 status', async () => {
      jest.spyOn(axios, 'get').mockImplementation(
          () => Promise.resolve({ status: 200 })
      )
      const genderResponse = await checkIfTodayIsPublicHoliday("GB");
      expect(genderResponse).toEqual(true)
    });

    it('should simulate call and return 400 status', async () => {
      jest.spyOn(axios, 'get').mockImplementation(
          () => Promise.resolve({ status: 400 })
      )
      const genderResponse = await checkIfTodayIsPublicHoliday("GB");
      expect(genderResponse).toEqual(false)
    });

    it('should simulate call and throw exception', async () => {
      jest.spyOn(axios, 'get').mockImplementation(
          () => Promise.reject(new Error('some error'))
      )
      const genderResponse = await checkIfTodayIsPublicHoliday("GB");
      expect(genderResponse).toEqual(false)
    });
  })

  describe('getNextPublicHolidays tests', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should trigger call with expected params', async () => {
      const country = "GB";
      const axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(
          () => Promise.resolve({ data: holidaysMock })
      )
      const genderResponse = await getNextPublicHolidays(country);
      expect(axiosGetSpy).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${country}`)
    });

    it('should simulate call and return data', async () => {
      jest.spyOn(axios, 'get').mockImplementation(
          () => Promise.resolve({ data: holidaysMock })
      )
      const genderResponse = await getNextPublicHolidays("GB");
      expect(genderResponse).toEqual(holidaysMock)
    });

    it('should simulate call and throw exception', async () => {
      jest.spyOn(axios, 'get').mockImplementation(
          () => Promise.reject(new Error('some error'))
      )
      const genderResponse = await getNextPublicHolidays(  "GB");
      expect(genderResponse).toEqual([])
    });
  })
});
