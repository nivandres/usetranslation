# Use Translation 🌐👈

## Translation Hook for Web Development

---

### Hello there 👋

This is a personal translation library that I use for my own projects. I use it mainly for NextJs projects, but can be used for any other kind of project. Only that it is still not 100% finished and polished ⚠️

> Import you JSON Translation files and start using them with a completion typesafe amazing dev experience

### Usage Example

```javascript
export default function HomePage () {

    // get the translator object from a predefined page template
    const { t } = useTranslation("homepage")

    return (<div>
    
        {/* Get translations as an object */}
        <h1>{t.title}</h1>

        {/* Use variables in your translation */}
        <h2>{t.welcome.use({ user: "Iván" })}</h2>

        {/* Use it however you want with autocomplete*/}
        <p>{t('main', {
            // Premade time format settings. xs, sm, md, lg, xl
            time: t.time.now('lg') // t.time(new Date(),'md')
        } )}</p>

        {/* Translation from lists*/}
        <ul>
            <li>{t.features[0]}</li>
            <li>{t.features[1]}</li>
            <li>{t.features[2].use({ name: "Ivan", time: t.time.now() })}</li>
            <li>{t('features',{version:"1.2.0"})[3]}</li>
        </ul>

    </div>)

}
```

---

## How to set up 🏗️

### First, format your JSON Translation files

Your JSON files with their translations values must be configured in a 2 layers deep object structure, so that each translation is defined by a page (general group of translations) and a specific key.

```JSON
{
    "homepage": {
        "welcome": "Welcome back!",
        "menu": "Open menu"
    },
    "auth": {
        "signin": "Sign in",
    }
}
```

Your translations can have multiple placeholders, that can be replaced with variables. For example, `Hello {user}!` has a user variable, that can be replaced.
We can define these variables in these way:

```JSON
{
    "homepage": {
        "welcome": {
            "base": "Welcome {user}!",
            "values": {
                "user": "user"
            }
        }
    }
}
```

The library through typescript can have an autocomplete for each translation and its placeholders. How it works? base refers to the raw translation string, values is an object with the variable names |key|, and its default values |value|.

Anyway you can run the replace functions without declaring its values, but it won't have autocomplete.

Remember all your JSON Files for each language should have the same structure, pages, and keys elements. In case there is some difference between the files, typescript should detect it and warn you.


```JSON
{
    "homepage": {
        "welcome": "Welcome, {value}"
    }
}

{
    "homepage": {
        "welcome": "Bienvenido, {value}"
    }
}
```

Those are not declared values, it can be replaced, but no will be detected for typescript.

But it is not all. You can declare translation lists, for more dynamic usage in your project.
```JSON
{
    "store": {
        "product_title": ["sunglasses","watch","chain"],
        "product_description": {
            "base": [
                "These stylish sunglasses cost ${price} and offer 100% UV protection.",
                "The elegant watch is priced at just ${price} and comes with a stainless steel strap.",
                "Our fashionable chains are available for just ${price} and make a perfect accessory."
            ],
            "values": {
                "price": 10
            }
        }
    }
}
```
You can access all individually and apply .use method for modify each variable for each translated string.

### Create translation configuration file ⚙️

Create a custom setup file for importing your JSON translation files. `/libs/lang.ts`

```javascript
import * as en from "@/public/locales/en.json"
import * as es from "@/public/locales/es.json"

import { createTranslation } from "use-translation"

const { translation } = createTranslation({
    locales: { en, es },
    defaultLocale: "en",
    // other settings like replacement placeholders, states, etc...
})

export const { useTranslation } = translation('es') // Use any other hook for fix the query language

// Then you can import `useTtranslation`

const { t } = useTranslation('test')

console.log(t.ready) // "Enjoy your t object :)"
```
---

## Use translation on NextJs 🧑‍🚀

### next/pages

#### Config file

```javascript
import * as en from "@/public/locales/en.json"
import * as es from "@/public/locales/es.json"

import { createTranslation } from "use-translation"

const { translationFromCallback } = createTranslation({
    locales: { en, es },
    defaultLocale: en // you can define it with the full object.
    onNotTranslation: (queryValue, queryPage, queryKey, queryLanguage) => {
        // When translation not foun, handle external translation API for example...
        return '😵'
    }
})

import { useRouter } from "next/router";

export const useTranslation = translationFromCallback(()=>{
    const router = useRouter();
    return router.locale as "en" | "es"
})
```

That's all needed to start working with { t }. Also you can handle it however you want.

#### Component usage example

```javascript
import { useTranslation } from "@/libs/lang"

export default HomePage() {

    const { t } = useTranslation("homepage");

    return (<div>
    
        <h1>{t.welcome}</h1>

    </div>)

}

```

### next/app

#### Config File for Server Component

```javascript
import * as en from "@/public/locales/en.json"
import * as es from "@/public/locales/es.json"

import { createTranslation } from "nivandres-use-translation"

const { translationFromCallback, getLocaleFromHeaders } = createTranslation({
    locales: { en, es },
    defaultLocale: 'en'
})

import { headers } from "next/headers"

export const useTranslation = translationFromCallback(()=>{
    return getLocaleFromHeaders(headers())
})
```

#### Config File for Client Component
```javascript
import * as en from "@/public/locales/en.json"
import * as es from "@/public/locales/es.json"

import { createTranslation } from "nivandres-use-translation"

const { translationFromPathname, getLocaleFromPathname } = createTranslation({
    locales: { en, es },
    defaultLocale: 'en'
})

import { usePathname } from "next/navigation"

export const useTranslation = translationFromCallback(()=>{
    return getLocaleFromPathname(usePathname())
})
```

## Features 🗽

- 100% type safe. You get type completion everywhere. Even the output strings have their properties with more details and type safe.
- You can use translations as an object translation or function method object tree.
- You can declare translation lists and use it with all the translation methods and handle it like an array

```javascript
const originalString = t.welcome.use({/*You get completion here*/}).original.base // original string
const originalValues = t("welcome", { user: "Ivan" }).variables
// global t object
const g = t.g
const welcomestring = g.homepage.welcome
const welcomewithvariables = g("homepage","welcome",{user:"ivan"})
```

- Also you can easily format the time

```javascript
const { t, g, time } = useTranslation("global")
// t -> t object
// g -> global t object
// time -> time format object
const formattedTime = time('10/10/23'/*number|string|Date*/,'md'/*xs,sm,md,lg,xl*/, undefined/*prefferedLocale*/) // Also all translation function objects have a parameter for fixing a preffered locale translation
```

## @nivandres 👤

Hi, this is my first library for javascript, so It's not the best (yet), but at least it is so useful for me. I remade the way I do translations for my Nextjs projects but in a simple lib. So it is the best way to make translations for me. I really like to make translations in function objects tree, so it is very versatile for working on diferrent kind of projects
