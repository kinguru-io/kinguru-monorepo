import { NextJsTsProject } from "@yersh/projen-nextjs";
import { TurborepoTsProject } from "@yersh/projen-turborepo";
import { DependencyType } from "projen";
import { NodePackageManager } from "projen/lib/javascript";
import { TypeScriptProject } from "projen/lib/typescript";

const monorepo = new TurborepoTsProject({
  name: "kinguru-monorepo",
  authorName: "Maksim Yersh",
  authorEmail: "yersh.maks@gmail.com",
  authorUrl: "yer.sh",
  repository: "https://github.com/edelwud/kinguru-monorepo",
  defaultReleaseBranch: "main",

  autoMerge: true,
  autoApproveUpgrades: true,
  autoApproveOptions: {
    allowedUsernames: ["edelwud", "github-actions[bot]", "dependabot[bot]"],
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

  devDeps: ["@yersh/projen-turborepo", "@yersh/projen-nextjs", "eslint@^7"],

  gitignore: [".env", "out"],

  turborepo: {
    pipeline: {
      dev: {},
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
  nextui: true,

  deps: ["database@*"],
});

database.preCompileTask.exec("npx prisma generate");

[web, database].forEach((project) => {
  project.package.addField("private", true);
  project.gitignore.include(".env");
});

[monorepo, web, database].forEach((project) => {
  project.deps.removeDependency("eslint");
  project.deps.addDependency("eslint@^7", DependencyType.DEVENV);
});

monorepo.synth();
