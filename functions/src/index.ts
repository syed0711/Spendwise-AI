import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { parse as parseCsv } from "csv-parse/sync";

export const parseFinancials = onRequest((req, res) => {
  try {
    const { data, format } = req.body as { data?: string; format?: "csv" | "json" };
    if (typeof data !== "string" || (format !== "csv" && format !== "json")) {
      res.status(400).json({ success: false, error: "Invalid request" });
      return;
    }

    let transactions: any[];

    if (format === "csv") {
      transactions = parseCsv(data, { columns: true, skip_empty_lines: true });
    } else {
      transactions = JSON.parse(data);
    }

    res.json({ success: true, transactions });
  } catch (err) {
    logger.error("parseFinancials failed", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});
