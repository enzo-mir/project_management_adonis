import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ inertia }) => inertia.render('Home'))

Route.get('/register', 'RegistersController.index')
Route.post('/register', 'RegistersController.register')
Route.get('/login', 'LoginController.index')
Route.post('/login', 'LoginController.login')
Route.post('/profile/update', 'ProfilesController.update')
Route.get('/logout', async (ctx) => {
  await ctx.auth.logout()
  return ctx.inertia.location('/login')
})
Route.group(() => {
  Route.post('/add', 'ProjectsManagmentsController.add')
  Route.post('/status', 'ProjectsManagmentsController.status')
  Route.post('/delete', 'ProjectsManagmentsController.delete')
}).prefix('/project')

Route.group(() => {
  Route.post('/add', 'TasksManagmentsController.add')
  Route.post('/status', 'TasksManagmentsController.status')
  Route.post('/delete', 'TasksManagmentsController.delete')
}).prefix('/task')

Route.get('/dashboard', 'AdminsController.dashboard').middleware('auth')
Route.post('/password', 'ForgotPasswordsController.sendEmail')
Route.get('/:email/:id', 'ForgotPasswordsController.index')
Route.post('/:email/:id', 'ForgotPasswordsController.resetPassword')
Route.any('/*', async ({ inertia }) => {
  return inertia.render('Undefined')
})
