//@ts-check
// @ts-ignore
const stats = require("./stats.json")
// @ts-ignore
const { get, isArray } = require("lodash")

const headComponents = []
const pathPrefix = `/`
const scripts = [
    `About`,
    `ChartBar`,
    `main`
    // pathChunkName(locals.path),
    // page.componentChunkName,
    // page.layoutComponentChunkName,
  ]
    .map(s => {
      const fetchKey = `assetsByChunkName[${s}]`

      let fetchedScript = get(stats, fetchKey)

      if (!fetchedScript) {
        return null
      }

      // If sourcemaps are enabled, then the entry will be an array with
      // the script name as the first entry.
      fetchedScript = isArray(fetchedScript) ? fetchedScript[0] : fetchedScript
      const prefixedScript = `${pathPrefix}${fetchedScript}`

      // Make sure we found a component.
      if (prefixedScript === `/`) {
        return null
      }

      return { rel: `preload`, prefixedScript }
    })


  scripts.forEach(({ rel, prefixedScript }) => {
    // Add preload <link>s for scripts.
    headComponents.unshift(
      `<link rel="${rel}" key="${prefixedScript}" href="${prefixedScript}" as="script" />`
    )
  })

  console.log(headComponents)