import { h } from "hastscript";

/**
 * Creates a GitHub repository card element using hastscript
 * @param props - Component properties containing the repository information
 * @returns A hastscript element representing the GitHub card
 */
export function GithubCard(props: { repo?: string }) {
  const repo = props.repo || "N/A";
  const repoUrl = `https://github.com/${repo}`;
  const [owner] = repo.split("/");

  return h(
    "a.github-card",
    {
      href: repoUrl,
      target: "_blank",
      rel: "noopener noreferrer",
      "data-repo": repo,
      style: `
        display: block;
        text-decoration: none;
        background-color: var(--color-muted);
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23888888' opacity='0.08'%3E%3Cpath d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'/%3E%3C/svg%3E");
        background-position: right -20px center;
        background-repeat: no-repeat;
        background-size: 180px 180px;
        border: 2px solid var(--color-border);
        border-radius: 12px;
        padding: 16px;
        margin: 24px 0;
        transition: all 0.3s ease;
        color: var(--color-foreground);
        position: relative;
        overflow: hidden;
        direction: ltr;
        text-align: left;
      `
        .replace(/\s+/g, " ")
        .trim(),
      onmouseover:
        "this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(255, 90, 3, 0.1)'",
      onmouseout:
        "this.style.transform='translateY(0)'; this.style.boxShadow='none'",
    },
    [
      // Header with avatar and repo name
      h(
        "div.github-card-header",
        {
          style: `
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 8px;
          `
            .replace(/\s+/g, " ")
            .trim(),
        },
        [
          // Owner avatar
          h("img.github-card-avatar", {
            src: `https://github.com/${owner}.png?size=40`,
            alt: `${owner} avatar`,
            width: "40",
            height: "40",
            style: `
              border-radius: 50%;
              flex-shrink: 0;
              border: 2px solid var(--color-border);
            `
              .replace(/\s+/g, " ")
              .trim(),
            loading: "lazy",
          }),
          // Repo icon and name
          h(
            "div.github-card-title",
            {
              style: `
                display: flex;
                align-items: center;
                gap: 8px;
                flex: 1;
                min-width: 0;
              `
                .replace(/\s+/g, " ")
                .trim(),
            },
            [
              h(
                "span.github-card-name",
                {
                  style: `
                    font-weight: 600;
                    font-size: 16px;
                    color: var(--color-heading);
                    word-break: break-word;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  `
                    .replace(/\s+/g, " ")
                    .trim(),
                },
                repo
              ),
            ]
          ),
        ]
      ),
      // Description placeholder
      h(
        "p.github-card-description",
        {
          style: `
            margin: 4px 0 0 0;
            font-size: 14px;
            color: var(--color-foreground);
            line-height: 1.5;
            opacity: 0.8;
          `
            .replace(/\s+/g, " ")
            .trim(),
        },
        "Loading repository information..."
      ),
      // Stats container
      h(
        "div.github-card-stats",
        {
          style: `
            display: flex;
            align-items: center;
            gap: 16px;
            margin-top: 8px;
            flex-wrap: wrap;
            font-size: 13px;
            color: var(--color-foreground);
          `
            .replace(/\s+/g, " ")
            .trim(),
        },
        [
          // Language
          h(
            "span.github-card-language",
            {
              style: `
                display: none;
                align-items: center;
                gap: 6px;
              `
                .replace(/\s+/g, " ")
                .trim(),
            },
            [
              h("span.language-color", {
                style: `
                  width: 12px;
                  height: 12px;
                  border-radius: 50%;
                  background: #ccc;
                `
                  .replace(/\s+/g, " ")
                  .trim(),
              }),
              h("span.language-name", ""),
            ]
          ),
          // Stars
          h(
            "span.github-card-stars",
            {
              style: `
                display: flex;
                align-items: center;
                gap: 4px;
              `
                .replace(/\s+/g, " ")
                .trim(),
            },
            [
              h(
                "svg",
                {
                  width: "16",
                  height: "16",
                  viewBox: "0 0 16 16",
                  fill: "currentColor",
                  style: "opacity: 0.8;",
                },
                h("path", {
                  d: "M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z",
                })
              ),
              h("span.stars-count", "0"),
            ]
          ),
          // Forks
          h(
            "span.github-card-forks",
            {
              style: `
                display: flex;
                align-items: center;
                gap: 4px;
              `
                .replace(/\s+/g, " ")
                .trim(),
            },
            [
              h(
                "svg",
                {
                  width: "16",
                  height: "16",
                  viewBox: "0 0 16 16",
                  fill: "currentColor",
                  style: "opacity: 0.8;",
                },
                h("path", {
                  d: "M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z",
                })
              ),
              h("span.forks-count", "0"),
            ]
          ),
          // License
          h(
            "span.github-card-license",
            {
              style: `
                display: none;
                align-items: center;
                gap: 4px;
              `
                .replace(/\s+/g, " ")
                .trim(),
            },
            [
              h(
                "svg",
                {
                  width: "16",
                  height: "16",
                  viewBox: "0 0 16 16",
                  fill: "currentColor",
                  style: "opacity: 0.8;",
                },
                h("path", {
                  d: "M8.75.75V2h.985c.304 0 .603.08.867.231l1.29.736c.038.022.08.033.124.033h2.234a.75.75 0 010 1.5h-.427l2.111 4.692a.75.75 0 01-.154.838l-.53-.53.529.531-.001.002-.002.002-.006.006-.016.015-.045.04a3.514 3.514 0 01-.686.45A4.492 4.492 0 0113 10.75c-.77 0-1.474-.229-2.064-.602a.75.75 0 01-.347-.672V7.5h-.984V13h2.234a.75.75 0 010 1.5H4.25a.75.75 0 010-1.5h2.234V7.5h-.985v1.976a.75.75 0 01-.347.672A3.989 3.989 0 013 10.75c-.824 0-1.567-.234-2.098-.566a3.514 3.514 0 01-.686-.45l-.045-.04-.016-.015-.006-.006-.002-.002-.001-.002.529-.531-.53.53a.75.75 0 01-.154-.838L2.102 4.5H1.75a.75.75 0 010-1.5h2.234c.044 0 .086-.011.124-.033l1.29-.736A1.75 1.75 0 015.665 2H6.5V.75a.75.75 0 011.5 0zm2.5 8.5l.001 1.126c.453.293.994.5 1.573.5.502 0 .961-.155 1.328-.4l-1.903-4.226h-.999v3zm-9 0v-3h-.999L2.155 9.7c.367.245.826.4 1.328.4.579 0 1.12-.207 1.573-.5zM7.5 2h-1.835c-.166 0-.332.044-.479.127l-1.29.736a2.214 2.214 0 01-.244.125h4.848a2.214 2.214 0 01-.244-.125l-1.29-.736A.931.931 0 007.5 2zm1.5 0h1.835c.166 0 .332.044.479.127l1.29.736c.082.047.166.09.244.125H7.5a2.214 2.214 0 01.244-.125l1.29-.736A.931.931 0 019 2h1.5z",
                })
              ),
              h("span.license-name", ""),
            ]
          ),
        ]
      ),
    ]
  );
}
