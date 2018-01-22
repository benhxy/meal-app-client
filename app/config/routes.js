import App from '../components/App';

if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

function redirectToLogin(nextState, replace) {
  console.log(nextState)
  if (!localStorage.getItem("MealAppToken")) {
    replace({
      pathname: '/auth/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

function handleLogOut(nextState, replace) {
  localStorage.removeItem("MealAppToken");
  localStorage.removeItem("MealAppRole");
  localStorage.removeItem("MealAppUserId");
  localStorage.removeItem("MealAppExpectedKcal");
  replace('/auth/login');
}

function checkUrlExist(nextState, replace){
  replace('/');
}


const routes = {
  path: '/',
  component: App,
  indexRoute: {
    getComponent(location, cb) {
      require.ensure([], (require) => {
        cb(null, require('../components/pages/meals/MealList.js').default)
      }, 'meal-list');
    }
  },
  childRoutes: [
    //site display part related routes
    {
      path: '/auth/signup',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('../components/pages/auth/Signup.js').default)
        }, 'auth-signup');
      }
    },
    {
      path: '/auth/login',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('../components/pages/auth/Login.js').default)
        }, 'auth-login');
      }
    },
    {
      path: '/users',
      onEnter: redirectToLogin,
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('../components/pages/users/UserList.js').default)
        }, 'user-list');
      }
    },
    {
      path: '/new-user',
      onEnter: redirectToLogin,
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('../components/pages/users/CreateUserByAdmin.js').default)
        }, 'create-user');
      }
    },
    {
      path: '/users/:id',
      onEnter: redirectToLogin,
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('../components/pages/users/EditUserByAdmin.js').default)
        }, 'edit-user');
      }
    },
    {
      path: '/invite',
      onEnter: redirectToLogin,
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('../components/pages/admin/Invitation.js').default)
        }, 'invite');
      }
    },
    {
      path: '/activate',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('../components/pages/auth/Activation.js').default)
        }, 'activate');
      }
    },
    {
      path: '/profile',
      onEnter: redirectToLogin,
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('../components/pages/users/UserProfile.js').default)
        }, 'user-profile');
      }
    },
    {
      path: '/meals',
      onEnter: redirectToLogin,
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('../components/pages/meals/MealList.js').default)
        }, 'meal-list');
      }
    },
    {
      path: '/all-meals',
      onEnter: redirectToLogin,
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('../components/pages/meals/MealListAdmin.js').default)
        }, 'meal-list-admin');
      }
    },
    {
      path: '/logout',
      onEnter: handleLogOut
    },
    {
      path: '*',
      onEnter: checkUrlExist
    }
  ],

};

export default routes;
