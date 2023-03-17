import dayjs from "dayjs";

export const dbNow = (): Date => dayjs().add(9, "hour").toDate();
