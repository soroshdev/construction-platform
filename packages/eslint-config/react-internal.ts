import globals from "globals";
import pluginReactHooks from "eslint-plugin-react-hooks";
import { config as baseConfig } from "./base";

export const config = [
  ...baseConfig,
  {
    languageOptions: {
      globals: { ...globals.serviceworker, ...globals.browser },
    },
  },
  pluginReactHooks.configs.flat.recommended,
];
