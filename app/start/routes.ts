import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ inertia }) => inertia.render('Home'))

Route.get('/register', 'RegistersController.index')
Route.post('/register', 'RegistersController.register')
Route.get('/login', 'LoginController.index')
Route.post('/login', 'LoginController.login')
Route.get('/logout', async (ctx) => {
  await ctx.auth.logout()
  return ctx.inertia.location('/')
})
Route.group(() => {
  Route.post('/add', 'ProjectsManagmentsController.add')
}).prefix('/project')
Route.get('/dashboard', 'AdminsController.dashboard').middleware('auth')
