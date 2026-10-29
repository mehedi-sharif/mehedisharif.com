import type { Db } from "mongodb";
export const dhakaDate = () =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
export async function counter(db: Db) {
  const date = dhakaDate();
  const collection = db.collection<{
    _id: string;
    date: string;
    count: number;
  }>("dailyAPICount");
  const id = `verification:${date}`;
  if (!(await collection.findOne({ _id: id }))) {
    const legacy = await db.collection("dailyAPICount").findOne({ date });
    try {
      await collection.insertOne({ _id: id, date, count: legacy?.count || 0 });
    } catch (error) {
      if ((error as { code?: number }).code !== 11000) throw error;
    }
  }
  return { collection, id };
}
