#!/usr/bin/env node

import "../src/core/env";
import { Command } from "commander";
import { initProject } from "../src/commands/init";
import { testScan } from "../src/commands/testScan";
import { summary } from "../src/commands/summary";
import { ask } from "../src/commands/ask";
import { doctor } from "../src/commands/doctor";
import { chat } from "../src/commands/chat";
import { map } from "../src/commands/map";
import { explain } from "../src/commands/explain";
import { showWelcome } from "../src/ui/welcome";
import { showTip } from "../src/ui/tips";

const program = new Command();

program
  .name("devsense")
  .description("Developer Intelligence CLI");
program
.command("init")
.description("Initialize a new DevSense project")
.action(initProject);
program
.command("scan")
.action(testScan);
program
  .command("summary")
  .description("Show project summary")
  .action(summary);
program
  .command("ask <question>")
  .description("Ask questions about repo")
  .action(ask);
program
  .command("doctor")
  .description("Run diagnostics")
  .action(doctor);
program
  .command("chat")
  .description("Interactive AI chat")
  .action(chat);
program
  .command("map")
  .description("Show project structure map")
  .action(map);
program
  .command("explain <file>")
  .description("Explain a file")
  .action(explain);
program
  .command("hello")
  .description("test command")
  .action(() => {
    console.log("DevSense is working 🚀");
  });

if (!process.argv.slice(2).length) {
  showWelcome();
  showTip();
} else {
  program.parse();
}