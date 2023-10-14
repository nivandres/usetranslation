import { createTranslation } from "../src";

const { translation } = createTranslation({

    locales: {

        en: {
            salute: {
                hello: "Hello",
                bye: "Goodbye",
                welcome: {
                    base: "Welcome {user}",
                    values: {
                        user: "John"
                    }
                }
            }
        },
        es: {
            salute: {
                hello: "Hola",
                bye: "Adios",
                welcome: {
                    base: "Bienvenido {user}",
                    values: {
                        user: "Juan"
                    }
                }
            }
        }

    }

})

const { t } = translation("en").useTranslation("salute");

console.log(

    t.g('salute','hello')

)