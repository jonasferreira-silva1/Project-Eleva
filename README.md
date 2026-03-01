🛗 Projeto Eleva
Onde a Matemática Encontra o Botão do Térreo

Simulador de escalonamento de elevadores com comparação de algoritmos (FIFO vs SCAN), métricas em tempo real e motor de simulação desacoplado.

📋 Sobre o Projeto

“Por que o elevador passou por mim e não parou?”

Essa pergunta simples esconde um dos problemas mais interessantes da computação: escalonamento de recursos.

O Projeto Eleva é um laboratório interativo que simula o comportamento de múltiplos elevadores em um prédio de 15 andares, permitindo comparar estratégias de decisão e visualizar métricas como:

Tempo médio de espera

Throughput

Movimento total

Distribuição de carga

O projeto transforma um problema do mundo real em uma aplicação prática de algoritmos clássicos utilizados em sistemas operacionais e controle de recursos.

🌐 Testar Online

Se você não quiser rodar o projeto localmente, pode acessar a versão hospedada:

👉 Versão em produção:
https://project-eleva.vercel.app

🎯 Objetivo

Simular e comparar estratégias de atendimento em um sistema com:

🏢 15 andares

🛗 3 elevadores

👥 Chamadas simultâneas

📊 Métricas em tempo real

O foco é demonstrar como diferentes algoritmos impactam:

Tempo médio de espera

Eficiência de rotação

Distribuição de carga

Uso inteligente de recursos

🧠 Algoritmos Implementados
1️⃣ FIFO (First In, First Out)

Estratégia: Atender chamadas na ordem de chegada.

Vantagens:

Simples implementação

Justiça cronológica

Desvantagens:

Ignora proximidade

Pode aumentar o tempo médio de espera

Não otimiza deslocamento

2️⃣ SCAN (Algoritmo do Elevador)

Também conhecido como “Elevator Algorithm”.

Estratégia:
O elevador percorre uma direção atendendo todas as chamadas no caminho até o limite e, em seguida, inverte o sentido.

Vantagens:

Reduz deslocamentos desnecessários

Diminui o tempo médio de espera

Fluxo mais eficiente

Melhor distribuição de chamadas

🧮 Sistema de Decisão (Score)

Para definir qual elevador atenderá uma nova chamada, o sistema utiliza uma função de custo:

Score = |AndarAtual - AndarChamada|
        + PenalidadeDirecao
        + PenalidadeCarga

O elevador com menor score assume a requisição.

Componentes do Score

Distância: Diferença absoluta entre andares

Penalidade de Direção: Aplicada se for necessário inverter o sentido atual

Penalidade de Carga: Considera número de paradas já agendadas

🔬 Diferenciais Técnicos
⚔ Comparação A/B em Tempo Real

Execução paralela de FIFO e SCAN com os mesmos passageiros.

📊 Métricas em Tempo Real

Painel com:

Tempo médio de espera

Total de andares percorridos

Capacidade de processamento

Distribuição de carga

⏱ Sistema Baseado em Tick

Simulação controlada por intervalos configuráveis (100ms – 1000ms), permitindo:

Aceleração do tempo

Testes de estresse

Análises comparativas

🧠 Motor Desacoplado

O arquivo elevator-engine.ts é completamente independente da interface.

Benefícios:

Testabilidade

Escalabilidade

Manutenibilidade

Possibilidade de trocar a UI sem alterar a lógica

🛠 Stack Tecnológica
Tecnologia	Versão	Uso
Next.js	15	Estrutura e App Router
React	19	Interface reativa
TypeScript	5.7	Tipagem forte
Tailwind CSS	4	Estilização
shadcn/ui	—	Componentes modernos
pnpm	—	Gerenciador de pacotes
📦 Pré-requisitos

Node.js 18+

pnpm

Git

🚀 Instalação e Execução
1️⃣ Clonar o repositório
git clone https://github.com/jonasferreira-silva1/Project-Eleva
cd Project-Eleva
2️⃣ Instalar dependências
pnpm install
3️⃣ Rodar o projeto
pnpm dev

Acesse:

http://localhost:3000
📊 Estrutura do Projeto
src/
├── app/                    # Rotas (Next.js App Router)
├── components/             # Interface
├── engine/
│   └── elevator-engine.ts  # Núcleo da simulação
├── hooks/                  # Hooks customizados
├── types/                  # Tipagens
└── utils/                  # Funções auxiliares
📈 Métricas Avaliadas

Tempo médio de espera

Total de andares percorridos

Distribuição de chamadas

Eficiência comparativa por algoritmo

Essas métricas tornam explícito o impacto da escolha algorítmica.

🧪 Casos de Uso

Demonstração prática de algoritmos de escalonamento

Estudo de estruturas de dados

Ensino de SCAN vs FIFO

Visualização do impacto de decisões algorítmicas

🏁 Conclusão

O Projeto Eleva demonstra que:

A diferença entre um sistema funcional e um sistema excelente está na otimização.

Ao aplicar conceitos clássicos de escalonamento a um sistema físico simulado, o projeto evidencia como decisões algorítmicas influenciam diretamente:

Desempenho

Consumo de recursos

Experiência do usuário

Eficiência sistêmica

Cada decisão inteligente economiza dezenas — ou milhares — de andares percorridos.

👤 Autor

Jonas Ferreira da Silva

Projeto desenvolvido como laboratório de estudo e demonstração prática de algoritmos aplicados a sistemas do mundo real.
