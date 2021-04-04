import Homepage from 'pages/home'
import Login from 'pages/login'

export default [
  {
    path: '/',
    exact: true,
    component: Homepage,
    public: true,
    private: false,
    publicOnly: false,
    layout: 'StackLayout',
  },
  {
    path: '/login',
    exact: true,
    component: Login,
    public: true,
    private: false,
    publicOnly: false,
    layout: 'StackLayout',
  },
]
