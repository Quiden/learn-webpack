import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration, DefinePlugin, ProgressPlugin } from "webpack";
import { BuildOptions } from './types/types';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

export function buildPlugins({ mode, paths, analyzer, platform }: BuildOptions): Configuration['plugins'] {
  const isDev = mode === 'development';
  const isProd = mode === 'production';

  const plagins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({ template: paths.html, favicon: path.resolve(paths.public, 'favicon.ico') }),
    new DefinePlugin({
      WEBPACK_PLATFORM: JSON.stringify(platform),
      WEBPACK_ENV: JSON.stringify(mode)
    })
  ];

  if (isDev) {
    plagins.push(new ProgressPlugin());
    plagins.push(new ForkTsCheckerWebpackPlugin());
    plagins.push(new ReactRefreshWebpackPlugin());
  }

  if (isProd) {
    plagins.push(new MiniCssExtractPlugin({ 
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }));

    plagins.push(new CopyPlugin({
      patterns: [
        { from: path.resolve(paths.public, 'locales'), to: path.resolve(paths.output, 'locales') },
      ],
    }));
    
    if (analyzer) {
      plagins.push(new BundleAnalyzerPlugin())
    }
  }

  return plagins;
}