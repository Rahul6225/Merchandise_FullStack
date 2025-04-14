import moment from "moment";

export const getLastMonths = () => {
  const currentdate = moment();

  currentdate.date(1);

  const last6Months: string[] = [];
  const last12Months: string[] = [];

  for (let i = 0; i < 6; i++) {
    const monthdate = currentdate.clone().subtract(i, "months");
    const monthName = monthdate.format("MMMM");

    last6Months.unshift(monthName);
  }

  for (let i = 0; i < 12; i++) {
    const monthdate = currentdate.clone().subtract(i, "months");
    const monthName = monthdate.format("MMMM");

    last12Months.unshift(monthName);
  }

  return {
    last12Months,
    last6Months,
  };
};
