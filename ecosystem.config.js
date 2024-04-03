module.exports = {
  apps: [
    {
      name: 'not-woowacourse-server-pm2',
      script: './dist/main.js',
      instances: 0,
      exec_mode: 'cluster',
    },
  ],
};
