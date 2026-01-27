import { h } from "hastscript";
import type { OpenGraphData } from "../../utils/fetchOpenGraph";

interface WebsiteCardProps {
  url?: string;
  ogData?: string;
}

export function WebsiteCard(props: WebsiteCardProps) {
  let data: OpenGraphData;

  if (props.ogData) {
    try {
      data = JSON.parse(props.ogData) as OpenGraphData;
    } catch {
      const url = props.url || "";
      data = {
        url,
        domain: getDomainFromUrl(url),
        title: null,
        description: null,
        image: null,
        favicon: `https://www.google.com/s2/favicons?domain=${getDomainFromUrl(url)}&sz=64`,
      };
    }
  } else {
    const url = props.url || "";
    data = {
      url,
      domain: getDomainFromUrl(url),
      title: null,
      description: null,
      image: null,
      favicon: `https://www.google.com/s2/favicons?domain=${getDomainFromUrl(url)}&sz=64`,
    };
  }

  const { url, domain, title, description, image, favicon } = data;
  const displayTitle = title || domain;
  const hasImage = !!image;

  const contentChildren = [
    h(
      "span.website-card-title",
      {
        style: `
          font-weight: 600;
          font-size: 16px;
          color: var(--color-heading);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.4;
        `
          .replace(/\s+/g, " ")
          .trim(),
      },
      displayTitle
    ),
  ];

  if (description) {
    contentChildren.push(
      h(
        "span.website-card-description",
        {
          style: `
            font-size: 14px;
            color: var(--color-foreground);
            opacity: 0.8;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            line-height: 1.5;
            margin-top: 4px;
          `
            .replace(/\s+/g, " ")
            .trim(),
        },
        description
      )
    );
  }

  contentChildren.push(
    h(
      "span.website-card-url",
      {
        style: `
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 6px;
          margin-top: auto;
          padding-top: 8px;
          font-size: 13px;
          color: var(--color-foreground);
          opacity: 0.7;
          width: 100%;
        `
          .replace(/\s+/g, " ")
          .trim(),
      },
      [
        h(
          "span.website-card-favicon-wrapper",
          {
            style: `
              display: flex;
              align-items: center;
              justify-content: center;
              width: 16px;
              height: 16px;
              flex-shrink: 0;
            `
              .replace(/\s+/g, " ")
              .trim(),
          },
          [
            favicon
              ? h("img.website-card-favicon", {
                  src: favicon,
                  alt: "",
                  "aria-hidden": "true",
                  width: "16",
                  height: "16",
                  style: `
                    width: 16px;
                    height: 16px;
                    border-radius: 2px;
                    object-fit: contain;
                  `
                    .replace(/\s+/g, " ")
                    .trim(),
                  loading: "lazy",
                  onerror:
                    "this.style.display='none'; this.nextElementSibling.style.display='flex';",
                })
              : null,
            h(
              "span.website-card-favicon-fallback",
              {
                "aria-hidden": "true",
                style: `
                  display: ${favicon ? "none" : "flex"};
                  align-items: center;
                  justify-content: center;
                  width: 16px;
                  height: 16px;
                  background: var(--color-border);
                  border-radius: 2px;
                `
                  .replace(/\s+/g, " ")
                  .trim(),
              },
              [
                h(
                  "svg",
                  {
                    width: "10",
                    height: "10",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                  },
                  [
                    h("circle", { cx: "12", cy: "12", r: "10" }),
                    h("line", { x1: "2", y1: "12", x2: "22", y2: "12" }),
                    h("path", {
                      d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
                    }),
                  ]
                ),
              ]
            ),
          ].filter(Boolean)
        ),
        h(
          "span.website-card-domain",
          {
            style: `
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            `
              .replace(/\s+/g, " ")
              .trim(),
          },
          domain
        ),
      ]
    )
  );

  const cardChildren = [
    h(
      "span.website-card-content",
      {
        style: `
          display: flex;
          flex-direction: column;
          flex: 1;
          min-width: 0;
          padding: 16px;
          ${hasImage ? "padding-right: 12px;" : ""}
        `
          .replace(/\s+/g, " ")
          .trim(),
      },
      contentChildren
    ),
  ];

  if (hasImage) {
    cardChildren.push(
      h(
        "span.website-card-image-container",
        {
          style: `
            flex-shrink: 0;
            width: 180px;
            position: relative;
            overflow: hidden;
          `
            .replace(/\s+/g, " ")
            .trim(),
        },
        [
          h("img.website-card-image", {
            src: image,
            alt: "",
            "aria-hidden": "true",
            style: `
              position: absolute;
              inset: 0;
              width: 100%;
              height: 100%;
              object-fit: cover;
            `
              .replace(/\s+/g, " ")
              .trim(),
            loading: "lazy",
            onerror: "this.parentElement.style.display='none';",
          }),
        ]
      )
    );
  }

  return h(
    "a.website-card",
    {
      href: url,
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": `Visit ${displayTitle} - Opens in a new tab`,
      role: "article",
      style: `
        display: flex;
        align-items: stretch;
        text-decoration: none;
        background-color: var(--color-muted);
        border: 2px solid var(--color-border);
        border-radius: 12px;
        margin: 24px 0;
        transition: all 0.3s ease;
        color: var(--color-foreground);
        overflow: hidden;
        direction: ltr;
        text-align: left;
        min-height: 120px;
      `
        .replace(/\s+/g, " ")
        .trim(),
      onmouseover:
        "this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(0, 0, 0, 0.1)'; this.style.borderColor='var(--color-accent)';",
      onmouseout:
        "this.style.transform='translateY(0)'; this.style.boxShadow='none'; this.style.borderColor='var(--color-border)';",
      onfocus:
        "this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(0, 0, 0, 0.1)'; this.style.borderColor='var(--color-accent)';",
      onblur:
        "this.style.transform='translateY(0)'; this.style.boxShadow='none'; this.style.borderColor='var(--color-border)';",
    },
    cardChildren
  );
}

function getDomainFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    return url;
  }
}
