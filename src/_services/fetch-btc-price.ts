import axios from "axios";
/**
 * fetchBtcPrice is an asynchronous function that fetches the current Bitcoin price
 * from the CoinGecko API.
 *
 * @param {string} url - The API endpoint to fetch data from.
 * @returns {Promise<{data?: any, error: boolean, message?: string}>} 
 * - Returns an object containing the data and an error flag. If there's an error,
 *   it includes an error message.
 */

 export const fetchBtcPrice = async (url:string): Promise<{ data?: any; error: boolean; message?: string; }> => {
    try {
      
      const response = await axios.get(
        "https://api.coingecko.com/api"+url
      );
      return {
        data:response.data,error:false
      }
     
    } catch (error:any) {
     return {error:true,message:error.message}
    }
  };