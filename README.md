# which_carrier

Detect the shipping carrier from a tracking number. Data-driven, scalable to 200+ carriers.

## Install (Node/TS)

```bash
pnpm i which_carrier which_carrier-data
```

```ts
import { detect, load } from "which_carrier";
import { seedRules } from "which_carrier-data";
load(seedRules);
const res = detect("1Z2869Y60397722027");
console.log(res.primary); // { slug: 'ups', score: ... }
```

## CLI (language-agnostic)

```bash
pnpm -w i && pnpm build
which-carrier 1Z2869Y60397722027 --json
```
