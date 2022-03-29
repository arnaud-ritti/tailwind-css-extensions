
# Tailwind CSS Extensions

This plugin add automaticaly your CSS into Tailwind

## Installation

```
npm install tailwind-css-extensions --save
```

## Usage

Add the plugin into your `tailwind.config.js`

```js
module.exports = {
  content: [
    './example/**/*.{html,js}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwind-css-extensions")({
      base: [ "extensions/base/**/*.css"], // Glob paths to your bases
      utilities: [ "extensions/utilities/**/*.css"], // Glob paths to your utilities
      components: [ "extensions/components/**/*.css"] // Glob paths to your components
    })
  ],
}

```