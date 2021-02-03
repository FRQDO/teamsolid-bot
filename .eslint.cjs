module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
        tsconfigRootDir: __dirname,
        project: "./tsconfig.json"
    },
    plugins: [
        "@typescript-eslint"
    ],
    rules: {
        indent: [
            "warn",
            4
        ],
        "linebreak-style": [
            "warn",
            "unix"
        ],
        quotes: [
            "warn",
            "double"
        ],
        semi: [
            "warn",
            "always"
        ]
    },
    ignorePatterns: [
        // Ignore all in the assets_src dir
        '*.js'
    ],
};
