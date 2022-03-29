module.exports = {
  content: [
    './example/**/*.{html,js}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("./src/index")({
      base: [ "./example/src/extensions/base/**/*.css"],
      utilities: [ "./example/src/extensions/utilities/**/*.css"],
      components: [ "./example/src/extensions/components/**/*.css"]
    })
  ],
}
