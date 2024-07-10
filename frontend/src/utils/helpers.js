export function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);

  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  return `${hours}:${minutes} ${month} ${day}, ${year}`;
}
