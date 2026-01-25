---
title: "How I Made My Blog with Astro.js"
description: "My journey to creating a blog in Arabic"
pubDatetime: 2026-01-25T22:27:19.695Z
modDatetime: 2026-01-25T23:11:14.560Z
coverImage: /src/assets/covers/how_i_made_my_blog_with_astro.jpg
ogImage: /src/assets/covers/how_i_made_my_blog_with_astro.jpg
---

## 🧠 Why did I make the website?

For a while I’d been researching a specific topic in data structures, and I wanted to document what I reached in an Arabic article on [dev.to](http://dev.to) or [Hashnode](https://hashnode.com/), but unfortunately Arabic language support wasn’t available at all.

I tried looking for alternatives, and I didn’t find anything except one solution: building my own blog. I got really excited about the idea because I’ve wanted to do this for a long time—but I was being lazy. Now it felt like the perfect chance to build the project I’d been wanting to make for ages.

## 🧰 Choosing the right tools

I started researching how to build my blog, and which framework and language would fit the project. Thankfully, JavaScript (my main language—the one I specialize in and work with) was the most suitable, and there are tons of frameworks built with it that make creating blogs and similar sites much easier.

The most popular ones are [Jekyll](https://jekyllrb.com/), [Hugo](https://gohugo.io/), and [Astro](https://astro.build/). They all support [Static Site Generation (SSG)](https://developer.mozilla.org/en-US/docs/Glossary/SSG), meaning the site is built at production time and outputs a bunch of HTML/CSS pages that can be hosted easily—for free—through GitHub Pages or Netlify, without needing to rent a server or pay money.

Another advantage of these frameworks is that they support [Markdown](https://www.markdownguide.org/getting-started/)—so I can write whatever I want in a normal Markdown file, just like I would on [dev.to](http://dev.to) or Hashnode. They include a system that converts Markdown files into regular HTML. For the record, they don’t build that engine from scratch; they use existing solutions anyone can use, like [Goldmark](https://github.com/yuin/goldmark) or [Remark](https://github.com/remarkjs/remark).

I chose [Astro](https://astro.build/) because unlike Hugo and Jekyll—which are older in this space—Astro is very modern. And it’s not limited to static site generation; that’s just one of its features and use cases. In reality it’s closer to Next.js, but broader: you can use React, Vue, Angular, or Svelte to build the UI. They were the first to do this in this way, and they call it the [Islands Architecture](https://docs.astro.build/en/concepts/islands/). This gives much more room for customization and experimentation—which I really like. And just because it’s new doesn’t mean it’s obscure; on the contrary, it has a strong community, [excellent documentation](https://docs.astro.build/en/getting-started/), and a [theme store](https://astro.build/themes/1/). All of that encouraged me to use it.

I started my journey by browsing the theme store for a good theme to use as a solid base so I wouldn’t start from scratch. I ended up choosing [AstroPaper](https://astro.build/themes/details/astropaper/). It’s considered the most popular blogging theme on the store. Honestly there were other themes that looked nicer, but I chose this one because it was the most mature and actively maintained. Some of its benefits:

- Simple design
- SEO-friendly
- Supports [web accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- Uses [TypeScript](https://www.typescriptlang.org) (TS)
- Uses [Tailwind CSS](https://tailwindcss.com) for styling
- Supports [RSS feeds](https://aboutfeeds.com)
- Generates [Open Graph images](https://www.freecodecamp.org/news/what-is-open-graph-and-how-can-i-use-it-for-my-website/) (OG images)

## ⚔️ The real challenge

Unfortunately, the theme didn’t support Arabic in any way, and that was the real challenge for me. It meant I’d need to put in some solid effort to learn Astro.js and figure out how to make it support Arabic. After some research, I found I needed to do the following:

- Add translation/localization to the theme itself by using [i18n routing](https://docs.astro.build/en/guides/internationalization/)
- Use CSS styles that are writing-direction aware
  - A simple example:

  ```css
  text-align: left;  // ❌ always left, whether Arabic or English
  text-align: start; // ✅ left in English, right in Arabic
  ```

  - Another common example (padding):

  ```css
  padding-left: 16px; /* ❌ fixed */
  padding-inline-start: 16px; /* ✅ changes based on language direction */
  ```

  - And Tailwind supports direction-aware utilities starting from version 3.3

Thankfully, I made all the changes above. They were pretty big, and they exhausted me until I finally finished them. I felt it would be a shame to keep them to myself, so I wanted to publish them so anyone after me wouldn’t have to reinvent the wheel. So I published my AstroPaper theme with i18n support on the [theme store](https://astro.build/themes/details/astropaper-i18n/). And الحمد لله, it has reached **37 stars** so far on GitHub.

::github{repo="yousef8/astro-paper-i18n"}

After that, I made a new repository based on my theme for my personal blog—the one you’re reading this article on right now.

## 🏁 In the end

This project was a great opportunity to learn about GitHub Actions and CI/CD. I was able to create a GitHub Actions workflow to verify linting and formatting, ensure all code tests pass, and if everything is good, publish the new changes.

I learned about the new package manager `pnpm` because it’s very popular in the Astro community—and it really was fast and excellent.

I learned how to manage an open-source project: how to write and automate changelogs and manage the project’s releases.

In the end, it was a really great project, and I genuinely learned a lot from it.
