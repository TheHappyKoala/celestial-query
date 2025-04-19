const fetchData = async <TResponse>(url: string): Promise<TResponse | null> => {
  const response = await fetch(url);

  switch (response.status) {
    case 200:
      return response.json();

    case 204:
      return null;

    default:
      throw new Error(
        `The response from ${url} was not ok! Status: ${response.status}`,
      );
  }
};

export { fetchData };
