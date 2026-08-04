# Trade Boom - Coding Style Guide

### 1. Absolute Path Imports
- Always resolve absolute imports using the `@/` prefix pointing to the source directory:
  - components: `@/components/...`
  - sections: `@/sections/...`
  - actions: `@/actions/...`
  - utils: `@/lib/utils`

### 2. Client & Server Directives
- Component files requiring state hooks, click actions, or animations must specify `'use client';` at the top of the file.
- Action handlers must contain `'use server';` at the top.

### 3. Strict TypeScript Types
- Avoid using `any` types for custom interfaces.
- Specify types for all props in custom components.
