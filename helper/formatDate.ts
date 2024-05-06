export const formatDate = (dateTimeString: string) => {
  const dateTime = new Date(dateTimeString);

  // Get the individual components of the date
  const year = dateTime.getFullYear();
  const month = (dateTime.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so January is 0
  const date = dateTime.getDate().toString().padStart(2, "0");

  // Format the date
  const formattedDate = `${year}-${month}-${date}`;
  return formattedDate;
};
