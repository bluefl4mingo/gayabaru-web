import qs from 'qs';

/**
 * @param {string} path - Path endpoint (misal: "/api/posts").
 * @returns {string} URL lengkap.
 */
export function getStrapiURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }${path}`;
}

/**
 * @param {string} path - Path endpoint yang ingin di-fetch.
 * @param {object} urlParamsObject - Parameter query untuk URL.
 * @param {object} options - Opsi tambahan untuk fetch, termasuk revalidate dari Next.js.
 * @returns {Promise<any>} Data JSON dari response.
 */
export async function fetchAPI(path: string, urlParamsObject = {}, options = {}) {
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  const queryString = qs.stringify(urlParamsObject);

  const requestUrl = `${getStrapiURL(
    `${path}${queryString ? `?${queryString}` : ""}`
  )}`;

  const response = await fetch(requestUrl, mergedOptions);

  if (!response.ok) {
    console.error("API Response Error:", await response.text());
    console.error("Request URL:", requestUrl);
    throw new Error(`An error occurred please try again`);
  }

  const data = await response.json();
  return data;
}
