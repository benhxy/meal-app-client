import App from '../components/App';

if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

function redirectToLogin(nextState, replace) {
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
  replace('/auth/login');
}

function checkUrlExist(nextState, replace){
  replace('/');
}


const routes = {
  path: '/',
  component: App,
  indexRoute: {
    onEnter: redirectToLogin,
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
      path: '/new-user',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('../components/pages/users/CreateUserByAdmin.js').default)
        }, 'create-user');
      }
    },
    {
      path: '/users',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('../components/pages/users/UserList.js').default)
        }, 'user-list');
      }
    },
    {
      path: '/users/:id',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('../components/pages/users/EditUserByAdmin.js').default)
        }, 'edit-user');
      }
    },
    {
      path: '/profile',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('../components/pages/users/UserProfile.js').default)
        }, 'user-profile');
      }
    },
    {
      path: '/meals',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('../components/pages/meals/MealList.js').default)
        }, 'meal-list');
      }
    },
    {
      path: '/all-meals',
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
/*


    
    {
      path: '/run',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('../components/pages/RunList.js').default)
        }, 'RunList');
      }
    },
    {
      path: '/run_admin',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('../components/pages/RunListAdmin.js').default)
        }, 'RunListAdmin');
      }
    },
    {
      path: '/user/:id',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('../components/pages/UserDetail.js').default)
        }, 'UserDetail');
      }
    },

    {
      path: '/about',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('../components/pages/About.js').default)
        }, 'About');
      }
    },
*/
    {
      path: '*',
      onEnter: checkUrlExist
    }
  ],

};

export default routes;
