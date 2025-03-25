# أستروبيبر مع دعم الترجمة

🌍 [Readme in English](README.md)

<div align='center'>

![AstroPaper I18n](/public/astro-paper-i18n.png)

</div>

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/yousef8/astro-paper-i18n/deploy.yml?branch=main)
![GitHub Release](https://img.shields.io/github/v/release/yousef8/astro-paper-i18n)
[![Netlify Status](https://api.netlify.com/api/v1/badges/3877e14a-0bdc-4e85-bcd4-542f93f860a3/deploy-status)](https://app.netlify.com/sites/astro-paper-i18n/deploys)

<div dir="rtl">

هذا المستودع متفرع من ثيمة [AstroPaper](https://github.com/satnaing/astro-paper) مع إضافة دعم للترجمة

تمت أضافة دعم الترجمة بواسطة [توجيه المسارات المترجمة](https://docs.astro.build/en/guides/internationalization/) المقدمة بشكل إفتراضى من [استرو](https://astro.build/)

بما أن لغتى الأم هي العربية فإن هذه الثيمة تدعم اللغات التى تكتب من اليمين لليسار , و هذا كان في عين الأعتبار منذ البداية

بإذن الله سيكون دائما هناك متزامن مع المستودع الأصلى ليقدم اخر التحديثات

سيتم المحافظة على الواجهة كما هى فى الثيمة الأصلية و لن يتم تقديم أى تعديل  على الواجهة ألا بقدر ما تستدعيه الحاجة

## جدول المحتويات

- [🔥 المميزات](#-المميزات)
  - [تحسينات واجهة المستخدم](#تحسينات-واجهة-المستخدم)
  - [دعم الترجمة بواسطة i18n](#دعم-الترجمة-بواسطة-i18n)
  - [🧪 الاختبارات](#-الاختبارات)
- [نتيجة تقييم لايت هاوس](#نتيجة-تقييم-لايت-هاوس)
- [التثبيت](#التثبيت)
- [📖 طريقة الأستخدام](#-طريقة-الأستخدام)
- [🛠️ الإعدادات](#%EF%B8%8F-الإعدادات)
  - [🔧 إعدادت الموقع](#-إعدادت-الموقع)
  - [🌐 إعدادات الترجمة](#-إعدادات-الترجمة)
- [🧞 الأوامر](#-الأوامر)
- [🚧 المشاكل المعروفة](#-المشاكل-المعروفة)

## 🔥 المميزات

يحتوي هذا المشروع على كل ميزات [AstroPaper](https://github.com/satnaing/astro-paper) الأصلية، بالإضافة إلى:

### تحسينات واجهة المستخدم

- [x]  **الواجهة جاهلة بالإتجاهات**
  - دعم كامل للغات المكتوبة من اليمين لليسار
  - واجهة المستخدم متسقة مهما كان إتجاه الكتابة من اليمين لليسار أو العكس

### دعم الترجمة بواسطة i18n

- [x] ترجمة واجهة المستخدم بالأرقام والتواريخ.
- [x] قائمة منسدلة لتغيير لغة الموقع.
- [x] ترجمات متعلقة بالوصول لمن يعانون من إعاقات بصرية أو سمعية.
- [x] دعم i18n باستخدام TypeScript.
- [x]  [خرائط موقع](https://docs.astro.build/en/guides/integrations-guide/sitemap/) مع دعم لل i18n
- [x] توليد صور[OG](https://www.freecodecamp.org/news/what-is-open-graph-and-how-can-i-use-it-for-my-website/) مترجمة
  - ملحوظة : [satori](https://www.npmjs.com/package/satori) لا تدعم اللغات ذات إتجاه من يمين لليسار. لذلك ستكون الصور بها بعض المشاكل فى هذه الحالة
- [x] [تلخيص الموقع](https://docs.astro.build/en/guides/rss/) مع دعم للترجمة
- [ ] 📋 **مخطط له**
  - [ ] ترجمة مسارات الموقع

### 🧪 الاختبارات

- [x] إختبار الوحدات بواسطة [ڤيتست](https://vitest.dev/)
- [x] إختبار وحدات الإعدادت و الدوال المساعدة الخاصة بالترجمة
- [ ] إختبار الوحدات فى ملف [src/utils](/src/utils)
- [ ] إختبار الوحدات فى ملف [src/config.ts](/src/config.ts)

## نتيجة تقييم لايت هاوس

اضغط لروئية التقرير كاملا

<p align="center">
  <a href="https://pagespeed.web.dev/analysis/https-yousef8-github-io-AstroPaperI18n-ar/d2cqwqovpv?form_factor=desktop">
    <img width="710" alt="AstroPaper I18n Lighthouse Score" src="AstroPaper-lighthouse-score.svg">
  <a>
</p>

## التثبيت

أنشئ تفريعة من المستودع هذا

أو يمكنك تثبيته باستخدام أداة Astrojs عبر سطر الأوامر

```bash
pnpm create astro@latest --template yousef8/astro-paper-i18n
  ```

## 📖 طريقة الأستخدام

### 1- إنشاء ملف الترجمة

انتقل إلى [`src/i18n/locales`](src/i18n/locales) وقم بإنشاء ملف للغة الخاصة بك (مثل `es` للغة الإسبانية، `ja` للغة اليابانية، إلخ). يجب أن يكون اسم الملف بالشكل `<locale_key>.ts` (مثل `es.ts`، `ja.ts`، إلخ).

قم بتصدير متغير من نوع `I18nStrings` من `@i18n/types` يحتوي على جميع الترجمات كأزواج مفتاح-قيمة.

يمكنك الاطلاع على الترجمات المتاحة في `/src/i18n/types.ts` و  مثال لها `/src/i18n/locales/ar.ts`.

### 2- تعريف إعدادات اللغة

انتقل إلى [`src/i18n/config.ts`](src/i18n/config.ts) وقم بتعريف إعدادات  اللغة الخاصة بك داخل الكائن `localeToProfile`.

يُستخدم  إعدادات  تعريف اللغة لتحديد اسم اللغة، الترجمات، وسم اللغة، اتجاه واجهة المستخدم، واسم خط Google.

قم بإنشاء مفتاح للغة يجب أن يكون بأحرف صغيرة ويتوافق مع تسميات BCP-47 (مثل `ar`، `en`، `es`، `ja`، إلخ). قيمته هي كائن يحتوي على المفاتيح التالية:

- قم بتعيين اسم للغة في المفتاح `name`، وسيتم استخدامه في منتقي اللغة.
- قم بتعيين ملف الترجمات الذي أنشأته في الخطوة 1 إلى المفتاح `messages`.
- يجب أن يكون وسم اللغة `langTag` متوافقًا مع تسمية BCP-47، ويُستخدم لتوطين التواريخ والأوقات في سمة AstroPaper الأصلية، ولكن تم توسيع نطاقه لتوطين جميع الأرقام أيضًا (مثال `en-US`، `ar-EG`، `es-ES`، `ja-JP`، إلخ).
- اسم خط Google يُستخدم فقط في [صور OG](https://magefan.com/blog/open-graph-meta-tags).
- قم بتعيين المفتاح `default` إلى `true` إذا كنت تريد جعلها اللغة الافتراضية. إذا لم يتم تعيين لغة افتراضية، سيتم استخدام أول لغة في الكائن كلغة افتراضية.
- قم بتعيين المفتاح `direction` إلى إحدى القيم المدعومة `rtl` | `ltr` | `auto`، والتي تتوافق مع قيم سمة `dir` في HTML.

**ملاحظة:** قد تحتاج إلى إعادة تشغيل خادم التطوير لرؤية التغييرات.

**ملاحظة:** مكتبة [Satori](https://github.com/vercel/satori) لا تدعم اللغات التي تكتب من اليمين إلى اليسار (RTL)، مما يسبب مشاكل في تنسيق [صور OG](https://magefan.com/blog/open-graph-meta-tags) للغات RTL.

### 3- إضافة صفحة "نبذة عني"

صفحة "نبذة عني" لديها الآن [مجموعة محتوى](https://docs.astro.build/en/guides/content-collections/) خاصة بها لأن هذه السمة تدعم التعددية اللغوية (i18n)، ومن المحتمل أنك ستحتاج إلى محتوى هذه الصفحة بلغات متعددة.

انتقل إلى [`src/content/about`](src/content/about) وقم بإنشاء ملف `نبذة عنى` للغة الخاصة بك، يجب أن يكون اسم الملف بالشكل `about.<locale_key>.md` (مثل `about.en.md`، `about.es.md`، إلخ).

يتم دعم نفس مفاتيح frontmatter كما في سمة AstroPaper الأصلية، مثل `title` و `description` لعنوان الصفحة ووصفها.

### 4- إضافة المحتوى الخاص بك

تحت [`src/content/blog`](src/content/blog)، قم بإنشاء مجلد باسم مفتاح اللغة الخاصة بك (مثل `es`، `ja`، إلخ) وأضف محتواك بتنسيق Markdown.

لن يتم اعتبار أي مدونة خارج مجلد اللغة.

هذا كل شيء، لقد انتهيت! 🎈🎉 🥳

اطلع على [وثائق AstroPaper](https://github.com/satnaing/astro-paper?tab=readme-ov-file#-documentation) لمزيد من المعلومات، حيث أن هذا المشروع مبني عليها مع إضافة دعم التعددية اللغوية (i18n)، ولكن كل شيء آخر يجب أن يكون كما هو.

## 🛠️ الإعدادات

هى نفس طريقة [إستخدام و إعداد الثيمة الأصلية](https://github.com/satnaing/astro-paper?tab=readme-ov-file#-project-structure) و لكن مع بعض التعديلات اللازمة لترجمة الموقع

### 🔧 إعدادت الموقع

الإعداد `SITE.title` تم إستبداله بترجمة `site.title`, و المستخدمة حاليا فى الموقع كله

الإعداد `SITE.desc` تم إستبداله بترجمة `site.desc`, و المستخدمة حاليا فى الموقع كله

```diff
// src/config.ts

export const SITE: Site = {
  //...
-  title: "AstroPaper I18n",
-  desc: "A fork of AstroPaper theme with support for I18n",
  //...
};
```

```diff
// src/i18n/types.ts

export interface I18nStrings {
+  "site.title": string;
+  "site.desc": string;
   // ... other translations
```

### 🌐 إعدادات الترجمة

تم نقل إعدادات التوطين (localization) من `src/config.ts` إلى ملف منفصل

```diff
// src/config.ts

-export const LOCALE = {
-  lang: "en", // html lang code. Set this empty and default will be "en"
-  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
-} as const;

export const LOGO_IMAGE = {
```

الان إعدادات الترجمة (التوطين) إلى `src/i18n/config.ts`:

```ts
// src/i18n/config.ts
export const localeToProfile = {
 // مفتاح الترجمة يجب أن يكتب بأحرف إنجليزية صغيرة و موافق للرموز القياسية BCP-47
  ar: {
   // الإسم المعروض فى قائمة الترجمات المنسدلة
    name: "العربية",
   // ترجمات كلمات النضام
    messages: ARLocale, 
   // رمز اللغة المستجدم فى ترجمة التواريخ و الارقام و خرائط المواقع ,يجب أن يكون موافق لرموز القياسية
  // BCP47 المعروفة ب 
    langTag: "ar-EG",
    googleFontName: "Cairo", // لتوليد صور الشار للمنشورات, يجب أن يكون خط من جوجلداعم لوزن ال400 و 700 . استبدل المسافات ب '+'
    direction: "rtl", // إتجاه الكتابة فى الموقع
  },
  en: {
    name: "English",
    messages: ENLocale,
    langTag: "en-US",
    direction: "ltr",
    default: true,
  },
} satisfies Record<string, LocaleProfile>;
```

## 🧞 الأوامر

نفس [الأوامر كما فى الثيمة الأصلية](https://github.com/satnaing/astro-paper/tree/main?tab=readme-ov-file#-commands) بالإضافة إلى

| الأمر              | دلالتة                                                                                      |
| :------------------- | :------------------------------------------------------------------------------------------ |
| `npm test`           | يجرى جميع الاختبارات مرة واحدة فقط ثم يخرج [تعلم أكثر](https://vitest.dev/guide/cli.html#vitest-run) |
| `npm run test:watch` | تجرى الإختبارات فى وضع المراقبة [تعلم أكثر](https://vitest.dev/guide/cli.html#vitest-watch)   |
| `npm run coverage`   | توليد تقرير تغطية الإختبارات [تعلم أكثر](https://vitest.dev/guide/coverage.html)  |

## 🚧 المشاكل المعروفة

- تنسيق الصفحات في وضع قارئ الشاشة مكسور ويحتاج إلى إصلاح.
  - نرحب بالمساهمات!
- [صيور الشارة](https://www.freecodecamp.org/news/what-is-open-graph-and-how-can-i-use-it-for-my-website/) المولدة للمنشورات بلغات ذات اتجاه من يمين لليسار ستكون مكسورة بسبب فصور من مكتبة [ساتورى](https://www.npmjs.com/package/satori) المستخدمة فى توليد الصور
  - نرحب بالمساهمات!

</div>
