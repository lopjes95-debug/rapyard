#!/usr/bin/env node
import { execSync } from 'node:child_process';

const cmd = process.argv[2];

if (cmd === 'dev') {
  execSync('pnpm dev', { stdio: 'inherit' });
} else if (cmd === 'build') {
  execSync('pnpm build', { stdio: 'inherit' });
} else if (cmd === 'doctor') {
  execSync('pnpm doctor', { stdio: 'inherit' });
} else {
  console.log('RapYard CLI (ry)');
  console.log('Commands: dev, build, doctor');
}
