import { register } from 'node:module'
import { pathToFileURL } from 'node:url'

register(new URL('./empty-css-loader.mjs', import.meta.url), pathToFileURL('./'))
