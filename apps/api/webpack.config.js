const nodeExternals = require('webpack-node-externals');
const { HotModuleReplacementPlugin, WatchIgnorePlugin } = require('webpack');

module.exports = config => {
  const tsLoader = config.module.rules.find(r => r.loader.includes('ts-loader'));

  if (tsLoader) {
    tsLoader.options.transpileOnly = false;
    tsLoader.options.getCustomTransformers = program => ({
      before: [
        require('@nestjs/swagger/plugin').before(
          {
            classValidatorShim: true,
            introspectComments: true,
            dtoFileNameSuffix: [
              '.input.ts',
              '.output.ts',
              '.input.dto.ts',
              '.output.dto.ts',
              '.entity.ts',
              '.dto.ts',
            ],
          },
          program
        ),
      ],
    });
  }

  const { plugins, externals, entry } = config;

  return {
    ...config,
    // entry: { main: ['webpack/hot/poll?100', entry.main[0]] },
    externals: [
      ...externals,
      nodeExternals({
        allowlist: ['webpack/hot/poll?100', entry.main[0]],
      }),
    ],
    plugins: [
      ...plugins,
      new HotModuleReplacementPlugin(),
      new WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
    ],
  };
};
