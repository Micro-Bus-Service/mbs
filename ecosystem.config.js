module.exports = {
  apps : [{
    name: 'MBS',
    script: 'dist/index.js',

    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    instances: 2,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    exec_mode  : "cluster",
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
