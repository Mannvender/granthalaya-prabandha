import Homepage from 'pages/home'
import Login from 'pages/login'
import Register from 'pages/register'
import List from 'pages/list'
import Edit from 'pages/edit'

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
  {
    path: '/register',
    exact: true,
    component: Register,
    public: true,
    private: false,
    publicOnly: false,
    layout: 'StackLayout',
  },
  {
    path: '/list',
    exact: true,
    component: List,
    public: true,
    private: false,
    publicOnly: false,
    layout: 'StackLayout',
  },
  {
    path: '/edit/:admissionNo',
    exact: true,
    component: Edit,
    public: true,
    private: false,
    publicOnly: false,
    layout: 'StackLayout',
  },
]
