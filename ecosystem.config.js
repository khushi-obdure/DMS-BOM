/**
 * @description pm2 configuration file.
 * @example
 *  production mode :: pm2 start ecosystem.config.js --only prod
 *  development mode :: pm2 start ecosystem.config.js --only dev
 */
module.exports = {
  apps: [
    {
      name: 'prod', // pm2 start App name
      script: 'dist/server.js',
      exec_mode: 'cluster', // 'cluster' or 'fork'
      instance_var: 'INSTANCE_ID', // instance variable
      instances: 1, // pm2 instance count
      autorestart: true, // auto restart if process crash
      watch: false, // files change automatic restart
      ignore_watch: ['node_modules', 'logs'], // ignore files change
      max_memory_restart: '1G', // restart if process use more than 1G memory
      merge_logs: true, // if true, stdout and stderr will be merged and sent to pm2 log
      output: './logs/access.log', // pm2 log file
      error: './logs/error.log', // pm2 error log file
      env: {
        // environment variable
        PORT: 3000,
        NODE_ENV: 'production',
      },
    },
    {
      name: 'dev', // pm2 start App name
      script: 'ts-node', // ts-node
      args: '-r tsconfig-paths/register --transpile-only src/server.ts', // ts-node args
      exec_mode: 'cluster', // 'cluster' or 'fork'
      instance_var: 'INSTANCE_ID', // instance variable
      instances: 1, // pm2 instance count
      autorestart: true, // auto restart if process crash
      watch: false, // files change automatic restart
      ignore_watch: ['node_modules', 'logs'], // ignore files change
      max_memory_restart: '1G', // restart if process use more than 1G memory
      merge_logs: true, // if true, stdout and stderr will be merged and sent to pm2 log
      output: './logs/access.log', // pm2 log file
      error: './logs/error.log', // pm2 error log file
      env: {
        // environment variable
        PORT: 3000,
        NODE_ENV: 'development',
      },
    },
  ],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-3-6-14-110.ap-south-1.compute.amazonaws.com',
      key: '/Users/akash/Healthtrip_stage_node_p_key.cer',
      ref: 'origin/development',
      repo: 'git.com',
      path: '/var/www/html/new_source',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --only prod',
    },
  },
};
