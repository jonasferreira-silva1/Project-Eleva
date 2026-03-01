## 🛗 Projeto Eleva

Simulador de Escalonamento de Elevadores com Comparação Algorítmica em Tempo Real

Next.js · React · TypeScript · Tailwind · Vercel

## 📌 1. Contexto do Projeto

O Projeto Eleva foi desenvolvido para demonstrar, de forma prática e visual, como algoritmos clássicos de escalonamento impactam a eficiência de um sistema real.

A proposta parte de uma pergunta simples:

“Por que o elevador passou por mim e não parou?”

Por trás dessa situação cotidiana existe um problema clássico da computação: escalonamento de recursos.

O sistema simula múltiplos elevadores em um prédio de 15 andares e permite analisar, em tempo real, o impacto das decisões algorítmicas no desempenho operacional.

## 🎯 2. Problema Computacional

Sistemas de elevadores enfrentam desafios similares aos de sistemas operacionais:

Ordem de atendimento das requisições

Otimização de deslocamento

Balanceamento de carga

Redução de tempo de espera

Uso eficiente de recursos

Sem estratégia adequada, o sistema pode:

Aumentar deslocamentos desnecessários

Elevar o tempo médio de espera

Criar concentração de carga em um único elevador

Reduzir eficiência operacional

Solução: Implementação de um simulador com comparação A/B entre algoritmos clássicos para evidenciar o impacto real das decisões.

## 🧠 3. Algoritmos Implementados
## 1️⃣ FIFO (First In, First Out)

Estratégia:
Atender chamadas na ordem de chegada.

Características:

Implementação simples

Justiça cronológica

Não considera proximidade ou direção

Impacto:

Pode aumentar deslocamentos

Pode elevar tempo médio de espera

Baixa otimização espacial

## 2️⃣ SCAN (Algoritmo do Elevador)

Também conhecido como “Elevator Algorithm”.

Estratégia:
O elevador percorre uma direção atendendo todas as chamadas no trajeto até o limite e depois inverte o sentido.

Características:

Minimiza deslocamentos redundantes

Otimiza fluxo contínuo

Melhor balanceamento de chamadas

Impacto:

Reduz tempo médio de espera

Diminui movimentação desnecessária

Aumenta eficiência global

## 🧮 4. Sistema de Decisão

Para definir qual elevador atenderá uma nova chamada, o sistema utiliza uma função de custo:

Pontuação = |AndarAtual - AndarChamada|
            + PenalidadeDireção
            + PenalidadeCarga

O elevador com menor pontuação assume a requisição.

Componentes do Score

Distância: diferença absoluta entre andares

Penalidade de Direção: aplicada se houver necessidade de inverter o sentido

Penalidade de Carga: considera número de paradas já agendadas

Esse modelo simula heurísticas reais utilizadas em sistemas de controle.

## 📊 5. Métricas Avaliadas

O sistema compara automaticamente:

Tempo médio de espera por passageiro

Total de andares percorridos

Distribuição de chamadas entre elevadores

Eficiência comparativa por algoritmo

Essas métricas tornam explícito o impacto direto da escolha algorítmica.

## ✨ 6. Características Técnicas
## 🏗️ Arquitetura e Design

Motor de simulação desacoplado da interface

Separação clara entre lógica e visualização

Código fortemente tipado com TypeScript

Estrutura modular e escalável

## ⚔ Comparação A/B em Tempo Real

Execução paralela de FIFO e SCAN

Mesmos passageiros para ambos os algoritmos

Comparação direta de estatísticas

## ⏱ Sistema Baseado em Tick

Simulação controlada por intervalos configuráveis (100ms – 1000ms), permitindo:

Aceleração do tempo

Testes de estresse

Simulações comparativas

## 🧠 7. Motor de Simulação Desacoplado

Arquivo principal:

src/engine/elevator-engine.ts

Características:

Totalmente independente da interface

Reutilizável

Testável

Permite troca de UI sem alteração da lógica

## 🛠️ 8. Tecnologias Utilizadas

Next.js 15

React 19

TypeScript 5.7

Tailwind CSS 4

shadcn/ui

pnpm

Vercel (deploy)

## 🌐 9. Testar Online

Caso não queira rodar o projeto localmente, acesse a versão em produção:

## 👉 https://project-eleva.vercel.app

## 🚀 10. Como Executar
1. Clonar o repositório
git clone https://github.com/jonasferreira-silva1/Project-Eleva
cd Project-Eleva
2. Instalar dependências
pnpm install
3. Executar o projeto
pnpm dev

A aplicação estará disponível em:

http://localhost:3000


## 📁 11. Estrutura do Projeto

```bash
PROJECT-ELEVA/
├── .next/               # Build gerado automaticamente pelo Next.js
├── app/                 # Rotas e páginas (Next.js App Router)
├── components/          # Componentes reutilizáveis da interface
├── hooks/               # Hooks customizados do React
├── lib/                 # Lógica auxiliar, utilitários e funções de apoio
├── node_modules/        # Dependências instaladas pelo gerenciador de pacotes
├── public/              # Arquivos estáticos (imagens, ícones, etc.)
├── styles/              # Estilos globais e configurações CSS
│
├── .gitignore           # Arquivos e pastas ignorados pelo Git
├── components.json      # Configuração do shadcn/ui
├── next-env.d.ts        # Tipagens automáticas do Next.js
├── next.config.mjs      # Configuração do Next.js
├── package.json         # Dependências e scripts do projeto
├── pnpm-lock.yaml       # Lockfile do pnpm
├── postcss.config.mjs   # Configuração do PostCSS (Tailwind)
├── README.md            # Documentação do projeto
└── tsconfig.json        # Configuração do TypeScript
```



## 🧪 12. Casos de Uso

Demonstração prática de algoritmos de escalonamento

Ensino de estruturas de dados e otimização

Visualização comparativa de estratégias

Laboratório educacional interativo

## 🏁 13. Conclusão

O Projeto Eleva demonstra que:

A diferença entre um sistema funcional e um sistema excelente está na otimização.

Ao aplicar algoritmos clássicos a um sistema físico simulado, o projeto evidencia como decisões algorítmicas impactam diretamente:

## Desempenho

Consumo de recursos

Experiência do usuário

Eficiência sistêmica

Cada decisão inteligente pode economizar centenas — ou milhares — de andares percorridos.

## 🏆 14. Diferenciais do Projeto

Comparação algorítmica em tempo real

Motor desacoplado e reutilizável

Métricas atualizadas instantaneamente

Arquitetura escalável

Aplicação prática de conceitos clássicos de sistemas operacionais

## 👤 Autor

Jonas Ferreira da Silva

Projeto desenvolvido como laboratório de estudo e demonstração prática de algoritmos aplicados a sistemas do mundo real.
