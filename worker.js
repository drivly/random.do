import { Router } from 'itty-router'
import { json, withParams } from 'itty-router-extras'

const router = Router()

const api = {
  icon: '⚡️☁️',
  name: 'random.do',
  description: 'Random Generator',
  url: 'https://random.do/api',
  typeOf: 'https://apis.do/integrations',
  endpoints: {
    cf: 'https://api.cf',
    zones: 'https://api.cf/zones',
  },
  site: 'https://random.do',
  repo: 'https://github.com/drivly/random.do',
}

router.all('*', async (req, env, ctx) => {
  const {user} = await env.CTX.fetch(req).then(res => res.json())
  req.user = user
})

router.get('/', ({cf, headers, user}) => json({ api, cf, headers: Object.fromEntries(headers), user }))


router.get('/:resource/:id?', withParams, async ({resource, id, user}) => {
  return json({api, resource, id, user })
})

router.all('*', ({user}) => json({ api, user }))


export default {
  fetch: router.handle 
}
