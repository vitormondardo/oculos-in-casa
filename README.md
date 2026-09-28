# Óculos InCasa

Site institucional da **Óculos InCasa**, ótica com atendimento domiciliar.
Destaque para a experiência de óculos em 3D animada pelo scroll da página.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [React Three Fiber](https://r3f.docs.pmnd.rs) + [drei](https://github.com/pmndrs/drei) — cena 3D
- [Lenis](https://github.com/darkroomengineering/lenis) + [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) — scroll suave e progresso por seção
- [maath/easing](https://github.com/pmndrs/maath) — damping independente de framerate
- [zustand](https://github.com/pmndrs/zustand) — ponte de estado entre o DOM e o Canvas

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Estrutura

```
src/
  app/            # rotas (App Router)
  components/
    three/        # Canvas, cena, óculos procedural, viewer de produto
    sections/     # seções da home (Hero, Produto, Lentes, Serviços, ...)
    ui/           # componentes de interface (Header, Footer, botões)
  lib/
    scroll/       # Lenis + hook de trigger de seção
    store/        # store zustand da cena 3D
    three/        # poses/keyframes por seção
    whatsapp.ts   # geração de links wa.me
    seo.ts        # JSON-LD
  content/        # dados tipados: produtos, serviços, empresa
```

## Catálogo 3D

Os modelos de óculos hoje são **gerados por código**
(`ProceduralGlasses.tsx`), seguindo a convenção de nós
`frame / lens_L / lens_R / temple_L / temple_R`. Quando os modelos `.glb`
reais estiverem prontos, adicione o arquivo em `public/models/<slug>.glb`,
preencha `modelUrl` no produto correspondente (`src/content/products.ts`) e
troque `ProceduralGlasses` por um componente `GlassesModel` que carrega o GLB
via `useGLTF`, reaproveitando a mesma convenção de nomes para aplicar as
variantes de cor/material.

## Configuração pendente antes de publicar

- `src/content/company.ts`: número real de WhatsApp, e-mail, áreas atendidas.
- `src/lib/seo.ts`: `siteUrl` com o domínio definitivo.
- Vetorizar o logo (`public/brand/logo.jpg`) em SVG branco/preto e gerar
  favicon/ícones (`app/icon.png`, `apple-icon.png`) e imagem OG dedicada.
- Substituir os posters de produto (`poster` em `products.ts`), hoje
  apontando para o logo como placeholder.

## Build

```bash
npm run build
```

Gera todas as rotas estaticamente (SSG), incluindo `/produtos/[slug]` via
`generateStaticParams`.
