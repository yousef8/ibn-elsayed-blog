const LANGUAGE_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Go: "#00ADD8",
  Rust: "#dea584",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  Scala: "#c22d40",
  Shell: "#89e051",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Vue: "#41b883",
  React: "#61dafb",
  Svelte: "#ff3e00",
  Astro: "#ff5a03",
};

async function loadGitHubCard(card) {
  const repo = card.getAttribute("data-repo");

  if (!repo || repo === "N/A") {
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}`);
    }

    const data = await response.json();

    const avatarEl = card.querySelector(".github-card-avatar");
    if (avatarEl && data.owner && data.owner.avatar_url) {
      avatarEl.src = `${data.owner.avatar_url}&size=40`;
    }

    const descriptionEl = card.querySelector(".github-card-description");
    if (descriptionEl) {
      descriptionEl.textContent =
        data.description || "No description provided.";
    }

    const starsEl = card.querySelector(".stars-count");
    if (starsEl) {
      starsEl.textContent = formatNumber(data.stargazers_count || 0);
    }

    const forksEl = card.querySelector(".forks-count");
    if (forksEl) {
      forksEl.textContent = formatNumber(data.forks_count || 0);
    }

    if (data.language) {
      const languageEl = card.querySelector(".github-card-language");
      const languageNameEl = card.querySelector(".language-name");
      const languageColorEl = card.querySelector(".language-color");

      if (languageEl && languageNameEl && languageColorEl) {
        languageEl.style.display = "flex";
        languageNameEl.textContent = data.language;

        const color = LANGUAGE_COLORS[data.language] || "#ccc";
        languageColorEl.style.background = color;
      }
    }

    if (data.license && data.license.spdx_id !== "NOASSERTION") {
      const licenseEl = card.querySelector(".github-card-license");
      const licenseNameEl = card.querySelector(".license-name");

      if (licenseEl && licenseNameEl) {
        licenseEl.style.display = "flex";
        licenseNameEl.textContent = data.license.spdx_id || data.license.name;
      }
    }
  } catch {
    const descriptionEl = card.querySelector(".github-card-description");
    if (descriptionEl) {
      descriptionEl.textContent = "Unable to load repository information.";
      descriptionEl.style.opacity = "0.7";
    }
  }
}

function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

function initGitHubCards() {
  const cards = document.querySelectorAll(".github-card");

  cards.forEach(card => {
    loadGitHubCard(card);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGitHubCards);
} else {
  initGitHubCards();
}
