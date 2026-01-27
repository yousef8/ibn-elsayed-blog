export interface OpenGraphData {
  url: string;
  domain: string;
  title: string | null;
  description: string | null;
  image: string | null;
  favicon: string | null;
}

function getDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    return url;
  }
}

function getFaviconUrl(url: string): string {
  const domain = getDomain(url);
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
}

function resolveUrl(base: string, relative: string | null): string | null {
  if (!relative) return null;

  try {
    if (relative.startsWith("http://") || relative.startsWith("https://")) {
      return relative;
    }

    if (relative.startsWith("//")) {
      return `https:${relative}`;
    }

    const baseUrl = new URL(base);
    return new URL(relative, baseUrl).href;
  } catch {
    return null;
  }
}

function parseOpenGraphFromHtml(html: string, url: string): OpenGraphData {
  const domain = getDomain(url);

  const getMetaContent = (
    nameOrProperty: string,
    attribute: "name" | "property" = "property"
  ): string | null => {
    const patterns = [
      new RegExp(
        `<meta[^>]+${attribute}=["']${nameOrProperty}["'][^>]+content=["']([^"']+)["']`,
        "i"
      ),
      new RegExp(
        `<meta[^>]+content=["']([^"']+)["'][^>]+${attribute}=["']${nameOrProperty}["']`,
        "i"
      ),
    ];

    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  let title =
    getMetaContent("og:title") || getMetaContent("twitter:title", "name");

  if (!title) {
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    title = titleMatch ? titleMatch[1].trim() : null;
  }

  const description =
    getMetaContent("og:description") ||
    getMetaContent("twitter:description", "name") ||
    getMetaContent("description", "name");

  const rawImage =
    getMetaContent("og:image") || getMetaContent("twitter:image", "name");
  const image = resolveUrl(url, rawImage);

  let favicon: string | null = null;
  const faviconPatterns = [
    /<link[^>]+rel=["'](?:shortcut )?icon["'][^>]+href=["']([^"']+)["']/i,
    /<link[^>]+href=["']([^"']+)["'][^>]+rel=["'](?:shortcut )?icon["']/i,
    /<link[^>]+rel=["']apple-touch-icon["'][^>]+href=["']([^"']+)["']/i,
  ];

  for (const pattern of faviconPatterns) {
    const match = html.match(pattern);
    if (match) {
      favicon = resolveUrl(url, match[1]);
      break;
    }
  }

  if (!favicon) {
    favicon = getFaviconUrl(url);
  }

  return {
    url,
    domain,
    title: title ? decodeHtmlEntities(title) : null,
    description: description ? decodeHtmlEntities(description) : null,
    image,
    favicon,
  };
}

function decodeHtmlEntities(text: string): string {
  const entities: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&apos;": "'",
    "&nbsp;": " ",
  };

  return text.replace(
    /&(?:amp|lt|gt|quot|#39|apos|nbsp);/g,
    match => entities[match] || match
  );
}

export async function fetchOpenGraph(url: string): Promise<OpenGraphData> {
  const domain = getDomain(url);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; AstroBot/1.0; +https://astro.build)",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      // eslint-disable-next-line no-console
      console.warn(
        `[WebsiteCard] Failed to fetch ${url}: HTTP ${response.status}`
      );
      return {
        url,
        domain,
        title: null,
        description: null,
        image: null,
        favicon: getFaviconUrl(url),
      };
    }

    const html = await response.text();
    return parseOpenGraphFromHtml(html, url);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    // eslint-disable-next-line no-console
    console.warn(`[WebsiteCard] Error fetching ${url}: ${errorMessage}`);

    return {
      url,
      domain,
      title: null,
      description: null,
      image: null,
      favicon: getFaviconUrl(url),
    };
  }
}
