/**
 * @param {string} path
 * @returns {string}
 */
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

export function getStrapiURL(path: string = ""): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // If it's a relative path, prepend the Strapi URL
  return `${STRAPI_URL}${path}`;
}

// Helper function to properly format Strapi query parameters
function formatStrapiParams(params: Record<string, any>): URLSearchParams {
  const searchParams = new URLSearchParams();

  function addParam(key: string, value: any, prefix = '') {
    const fullKey = prefix ? `${prefix}[${key}]` : key;

    if (value === null || value === undefined) {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        addParam(index.toString(), item, fullKey);
      });
    } else if (typeof value === 'object' && value !== null) {
      Object.entries(value).forEach(([nestedKey, nestedValue]) => {
        addParam(nestedKey, nestedValue, fullKey);
      });
    } else {
      searchParams.append(fullKey, String(value));
    }
  }

  Object.entries(params).forEach(([key, value]) => {
    addParam(key, value);
  });

  return searchParams;
}

export async function fetchAPI(
  path: string,
  params: Record<string, any> = {},
  options: RequestInit = {}
) {
  // Get the API token from environment variables
  const apiToken = process.env.STRAPI_API_TOKEN || process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  
  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...(apiToken && {
        Authorization: `Bearer ${apiToken}`,
      }),
    },
    // Aggressive caching for production
    next: { 
      revalidate: 3600,
      tags: [path.split('/')[2] || 'general']
    },
  };

  const mergedOptions: RequestInit = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  // Use the proper Strapi parameter formatting
  const queryParams = formatStrapiParams(params);
  const queryString = queryParams.toString();

  const url = `${getStrapiURL(path)}${queryString ? `?${queryString}` : ''}`;

  console.log('🔗 API Request URL:', url);

  try {
    const response = await fetch(url, mergedOptions);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error Response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('🚨 API fetch error:', error);
    throw error;
  }
}
