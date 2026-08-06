# Fantomas Tech — version Vercel

Archive complète du site Fantomas Tech, préparée pour Next.js et Vercel.

## Installation locale

```bash
npm install
npm run dev
```

## Déploiement

1. Décompressez l’archive.
2. Envoyez tous les fichiers dans la branche principale du dépôt Git connecté à Vercel.
3. Dans Vercel, ajoutez les variables indiquées dans `.env.example` via **Project Settings → Environment Variables**.
4. Lancez un nouveau déploiement.

La clé `service_role` de Supabase ne doit jamais être ajoutée aux variables publiques `NEXT_PUBLIC_*`.

Google Analytics, Microsoft Clarity et Search Console seront activés dans une prochaine version dès que leurs identifiants auront été fournis.
