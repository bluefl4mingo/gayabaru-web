/**
 * @param {string} path
 * @returns {string}
 */
export function getStrapiURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }${path}`;
}

/**
 * @param {string} path
 * @param {object} urlParamsObject
 * @param {object} options
 * @returns {Promise<any>}
 */
export async function fetchAPI(path: string, urlParamsObject = {}, options = {}) {
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  const queryString = new URLSearchParams(urlParamsObject).toString();
  const requestUrl = `${getStrapiURL(
    `${path}${queryString ? `?${queryString}` : ""}`
  )}`;

  const response = await fetch(requestUrl, mergedOptions);

  if (!response.ok) {
    console.error(response.statusText);
    throw new Error(`An error occurred please try again`);
  }

  const data = await response.json();
  return data;
}
