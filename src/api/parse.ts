import axios from "axios";

const CLOUD_FUNCTION_URL = "https://us-central1-spendwise-6027f.cloudfunctions.net/parseFinancials"; // TODO: replace with your real URL

export async function parseFinancials(data: string, format: 'csv' | 'json'): Promise<any[]> {
  const resp = await axios.post(CLOUD_FUNCTION_URL, { data, format });
  return resp.data.transactions;
}
