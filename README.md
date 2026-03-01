🛗 Projeto Eleva

Simulador de Escalonamento de Elevadores com Comparação Algorítmica em Tempo Real

Next.js · React · TypeScript · Tailwind · Vercel

📋 Sobre o Projeto

O Projeto Eleva é um simulador interativo de escalonamento de elevadores que compara, em tempo real, algoritmos clássicos de decisão aplicados a um sistema físico simulado.

A proposta parte de uma pergunta simples:

“Por que o elevador passou por mim e não parou?”

Por trás dessa situação cotidiana existe um problema clássico da computação: escalonamento de recursos.

O projeto simula múltiplos elevadores em um prédio de 15 andares e mede o impacto direto das decisões algorítmicas em métricas como:

Tempo médio de espera

Total de andares percorridos

Eficiência operacional

Distribuição de carga

Capacidade de processamento

🌐 Testar Online

Caso não queira rodar o projeto localmente, você pode acessar a versão em produção:

👉 Versão hospedada:
https://project-eleva.vercel.app

🎯 Objetivo do Projeto

Demonstrar, de forma prática e visual, como diferentes estratégias de escalonamento impactam a eficiência de um sistema com:

🏢 15 andares

🛗 3 elevadores

👥 Chamadas simultâneas

📊 Métricas atualizadas em tempo real

O foco é evidenciar como decisões algorítmicas influenciam:

Tempo médio de espera

Uso de recursos

Deslocamento total

Balanceamento de carga

🧠 Algoritmos Implementados
1️⃣ FIFO (First In, First Out)

Estratégia: Atender chamadas na ordem de chegada.

Características:

Implementação simples

Justiça cronológica

Não considera proximidade ou direção

Impacto:

Pode aumentar deslocamentos desnecessários

Pode elevar o tempo médio de espera

2️⃣ SCAN (Elevator Algorithm)

Também conhecido como “Algoritmo do Elevador”.

Estratégia:
O elevador percorre uma direção atendendo todas as chamadas no trajeto até o limite, e então inverte o sentido.

Características:

Minimiza deslocamentos redundantes

Otimiza fluxo contínuo

Reduz tempo médio de espera

🧮 Sistema de Decisão (Função de Custo)

Para definir qual elevador atenderá uma nova chamada, o sistema utiliza uma função de score:

Score = |AndarAtual - AndarChamada|
        + PenalidadeDirecao
        + PenalidadeCarga

O elevador com menor score assume a requisição.

Componentes do Score

Distância: Diferença absoluta entre andares

Penalidade de Direção: Aplicada quando há necessidade de inverter o sentido atual

Penalidade de Carga: Considera o número de paradas já agendadas

✨ Características Principais
🏗️ Arquitetura e Design

✅ Motor de simulação desacoplado da interface
✅ Separação clara entre lógica e visualização
✅ Código fortemente tipado com TypeScript
✅ Estrutura modular e escalável

⚔ Comparação A/B em Tempo Real

✅ Execução paralela de FIFO e SCAN
✅ Mesmos passageiros para ambos os algoritmos
✅ Comparação direta de métricas

📊 Métricas em Tempo Real

✅ Tempo médio de espera
✅ Total de andares percorridos
✅ Distribuição de chamadas
✅ Eficiência por algoritmo

⏱ Sistema Baseado em Tick

Simulação controlada por intervalos configuráveis (100ms – 1000ms), permitindo:

Aceleração do tempo

Testes de estresse

Simulações comparativas

🧠 Motor de Simulação Desacoplado

Arquivo principal:

engine/elevator-engine.ts

Características:

Totalmente independente da interface

Reutilizável

Testável

Permite troca de UI sem alteração da lógica

🛠️ Pilha Tecnológica
Tecnologia	Versão	Uso
Next.js	15	Estrutura e App Router
React	19	Interface reativa
TypeScript	5.7	Tipagem forte e segurança
Tailwind CSS	4	Estilização responsiva
shadcn/ui	—	Componentes modernos
pnpm	—	Gerenciador de pacotes
Vercel	—	Hospedagem e deploy
📦 Pré-requisitos

Antes de iniciar, verifique se possui instalado:

Node.js 18+

pnpm

Git

🚀 Instalação e Execução
1. Clonar o repositório
git clone https://github.com/jonasferreira-silva1/Project-Eleva
cd Project-Eleva
2. Instalar dependências
pnpm install
3. Executar o projeto
pnpm dev

A aplicação estará disponível em:

http://localhost:3000
📁 Estrutura do Projeto
src/
├── app/                    # Rotas (Next.js App Router)
├── components/             # Interface e visualização
├── engine/
│   └── elevator-engine.ts  # Núcleo da simulação
├── hooks/                  # Hooks customizados
├── types/                  # Tipagens globais
└── utils/                  # Funções auxiliares
📊 Métricas Avaliadas

O sistema compara automaticamente:

Tempo médio de espera por passageiro

Total de andares percorridos

Distribuição de chamadas entre elevadores

Eficiência geral por algoritmo

Essas métricas tornam explícito o impacto direto da escolha algorítmica.

🧪 Casos de Uso

Demonstração prática de algoritmos de escalonamento

Ensino de estruturas de dados e otimização

Visualização comparativa de estratégias

Laboratório educacional interativo

🏁 Conclusão

O Projeto Eleva demonstra que:

A diferença entre um sistema funcional e um sistema excelente está na otimização.

Ao aplicar algoritmos clássicos a um sistema físico simulado, o projeto evidencia como decisões algorítmicas impactam diretamente:

Desempenho

Consumo de recursos

Experiência do usuário

Eficiência sistêmica

Cada decisão inteligente pode economizar centenas — ou milhares — de andares percorridos.

🏆 Diferenciais do Projeto

1️⃣ Comparação algorítmica em tempo real
2️⃣ Motor desacoplado e reutilizável
3️⃣ Métricas visuais imediatas
4️⃣ Arquitetura escalável
5️⃣ Aplicação prática de conceitos clássicos de sistemas operacionais

👤 Autor

Jonas Ferreira da Silva

Projeto desenvolvido como laboratório de estudo e demonstração prática de algoritmos aplicados a sistemas do mundo real.
