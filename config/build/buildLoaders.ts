import { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from "./types/types";
import ReactRefreshTypeScript from 'react-refresh-typescript';
import { buildBabelLoader } from "./babel/buildBabelLoader";

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const isDev = options.mode === 'development';

  const tsLoader = {
    test: /\.tsx?$/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
          }),
          transpileOnly: isDev
        }
      } 
    ],
    exclude: /node_modules/,
  };

  const babelLoader = buildBabelLoader(options);

  const cssLoaderWithModels = {
    loader: 'css-loader', 
    options: {
      modules: {
        localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
      }
    }
  }

  const scssLoader = { 
    test: /\.s[ac]ss$/i, 
    use: [ 
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 
      cssLoaderWithModels, 
      'sass-loader', 
    ],
  };

  const assetsLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  };

  const svgrLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [
      { 
        loader: '@svgr/webpack', 
        options: { 
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: "convertColors",
                params: {
                  currentColor: true,
                }
              }
            ]
          }
        } 
      }
    ],
  };

  return [
    assetsLoader,
    babelLoader, 
    svgrLoader, 
    scssLoader
  ]
}