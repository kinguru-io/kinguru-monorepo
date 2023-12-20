import { NextJsTsProject } from "@yersh/projen-nextjs";
import { TurborepoTsProject } from "@yersh/projen-turborepo";
import { DependencyType } from "projen";
import { NodePackageManager, TypeScriptJsxMode } from "projen/lib/javascript";
import { TypeScriptProject } from "projen/lib/typescript";

const monorepo = new TurborepoTsProject({
  name: "kinguru-monorepo",
  authorName: "Maksim Yersh",
  authorEmail: "yersh.maks@gmail.com",
  authorUrl: "yer.sh",
  repository: "https://github.com/kinguru-io/kinguru-monorepo",
  defaultReleaseBranch: "main",

  renovatebot: true,
  renovatebotOptions: {
    overrideConfig: {
      enabledManagers: ["npm"],
      extends: ["config:base", ":combinePatchMinorReleases"],
      prHourlyLimit: 5,
      prConcurrentLimit: 10,
      labels: ["auto-approve"],
      rangeStrategy: "pin",
      semanticCommitType: "chore",
      semanticCommitScope: "deps",
      packageRules: [
        {
          matchDepTypes: ["engines", "peerDependencies"],
          versionStrategy: "widen",
        },
        {
          semanticCommitScope: "devDeps",
          matchDepTypes: ["packageManager", "devDependencies"],
          matchUpdateTypes: ["major"],
        },
        {
          semanticCommitScope: "devDeps",
          matchDepTypes: ["packageManager", "devDependencies"],
          matchUpdateTypes: ["minor", "patch"],
        },
        {
          matchDepTypes: ["engines"],
          rangeStrategy: "widen",
        },
      ],
    },
  },

  autoMerge: true,
  autoApproveUpgrades: true,
  autoApproveOptions: {
    allowedUsernames: [
      "edelwud",
      "github-actions[bot]",
      "dependabot[bot]",
      "renovate[bot]",
    ],
  },
  pnpmVersion: "8",
  minNodeVersion: "20.9.0",
  workflowPackageCache: true,
  dependabot: true,
  dependabotOptions: {
    ignoreProjen: false,
  },

  projenrcTs: true,
  prettier: true,

  devDeps: ["@yersh/projen-turborepo", "@yersh/projen-nextjs"],

  gitignore: [".env", "out"],

  turborepo: {
    pipeline: {
      dev: {
        dependsOn: ["^db:generate"],
        cache: false,
      },
      build: {
        dependsOn: ["^build", "^db:generate"],
        outputs: [".next/**", "!.next/cache/**", "dist/**", "lib/**"],
      },
      "db:generate": {
        cache: false,
      },
      "db:push": {
        cache: false,
      },
    },
  },
});

const database = new TypeScriptProject({
  parent: monorepo,
  name: "database",
  outdir: "packages/database",
  defaultReleaseBranch: "main",
  packageManager: NodePackageManager.PNPM,

  eslint: true,
  prettier: true,

  deps: ["@prisma/client", "@prisma/instrumentation"],
  devDeps: ["prisma", "@faker-js/faker"],
});

const web = new NextJsTsProject({
  parent: monorepo,
  name: "web",
  outdir: "apps/web",
  defaultReleaseBranch: "main",
  packageManager: NodePackageManager.PNPM,

  eslint: true,
  prettier: true,

  tsconfig: {
    compilerOptions: {
      paths: {
        "~/*": ["./public/*"],
        "@/*": ["./src/*"],
      },
    },
    include: ["./kuma.config.ts", "src/**/*.tsx"],
  },

  deps: [
    "@kuma-ui/core",
    "@kuma-ui/next-plugin",
    "normalize.css",
    "@kinguru/uikit@*",

    "database@*",
    "next-auth",
    "next-intl",
    "nodemailer",
    "stripe",
  ],

  devDeps: [],
});

const uikit = new TypeScriptProject({
  parent: monorepo,
  name: "@kinguru/uikit",
  outdir: "packages/uikit",
  defaultReleaseBranch: "main",
  packageManager: NodePackageManager.PNPM,

  eslint: true,
  prettier: true,

  tsconfig: {
    compilerOptions: {
      lib: ["es2019", "dom"],
      jsx: TypeScriptJsxMode.REACT,
      declaration: true,
    },
    include: ["src/**/*.tsx"],
  },

  deps: ["@kuma-ui/core", "normalize.css", "react"],
  devDeps: [
    "@babel/core",
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript",
    "babel-loader",
    "css-loader",
    "@kuma-ui/webpack-plugin",
    "mini-css-extract-plugin",
    "webpack",
    "webpack-cli",
    "@types/react",
    "@types/react-dom",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-links",
    "@storybook/addon-onboarding",
    "@storybook/blocks",
    "@storybook/react",
    "@storybook/react-webpack5",
    "@storybook/test",
    "eslint-plugin-storybook",
    "storybook",
  ],
});

uikit.postCompileTask.exec("npx webpack");
uikit.tasks.addTask("storybook", { exec: "npx storybook dev -p 5000" });

const dbGenerate = database.tasks.addTask("db:generate", {
  exec: "prisma generate",
});
database.tasks.addTask("db:push", { exec: "prisma generate" });
database.preCompileTask.spawn(dbGenerate);

monorepo.npmrc.addConfig("public-hoist-pattern[]", "*prisma*");

[web, database].forEach((project) => {
  project.package.addField("private", true);
  project.gitignore.include(".env");
});

[monorepo, web, database, uikit].forEach((project) => {
  project.deps.removeDependency("eslint");
  project.deps.addDependency("eslint@^7", DependencyType.DEVENV);
});

monorepo.synth();
