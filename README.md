# Use Translation 🌐👈🔥

## Translation Hook for Web Development

---

### Hello there 👋

This is a translation library that I developed for my own projects. So at least for me I consider it the best translation library option, I just developed one of the best development experience for Multi Language Projects. Full customizable, auto-completion everywhere with Typescript, Translation node based in a Deep Tree Data Structure, many ways to use it, and more.

It can be used for any kind projects, not only React. The Core of the library is the Node System full typesafe, over these the hooks for React works, but If you need you can extract the Node Logic and develop your own hooks for any other framework.

> Import you JSON Translation files and start using them with a fully typesafe amazing dev experience

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

        {/* Translations from lists*/}
        <ul>
            <li>{t.features[0]}</li>
            <li>{t.features[1]}</li>
            <li>{t.features[2].use({ name: "Ivan", time: t.time.now() })}</li>
            <li>{t('features',{version:"1.2.0"})[3]}</li>
        </ul>

        {/* Multiple Layers, Node based System */}
        <p>{t.page1.section1.article1.title}</p>
        <p>{t('page1/section1').article1('title')}</p>
        {/* Full typesafe with completion for variables */}
        <p>{t.use({ day: 'Monday' }).account.use(UserVariables).settings.change}</p>

    </div>)

}
```

---

## How to set up 🏗️

### First, format your JSON Translation files

Your JSON files with their translations values can be configured in a multiple layer deep tree object structure, so that each translation is a unique node with its mutable variables and base text.

```JSON
{
    "homepage": {
        "welcome": "Welcome back!",
        "menu": "Open menu"
    },
    "auth": {
        "signin": "Sign in",
        "google": {
            "title": "Connect through Google",
            "error": "Whoops!"
        }
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

The library through typescript can have an autocompletion for the placeholders in each translation. How it works? base refers to the text string of the current node ("welcome"), values is an object with the variable names |key|, and its default values |value|.
Anyway you can run the replace functions without declaring its values, but it won't have autocomplete.

Also the variables can be global for a branch in translation node tree. For example:

```JSON
{
    "mainPage": {
        "base": "Default text for main page key",
        "values": {
            "hour": "00:00",
            "example": "These variables will be in all sub nodes from here"
        },
        "section1": {
            "base": "It's {hour}",
            "article1": "...generic article text. - Today at {hour}"
        },
        "account": {
            "values": {
                "name": "User",
                "email": "email@email.com",
                "hour": "The values are isolated from other Branches"
            },
            "welcome": "Welcome {name}"
        }
    }
}
```

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

Those are not declared variables, it can be replaced, but no will be detected for typescript.

But it is not all. You can declare translation lists, for more dynamic usage in your project.

```javascript
{
    "store": {
        "product_title": ["sunglasses","watch","chain"], // you can put complex nodes into lists too
        "product_description": {
            "base": [ // base is the default text string for the curren node
                "These stylish sunglasses cost ${price} and offer 100% UV protection.",
                "The elegant watch is priced at just ${price} and comes with a stainless steel strap.",
                // Each node inherits the values from its parent
                "Our fashionable chains are available for just ${price} and make a perfect accessory."
            ],
            "values": {
                "price": 10 // nodes can be numbers | string | node arrays | record of arrays (object)
            }
        }
    }
}
```

You can access all nodes individually with all their methods for mutate and modify their branches.

### Create translation configuration file ⚙️

Create a custom setup file for importing your JSON translation files. `/libs/translation.ts`

```javascript
import * as en from "@/public/locales/en.json"
import * as es from "@/public/locales/es.json"

import { createTranslation } from "use-translation"

const createdTranslation = createTranslation({
    locales: { en, es }, // It will be notify an Error in case of any difference between translation structure 
    mainLocale: "en",
    // other settings like default variables, replacement placeholder strings, states, etc...
})

// Created translation have the hooks and general details of the translation and the core translation object with all translations for static uses.

export const { useTranslation } = createdTranslation // Export the hook for client side

// Then you can import `useTranslation`

const { t } = useTranslation('test')

console.log(t.ready) // "Enjoy your t object :)"
```

### Translation Node Logic 💻

Translation will be based on translation nodes, each translation node have its base value, default variables, children, parent, etc. The translation core object is the tree of all these nodes. The root of the object will be the default locale tree with properties for all locale tree. All in this tree are nodes, so all of them have the same methods. But for typescript, depending if is root o has base text the methods will differ.

There are two main methods for the nodes, the use method and the search method (the search can be used as use); The use will mutate of the branches downward starting from itself, It will return the same node with its children but with the new default variables modified.

```typescript
{
    base: "hello"
} // nodes with base value, will have its node as default value.
{
    child: "hello"
} // nodes with children, will have its search function as default value

"hello" // nodes can be only text too
["hello"] // or lists
// You can put this raw values when createTranslation, but strings are not recommended.
[[[["hello"]]]] // You can make it as complex as you want
t[0][0][0][0]
```

The search function will receive a path where you can get into a downward node. Also you can add variables and use both, use and search. Search function will have full auto completion with all possible string ways in that point of the tree, and it will return the corresponding types for the way.

```typescript
t.public.page1.section1.article1.lines[0].htmltitle[0]
t.search("public/page1/section1/lines/0/htmltitle/0") // Full typesafe
```

Remember that you can nest many mutation methods as you want.

```typescript
t.use(v1).p1.search("s4/a2").n3.use(v2)
```

Search is a default method for strings (anyway the method is overwritten), so you can use: get, find, go, path, search; and for use function, you can use: set, fix, use, do.

 > Try to not overlap default key of nodes.

Remember that default value for nodes will be string if it has base defined, o search function if it doesn't. Also if you want to access the string with no node methods, you can use the .base property, it is only string | null in case the node doesn't have children.

```typescript
t.basetext // string with node methods
t.page1() // search function with node methods
```

Some root nodes have the t property in typescript completion, the t property for all nodes refers to itself, it is used for useTranslation hook.

Also the nodes in its properties have some general data, like its current variables, locale details, its locale, its children property names, its name in parent property, the main locale, etc.

### Understanding hooks ✅

When you create the translation core object, it will return directly the hooks as properties (It is for performance) So if you want to modify these hooks you have to do it directly from translation configuration in the function.

```typescript
const { translation } = createTranslation({ /* Configuration */})
```

In the configuration object there is a hook property when you can put your custom hook for getting the language preference of user. For default there is a nice hook that gets the language from navigator, pathname, cookies, localstorage, etc... And can modify it through state and saving it in localstorage. But you can do it custom for example if you using a Next Router. In this hook function you will receive (langs,main,fix) parameters, langs is for all selectable languages, main is for the main locale, and fix, is a function that you can return on the hook to format the text, and return all other hooks used and the state handler, so useTranslation will be a middleware between that hook and the translation.

```typescript
const { t, setLang, lang } = useTranslation()
```

The use translation works like search function from root and switch the main from the result of the hook, and will return other general details from translation as locale list with details so you can map it for translation buttons, also return the state handler and other hooks returned from hook.

Also you can force your own language

```typescript
const [lang, setLang] = useState('en') 
const { t } = useTranslation("page1",v)[lang] // Works perfectly too!
```

But if you only want to do that, better use the getTranslation "hook", it will adapt the base node object as use hook but static, so you can use it for Server Components for example.

```javascript
export default function Page({ params: { lang }}) {
    const { t } = getTranslation()[lang]
    /// ...
}
```

Also there is still a lot of features that can be added to this lib, any idea Im open.
For example, I didn't know still how to do this:

```typescript
const [t, setLang] = useTranslation()
```

Technically it works on typescript, but I didn't know how to do with typesafe, because I did't want to keep the default array methods, and it have to modify the iterator, but it doesn't keep the position typesafe.

---

## Use translation on NextJs 🧑‍🚀

This library was developed mainly for NextJs projects. So here is a basic guide for next/pages and next/app

### next/pages

#### Config file

```javascript
import * as en from "@/public/locales/en.json"
import * as es from "@/public/locales/es.json"

import { useRouter } from "next/router"
import { createTranslation } from "use-translation"

export const { useTranslation } = createTranslation({
    locales: { en, es },
    defaultLocale: en // you can define it with the full object.
    onNotTranslated: (queryString, queryLanguage, queryValues) => {
        // When translation not found, handle external translation API for example...
        return '😵'
    },
    hook: (fix,langs,main) => { // You can modify the predetermined hook to use Next Router for example
        const router = useRouter();
        return fix(
            router.locale, // string
            (l)=>router.push({ locale: l }), // function to mutate | Or set state action dispatch
            router, // any value you want to return 
        )
    }
},
    // also you can put the hook as second parameter here
)
```

That's all needed to start working with { t }.

#### Component usage example

```javascript
import { useTranslation } from "@/libs/translation"

export default HomePage() {

    const { t } = useTranslation("homepage");

    return (<div>
    
        <h1>{t.welcome}</h1>

    </div>)

}

```

You can retrieve the hook return as "hook" property on the useTranslation. In this case the return is the next router.

### next/app

#### Config File for Server Component

```javascript
import * as en from "@/public/locales/en.json"
import * as es from "@/public/locales/es.json"

import { createTranslation } from "nivandres-use-translation"

export const { getTranslation } = createTranslation({
    locales: { en, es },
    defaultLocale: 'en'
})
```

Ideally you have to get the lang with your own middleware. [Next Middleware Example](https://nextjs.org/docs/app/building-your-application/routing/internationalization)

```typescript
export default function LayoutPage({ params: { lang } }) {
    const { t } = getTranslation("pagina")[lang]
}

```

#### Config File for Client Component

```javascript
import * as en from "@/public/locales/en.json"
import * as es from "@/public/locales/es.json"

import { createTranslation } from "nivandres-use-translation"

export const { useTranslation } = createTranslation({
    locales: { en, es },
    defaultLocale: 'en'
})
```

## Features 🗽

- 100% type safe. You get type completion everywhere. Even the output strings have their properties with more details and type safe.
- You can use translations as an object translation or function method object tree.
- You can declare translation lists and use it with all the translation methods and handle it like an array

```javascript
const originalString = t.welcome.use({/*You get completion here*/}).raw // original string
const originalValues = t("welcome", { user: "Ivan" }).variables
// global t object
const g = t.g
const welcomestring = g.homepage.welcome
const welcomewithvariables = g("homepage","welcome",{user:"ivan"})
```

- Also you can easily format the time

```javascript
const { t, time } = useTranslation("global")
// t -> t object
// time -> time format object
const formattedTime = time('10/10/23'/*number|string|Date*/,'md'/*xs,sm,md,lg,xl*/, undefined/*prefferedLocale*/) // Also all translation function objects have a parameter for fixing a preffered locale translation
```
