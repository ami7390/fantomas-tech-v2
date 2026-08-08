# Fantomas Tech — version Vercel

## Produits, images et messages Supabase

1. Exécutez `supabase/migrations/001_products.sql`, puis `supabase/migrations/002_contact_messages.sql` dans l’éditeur SQL de Supabase.
2. Dans `/admin`, choisissez une catégorie existante ou saisissez-en une nouvelle. L’image locale est envoyée vers le bucket `product-images`.
3. La page `/contact` enregistre les demandes dans Supabase. Elles apparaissent dans l’onglet Messages de `/admin`.

## Fiches produits et mobile

- Chaque bouton `+` de la boutique ouvre maintenant `/boutique/[slug]` avec la description, les avantages, les usages, les informations essentielles et les actions panier/WhatsApp.
- Les fiches lisent les informations depuis Supabase et complètent automatiquement les descriptions trop courtes selon la catégorie.
- L’interface mobile utilise des cartes compactes, des zones tactiles plus grandes, un menu plus lisible et un Hero optimisé pour améliorer le LCP.

Configurez `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` dans Vercel. N’utilisez jamais une clé `service_role` dans une variable publique.

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

## Activation de Supabase et de l’administration

1. Ouvrez Supabase puis **SQL Editor**.
2. Copiez tout le contenu de `supabase/migrations/001_products.sql` et exécutez-le.
3. Dans **Authentication → Users**, créez l’utilisateur qui administrera le catalogue.
4. Retournez dans SQL Editor et exécutez la dernière commande commentée du fichier SQL après avoir remplacé l’adresse e-mail.
5. Dans Vercel, ajoutez `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
6. Redéployez puis ouvrez `/admin`.
7. Connectez-vous et cliquez sur **Importer les 47 produits** une seule fois.

La page `/admin` permet ensuite d’ajouter, modifier, masquer et supprimer des produits, ainsi que de charger leurs images.

## Analytics et Clarity

Ajoutez dans Vercel :

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` avec l’identifiant `G-XXXXXXXXXX` ;
- `NEXT_PUBLIC_CLARITY_PROJECT_ID` avec le Project ID Clarity.

Les scripts ne sont chargés que lorsque ces variables sont renseignées.
