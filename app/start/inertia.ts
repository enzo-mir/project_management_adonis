/*
|--------------------------------------------------------------------------
| Inertia Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import Inertia from '@ioc:EidelLev/Inertia'
import getProjectDatas from 'App/functions/get_projects'
import getTasks from 'App/functions/get_tasks'

Inertia.share({
  errors: (ctx) => {
    return ctx.session.flashMessages.get('errors')
  },
  userData: (ctx) => ctx.auth.user,
  projects: async (ctx) => ctx.auth.user && (await getProjectDatas(ctx)),
  tasks: async (ctx) => ctx.auth.user && (await getTasks(ctx)),
}).version(() => Inertia.manifestFile('public/assets/manifest.json'))
