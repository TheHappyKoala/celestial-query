const fetchData = async <TResponse>(url: string): Promise<TResponse | null> => {
  const response = await fetch(url);

  if (response.status === 200) {
    const data = await response.json();

    return data;
  } else if (response.status === 204) {
    return null;
  } else {
    throw new Error(
      `The response from ${url} was not ok! Status: ${response.status}`,
    );
  }
};

const constructQueryParamsString = (array: [string, string][]): string => {
  return array
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
};

export { fetchData, constructQueryParamsString };
