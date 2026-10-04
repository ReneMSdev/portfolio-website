# LinkLeaf: portfolio entry handoff

Produced from `ReneMSdev/linkleaf-mono` (branch `working`, 2026-09-29), following
`docs/portfolio-handoff.md`. The screenshot that came with it now lives at
`public/img/linkleaf/linkleaf-1.jpg`; the duplicate here was removed on 2026-09-30.

## 1. The entry

```ts
{
  slug: 'linkleaf',
  title: 'LinkLeaf',
  status: 'Paused',
  summary:
    'A digital business card shared by QR code: a tested FastAPI backend with auth and subscriptions, plus a Flutter app prototype.',
  description:
    'LinkLeaf was a real product attempt: a digital business card you share through a QR code or profile link, with free and premium tiers. It was paused before launch over doubts about the market. The backend is the finished part, a FastAPI API for profiles, links, contact cards, media uploads, themes and subscriptions, with its test suite running in GitHub Actions. On the mobile side, the Flutter app is a UI prototype that runs on mock data and was never connected to the API. Nothing is deployed, so this is an architecture case study rather than a demo.',
  stack: [
    'Python 3.12',
    'FastAPI',
    'SQLAlchemy 2 (async)',
    'PostgreSQL 16',
    'Alembic',
    'Pydantic v2',
    'Firebase Auth',
    'Google Cloud Storage',
    'RevenueCat',
    'Pillow',
    'structlog',
    'pytest',
    'GitHub Actions',
    'Docker',
    'Flutter',
    'Dart 3',
  ],
  metrics: [
    { label: 'Tests passing', value: '133' },
    { label: 'API endpoints', value: '32' },
  ],
  images: ['/img/linkleaf/linkleaf-1.jpg'],
  architectureDiagrams: [
    {
      title: 'System overview',
      chart: `flowchart LR
  app["Flutter app<br/>(UI prototype, mock data)"]:::client
  visitor["Visitor's phone<br/>(scans QR code)"]:::client

  subgraph api["FastAPI backend (modular monolith)"]
    routers["api/<br/>(routers: /v1 + public<br/>/p, /q, vCard, theme preview)"]
    domain["domain/<br/>(user, profile, link, contact,<br/>media, theme, subscription)"]
    core["core/<br/>(db session, storage, image processing)"]
    authdep["auth/<br/>(token check, UID allowlist)"]
    routers --> domain --> core
    routers --> authdep
  end

  firebase["Firebase Auth"]:::external
  revenuecat["RevenueCat"]:::external
  pg[("PostgreSQL 16")]:::storage
  gcspub[("GCS public bucket<br/>(avatars, images)")]:::storage
  gcspriv[("GCS private bucket<br/>(resumes)")]:::storage

  app -. "Bearer ID token (not wired yet)" .-> routers
  app -. "sign in (not wired yet)" .-> firebase
  visitor -- "/q/{token}, /p/{slug}, vCard" --> routers
  authdep -- "verify ID token" --> firebase
  revenuecat -- "subscription webhook" --> routers
  core --> pg
  core --> gcspub
  core -- "signed URLs" --> gcspriv

  classDef external fill:#2a1f14,stroke:#e8a659,color:#f2f2f0
  classDef storage fill:#16202a,stroke:#7ea6c9,color:#f2f2f0
  classDef client fill:#1f1a2a,stroke:#a78bfa,color:#f2f2f0`,
    },
    {
      title: 'Authentication and first login',
      chart: `sequenceDiagram
  participant App as Flutter app
  participant API as FastAPI (auth/dependencies.py)
  participant DB as PostgreSQL
  rect rgb(42, 31, 20)
    Note over App,Firebase: planned, not wired in the app yet
    App->>Firebase: sign in
    Firebase-->>App: ID token
  end
  App->>API: request with Authorization: Bearer <token>
  rect rgb(42, 31, 20)
    API->>Firebase: verify_id_token (Admin SDK)
    Firebase-->>API: uid, email
  end
  alt UID not in ALLOWED_FIREBASE_UIDS
    API-->>App: 403 (or anonymous on optional-auth routes)
  else allowed
    API->>DB: find user by firebase_uid
    opt first login
      API->>DB: create user + free subscription
    end
    API-->>App: response
    API--)DB: background task: update last_login_at
  end`,
    },
    {
      title: 'QR scan, public profile and Save Contact',
      chart: `sequenceDiagram
  participant V as Visitor's phone
  participant API as FastAPI (public routes)
  participant DB as PostgreSQL
  V->>API: GET /q/{qr_token}
  API->>DB: active profile with this token?
  API-->>V: 302 → /p/{current slug}
  V->>API: GET /p/{slug}
  API->>DB: active profile with this slug?
  alt found
    API->>DB: load links, contact, public media, theme
    API-->>V: ProfilePublic JSON (is_premium, has_sensitive_data)
    API--)DB: background task: view_count + 1 (skipped for the owner)
  else not found, but slug is in slug_history
    API-->>V: 301 → /p/{new slug}
  end
  V->>API: GET /contacts/{profile_id}/vcard
  API-->>V: {slug}.vcf (vCard 3.0, branding note on free tier)`,
    },
    {
      title: 'Subscription lifecycle (RevenueCat webhook)',
      chart: `flowchart TD
  hook["POST /v1/subscriptions/webhook"] --> secret{"secret valid?"}
  secret -- no --> r401["401"]
  secret -- yes --> parse{"known event,<br/>known user?"}
  parse -- no --> ignored["200 ignored"]
  parse -- "INITIAL_PURCHASE / RENEWAL /<br/>RESTORE / PRODUCT_CHANGE" --> active["premium, active"]
  parse -- "CANCELLATION / BILLING_ISSUE" --> cancelled["premium, cancelled<br/>(access kept until expiry)"]
  parse -- EXPIRATION --> expired["free, expired"]
  expired --> c1["soft-delete portfolio images<br/>and resumes on non-default profiles"]
  c1 --> c2["soft-delete non-default profiles"]
  c2 --> c3["soft-delete portfolio images<br/>and resume on the default profile"]
  c3 --> grace[("30-day grace period:<br/>owner can restore")]:::storage
  active --> ok["200"]
  cancelled --> ok
  grace --> ok

  classDef storage fill:#16202a,stroke:#7ea6c9,color:#f2f2f0`,
    },
  ],
  architectureNote: [
    'The backend is a modular monolith: routers, domain services, and a shared core layer for the database, file storage and image processing. Domains are meant to reach each other only through service functions, and the code mostly follows that, though a few services still query other domains\' models directly.',
    'Identity and billing are bought rather than built. Firebase handles sign-in and RevenueCat handles app-store subscriptions, while the backend keeps the rules: it verifies Firebase tokens, only lets allowlisted accounts in, creates a user with a free subscription on first login, and turns RevenueCat webhooks into plan changes. When premium expires, extra profiles, portfolio images and resumes are soft-deleted and stay restorable for 30 days.',
    'Printed QR codes point at a permanent token instead of the profile\'s slug. The token redirects to whatever the slug is now, and old slugs answer with 301 redirects, so renaming a profile never breaks a card that has already been handed out.',
  ],
  lessonsLearned:
    'Most of what I took from LinkLeaf came from attempting a real production backend, with user auth, subscriptions and data management to get right. A lot of research went into the architecture: deciding which services to build in house and which to hand to third parties, which is how Firebase ended up handling authentication and RevenueCat handling app-store billing, and weighing the pros and cons of each technology decision. It was also the first project I built with a full test suite running in GitHub Actions CI and configuration for separate development, staging and production environments, even though only development ever ran.',
  // Alternative lessonsLearned (option B, a concrete bug and its fix). René wants both kept
  // separate, not combined; pick one when reviewing. Sources are in section 4.
  // lessonsLearned:
  //   'A bug early on showed me why naming rules matter. The user service had a function called `update`, which quietly replaced SQLAlchemy\'s `update` imported at the top of the same file. When the background task that records each user\'s last login called `update(User)`, it expected SQLAlchemy and got my own function instead. Because it ran after the response was sent, no error ever reached the app, and last-login times simply never saved. The fix was renaming it to `update_user`, adding error output to the background task, and making "never name a service function plain `update` or `delete`" a project rule.',
  codeUrl: 'https://github.com/ReneMSdev/linkleaf-mono',
}
```

## 2. Sources

| Claim | Backed by |
|---|---|
| Real product attempt; paused over market doubts | René said so (2026-09-29) |
| Lessons learned: attempting a real production backend, architecture research, build-in-house vs third-party (Firebase, RevenueCat), weighing each technology decision, first project with a full test suite, CI and dev/staging/prod environments | René said so (2026-09-29). CI: `.github/workflows/backend.yml`. Environments: `AppEnv` (development/test/staging/production) in `backend/app/config/settings.py`, and `.env.dev/.staging/.prod` in `mobile/.env.example` |
| "Only development ever ran" / nothing deployed | René said so; the old repo's `deploy.yml` was a stub that only echoed text |
| 133 tests passing | GitHub Actions run 36531743990 at `905a8f1`: "133 passed", coverage 64.55% (2026-09-29); also run locally the same day |
| 32 API endpoints | Counted from the app: `APIRoute`s in `app.main:app` = 33, minus `/health` |
| Stack | `backend/requirements-prod.txt` (fastapi, sqlalchemy 2.0, asyncpg, alembic, pydantic 2, firebase-admin, google-cloud-storage, Pillow, structlog), `requirements-dev.txt` (pytest), `backend/Dockerfile` (python:3.12-slim), CI (Postgres 16, Python 3.12), `mobile/pubspec.yaml` (Flutter, Dart SDK ^3.11). RevenueCat has no SDK dependency; it's integrated through the webhook handler in `backend/app/api/subscriptions.py` |
| Modular monolith; intended layering with exceptions | `backend/app/` layout (`api/`, `domain/`, `core/`). Exceptions: e.g. `domain/subscription/service.py`, `domain/contact/service.py`, `domain/media/service.py` import other domains' models; `api/profiles.py` and `api/contacts.py` run some queries directly |
| Token verification, allowlist, auto-provision with free subscription, background last-login | `backend/app/auth/dependencies.py`, `backend/app/domain/user/service.py` (`create_from_firebase`) |
| QR token 302; slug lookup, then slug history 301; view count skipped for owner | `backend/app/api/profiles.py` (`qr_redirect`, `get_public_profile`), `backend/app/domain/profile/service.py` (`get_public`) |
| vCard 3.0, `{slug}.vcf`, branding note on free tier | `backend/app/api/contacts.py`, `backend/app/domain/contact/service.py` |
| Webhook event mapping, 401 on bad secret, 200 ignored, expiration cascade (portfolio images and resumes, then extra profiles) | `backend/app/api/subscriptions.py` (`EVENT_MAP`, handler), `domain/media/service.py` (`soft_delete_excess_media`: IMAGE and RESUME only) |
| 30-day restore window | `GRACE_PERIOD_DAYS = 30` in `backend/app/core/types.py`; restore endpoints in `api/profiles.py` and `api/media.py` |
| Public and private buckets, signed URLs | `backend/app/core/storage.py`, `backend/app/config/settings.py` |
| Flutter app is a UI prototype on mock data | Mock constants in `mobile/lib/screens/home/widgets/card_sheet.dart`; three providers are empty and `SubscriptionProvider` only holds a local tier flag; `api_service.dart` is referenced nowhere else |
| Screenshot | Flutter web release build of `mobile/`, rendered in headless Chrome at 390×844 @3x, composited to 1600×900 |
| Repo is safe to link | `gitleaks detect --log-opts=--all`: 134 commits scanned, 3 findings, all false positives (CocoaPods `SPEC CHECKSUMS` in `mobile/ios/Podfile.lock`, public SHA-1 hashes flagged because the pod names contain "Auth"). Repo made public by René on 2026-09-29 |

## 3. Unverified or illustrative

- **The screenshot shows placeholder data**, not a real account: the name "René Villanueva", "Salo Labs", a 555 phone number and an `example.com` email come from the mock constants in `card_sheet.dart`. It combines three screens (home, edit mode, public-profile preview) side by side on a dark background; it isn't a single device capture.
- **The auth diagram's first two steps (the app signing in with Firebase) are the planned flow, not working code.** The diagram marks them with a "planned, not wired in the app yet" note. Everything from the Bearer-token request onward is traced from the backend code.
- **The RevenueCat and Firebase integrations were never run against the real services.** Tests mock token verification and storage, and the webhook tests post fake events. The logic is tested; the live integrations are not.
- **Coverage (64.55%) may be under-counted.** Some tested async paths show as uncovered, so it isn't used as a metric.
- **New diagram class:** the overview adds `classDef client fill:#1f1a2a,stroke:#a78bfa,color:#f2f2f0` (muted purple) for the mobile app and the visitor's phone, since neither `external` nor `storage` fits. Swap it if the portfolio has a preferred color.
- **Diagram simplifications:** the subscription diagram leaves out one path (if the expiration cleanup fails, the handler returns `200 ignored` after the plan has already changed). All four diagrams were checked with `@mermaid-js/mermaid-cli` 11: they parse and render.

## 4. Open questions for René

1. **Lessons learned: resolved 2026-09-30.** René chose to show both, as two separate paragraphs (A, then B); see `docs/decisions.md` in the portfolio repo. Original note: René's decision (2026-09-29): keep both, don't combine them, and choose during the portfolio review. Option A (active in the entry) follows what René said: the architecture research, build-in-house vs third-party, the first full test suite and CI. It's closer to a reflection than the brief's "concrete problem and fix". Option B (commented out below it in the entry) is a concrete bug from the git history:

   > A bug early on showed me why naming rules matter. The user service had a function called `update`, which quietly replaced SQLAlchemy's `update` imported at the top of the same file. When the background task that records each user's last login called `update(User)`, it expected SQLAlchemy and got my own function instead. Because it ran after the response was sent, no error ever reached the app, and last-login times simply never saved. The fix was renaming it to `update_user`, adding error output to the background task, and making "never name a service function plain `update` or `delete`" a project rule.

   Sources: commit `21b47bd` (2026-03-21), "fixed name shadowing bug preventing last login data for user"; before it, `backend/app/domain/user/service.py` had `from sqlalchemy import select, update` (line 11), `async def update(` (line 128) and `update(User)` inside `update_last_login` (line 181). The naming rule was added three days later in the original `qr_backend` repo (commit `46c259b`, "avoid repeat name shadowing bugs"). The "error output" was `print()` statements.
2. **"Phone-contact syncing" from the brief isn't in the code.** What exists is a public vCard download ("Save Contact"), which the entry describes. If contact syncing was planned, it could be mentioned as unbuilt scope.
3. **Metrics: decided.** René chose to keep both tiles (133 tests, 32 endpoints).
4. **Status label:** `Paused`. The brief allows `Not live` too, but `Paused` matches what you said.

## 5. Changes made to the LinkLeaf repo

- Added `ARCHITECTURE.md` with the four diagrams above, linked from `README.md`.
- Clarified the layering rule in `backend/CLAUDE.md`: it's the intended rule, and existing code has exceptions.
- Earlier the same day: root `README.md`, CI that runs with fake credentials (no secrets needed), and a Firebase UID allowlist for the API (`ALLOWED_FIREBASE_UIDS`).
- Ran migrations and the theme seed on the local dev database to confirm the backend starts and serves requests. No files changed.
- **Cleanup suggested but not done yet (the brief says to ask first):**
  - leftover `print()` debug lines in `backend/app/auth/dependencies.py`
  - the empty `organization` domain scaffold
  - the empty `mobile/test/widget_test.dart` and `mobile/analysis_options.yaml`
  - the unused `AppConstants.baseUrl` in `mobile/lib/core/constants.dart`
  - the Flutter boilerplate in `mobile/README.md`
- **Bug found during verification, not fixed:** restoring a soft-deleted profile or media item doesn't check the plan, so a user who dropped to free could restore premium content (`profile/service.py` `restore`, `media/service.py` `restore_media`). Added to the LinkLeaf TODO.
