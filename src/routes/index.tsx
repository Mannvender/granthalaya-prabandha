import Homepage from 'pages/home'
import PunchIn from 'pages/punch-in'
import PunchOut from 'pages/punch-out'
import Register from 'pages/register'
import List from 'pages/list'
import Edit from 'pages/edit'
import RegisterMultiple from 'pages/register-multiple'

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
    path: '/punch-in',
    exact: true,
    component: PunchIn,
    public: true,
    private: false,
    publicOnly: false,
    layout: 'StackLayout',
  },
  {
    path: '/punch-out',
    exact: true,
    component: PunchOut,
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
  {
    path: '/register-multiple',
    exact: true,
    component: RegisterMultiple,
    public: true,
    private: false,
    publicOnly: false,
    layout: 'StackLayout',
  },
]
