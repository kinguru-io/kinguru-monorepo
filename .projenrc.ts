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
    allowedUsernames: ["edelwud", "github-actions[bot]"],
  },
  pnpmVersion: "8",
  minNodeVersion: "20.9.0",
  workflowPackageCache: true,

  projenrcTs: true,
  prettier: true,

  devDeps: ["@yersh/projen-turborepo", "@yersh/projen-nextjs", "eslint@^7"],

  turborepo: {
    pipeline: {
      build: {
        dependsOn: ["^build"],
        outputs: [".next/**", "!.next/cache/**", "dist/**", "lib/**"],
      },
      eslint: {},
      test: {},
    },
  },
});

const database = new TypeScriptProject({
  parent: monorepo,
  name: "database",
  outdir: "packages/database",
  defaultReleaseBranch: "main",
  packageManager: NodePackageManager.PNPM,
});

database.package.addField("private", true);

monorepo.deps.removeDependency("eslint");
monorepo.deps.addDependency("eslint@^7", DependencyType.DEVENV);

monorepo.synth();
