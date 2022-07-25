const TTL = 30;

export const cache = (url: string, data: any) => {
  localStorage.setItem(
    url,
    JSON.stringify({
      timestamp: Date.now(),
      data,
    })
  );
};

export const retrieve = (url: string): any => {
  const { timestamp, data } = JSON.parse(localStorage.getItem(url) || "{}");

  if (timestamp + TTL * 1000 > Date.now()) {
    return data;
  } else return "stale";
};
