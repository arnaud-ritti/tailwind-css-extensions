const fg = require('fast-glob');
const fs = require("fs");
const safe = require('postcss-safe-parser');
const postcssJs = require('postcss-js')


const parse = function (patterns, postcss) {
    const entries = fg.sync(patterns, { dot: true });
    let parsed = undefined;
    for (const entry of entries) {
        const buffer = fs.readFileSync(entry);

        const output = postcss.parse(buffer, { parser: safe });
        if(parsed === undefined){
            parsed = output;
        }else{
            parsed.append(output);
        }
    }
    return parsed ? postcssJs.objectify(parsed) : undefined;
}

module.exports = require("tailwindcss/plugin").withOptions(function (options = {
    base: undefined,
    utilities: undefined,
    components: undefined
}) {
    return function ({ addBase, addUtilities, addComponents, theme, postcss }) {
        const base = options.base === undefined ? [] : [...options.base]
        const utilities = options.utilities === undefined ? [] : [...options.utilities]
        const components = options.components === undefined ? [] : [...options.components]

        const baseOutput = parse(base, postcss);
        if(baseOutput) addBase(baseOutput);

        const utilitiesOutput = parse(utilities, postcss);
        if(utilitiesOutput) addUtilities(utilitiesOutput, { variants: ["responsive"] })
        
        const componentsOutput = parse(components, postcss);
        if(componentsOutput) addComponents(componentsOutput, postcss)

    }
}, function (options){
    return {
        theme: { 
            extend: { 
                transparent: "transparent",
                current: "currentColor",
            }
        }
    }
});

