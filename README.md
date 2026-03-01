🛗 Project Eleva
Onde a Matemática Encontra o Botão do Térreo

“Por que o elevador passou por mim e não parou?”
Essa pergunta simples esconde um dos problemas mais fascinantes da computação: escalonamento de recursos.

O Project Eleva é um laboratório interativo que transforma o caos logístico de elevadores em métricas visíveis, comparáveis e mensuráveis.

📖 A História — O Caos do Prédio de 15 Andares

Imagine que você é o engenheiro responsável por um prédio de alta rotatividade:

🏢 15 andares

🛗 3 elevadores

👥 Dezenas de chamadas simultâneas

O Dilema

Como decidir, em milissegundos, qual elevador deve atender cada chamada de forma eficiente?

Alguns problemas clássicos:

📍 Escolher sempre o mais perto pode gerar starvation (inanição) nos andares extremos.

📥 Atender por ordem de chegada (FIFO) faz os elevadores cruzarem o prédio inutilmente, desperdiçando tempo e energia.

Foi então que surgiu o insight:

Um elevador é uma implementação física de algoritmos clássicos de escalonamento — especialmente os algoritmos de varredura de disco.

🧠 A Lógica — Como os “Cérebros” Funcionam

O projeto implementa dois modelos de decisão para comparação direta.

1️⃣ FIFO — Justo, porém Ineficiente

First In, First Out

📌 Analogia:
Uma fila de banco. Quem chega primeiro é atendido primeiro.

📉 Problema:
O elevador pode estar no 2º andar, ser chamado no 14º e ignorar alguém no 5º que está exatamente no caminho.

✔ Democrático
✖ Logisticamente ineficiente

2️⃣ SCAN — Estratégico e Otimizado

Também conhecido como Elevator Algorithm.

📌 Analogia:
Um gari varrendo uma rua: ele segue em uma direção recolhendo tudo no caminho até o fim, e só então inverte o sentido.

📈 Vantagens:

Minimiza movimento desnecessário

Reduz tempo médio de espera

Evita cruzamentos constantes do prédio

Prioriza fluxo contínuo

No Project Eleva, o SCAN pondera:

Direção atual

Distância

Carga já agendada

🧮 O Cálculo do Score (Tomada de Decisão)

Para decidir qual elevador atende uma chamada, o sistema calcula um Score de custo:

Score = |AndarAtual - AndarChamada| + PenalidadeDirecao + PenalidadeCarga

O elevador com o menor Score vence a disputa.

Componentes do Score

📏 Distância
Diferença absoluta entre os andares.

🔄 Penalidade de Direção
Se o elevador está subindo e a chamada está abaixo dele, recebe um peso adicional — incentivando terminar sua rota atual antes de inverter.

📦 Penalidade de Carga
Cada parada já agendada adiciona custo, evitando sobrecarga enquanto outros elevadores estão ociosos.

🔬 Diferenciais Técnicos
Recurso O que é (Técnico) Por que importa (Humano)
⚔ Comparação A/B Execução paralela de estados Você vê o “duelo” entre SCAN e FIFO com os mesmos passageiros
📊 Métricas em Real Time Dashboard de throughput e tempo médio de espera Transforma código invisível em performance mensurável
⏱ Tick-based System Simulação por intervalos (100–1000ms) Permite acelerar o tempo para testes de estresse
🧠 Engine desacoplada elevator-engine.ts agnóstico à UI Permite testar, escalar e trocar interface sem afetar a lógica
🛠 Stack Tecnológica

⚡ Next.js 15 (App Router) — Estrutura de rotas moderna e alta performance

⚛ React 19 — UI reativa e gerenciamento avançado de estado

🧩 TypeScript 5.7 — Tipagem estrita para garantir integridade matemática

🎨 Tailwind CSS 4 — Estilização utilitária e responsiva

🧱 shadcn/ui — Componentes acessíveis e otimizados para Dark Mode

🚀 Como Rodar o Laboratório

# 1. Clone o repositório

git clone https://github.com/seu-usuario/project-eleva

# 2. Instale as dependências

pnpm install

# 3. Inicie o motor de simulação

pnpm dev

Acesse http://localhost:3000 no navegador.

🏁 Conclusão

O Project Eleva demonstra que:

A diferença entre um sistema funcional e um sistema excelente está na otimização.

O que começou como uma curiosidade sobre elevadores tornou-se um estudo profundo sobre:

Economia de movimento

Redução de tempo médio de espera

Distribuição inteligente de carga

Arquitetura desacoplada e escalável

Cada decisão algorítmica economiza centenas — ou milhares — de “andares percorridos”.
