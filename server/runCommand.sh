#!/bin/bash
ts-node -r tsconfig-paths/register --transpile-only src/command/$1
