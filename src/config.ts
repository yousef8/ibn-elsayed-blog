export const SITE = {
  website: "https://blog.ibnelsayed.com/",
  author: "يوسف السيد",
  profile: "https://github.com/yousef8",
  ogImage: "",
  lightAndDarkMode: true,
  postPerIndex: 6,
  postPerPage: 6,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: false,
  showBackButton: false,
  editPost: {
    enabled: true,
    url: "https://github.com/yousef8/my-blog/edit/master/",
  },
  dynamicOgImage: true,
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Africa/Cairo", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
