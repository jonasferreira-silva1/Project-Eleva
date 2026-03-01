# 🛗 Project Eleva

### Onde a Matemática Encontra o Botão do Térreo

Simulador de escalonamento de elevadores com comparação de algoritmos (FIFO vs SCAN), métricas em tempo real e engine desacoplada.

---

## 📋 Sobre o Projeto

“Por que o elevador passou por mim e não parou?”

Essa pergunta simples esconde um dos problemas mais interessantes da computação: **escalonamento de recursos**.

O **Project Eleva** é um laboratório interativo que simula o comportamento de múltiplos elevadores em um prédio de 15 andares, permitindo comparar estratégias de decisão e visualizar métricas como tempo médio de espera, throughput e movimentação total.

O projeto transforma um problema do mundo real em uma análise prática de algoritmos clássicos aplicados a sistemas físicos.

---

## 🎯 Objetivo

Simular e comparar estratégias de atendimento de chamadas em um sistema com:

- 🏢 15 andares
- 🛗 3 elevadores
- 👥 Chamadas simultâneas
- 📊 Métricas em tempo real

O foco é demonstrar como diferentes algoritmos impactam:

- Tempo médio de espera
- Eficiência de movimentação
- Distribuição de carga
- Uso inteligente de recursos

---

## 🧠 Algoritmos Implementados

### 1️⃣ FIFO (First In, First Out)

**Estratégia:** Atende as chamadas na ordem de chegada.

**Vantagens:**

- Simples
- Justo (ordem cronológica)

**Desvantagens:**

- Pode causar movimentação desnecessária
- Ignora otimização por proximidade
- Pode aumentar o tempo médio de espera

---

### 2️⃣ SCAN (Elevator Algorithm)

Também conhecido como “Algoritmo do Elevador”.

**Estratégia:**
O elevador segue em uma direção atendendo todas as chamadas no caminho até o limite, depois inverte o sentido.

**Vantagens:**

- Minimiza cruzamentos desnecessários
- Reduz tempo médio de espera
- Otimiza fluxo contínuo
- Distribui melhor as requisições

---

## 🧮 Sistema de Pontuação (Score de Decisão)

Para definir qual elevador atenderá uma nova chamada, o sistema utiliza uma função de custo:

```
Score = |AndarAtual - AndarChamada|
        + PenalidadeDirecao
        + PenalidadeCarga
```

O elevador com o **menor Score** assume a requisição.

### Componentes

- **Distância**
  Diferença absoluta entre o andar atual e o andar da chamada.

- **Penalidade de Direção**
  Aplicada quando o elevador precisaria inverter sua rota atual.

- **Penalidade de Carga**
  Considera o número de paradas já agendadas para evitar sobrecarga.

---

## 🔬 Diferenciais Técnicos

### ⚔ Comparação A/B em Tempo Real

Execução paralela dos algoritmos (SCAN vs FIFO) com os mesmos passageiros.

### 📊 Métricas em Tempo Real

Dashboard com:

- Tempo médio de espera
- Total de andares percorridos
- Throughput
- Distribuição de carga

### ⏱ Sistema Baseado em Tick

Simulação controlada por intervalos (100ms – 1000ms), permitindo:

- Aceleração do tempo
- Testes de estresse
- Análises comparativas

### 🧠 Engine Desacoplada

Arquivo `elevator-engine.ts` totalmente independente da interface.

Benefícios:

- Fácil manutenção
- Testabilidade
- Escalabilidade
- Possibilidade de trocar UI sem alterar lógica

---

## 🛠 Stack Tecnológica

| Tecnologia   | Versão | Uso                                          |
| ------------ | ------ | -------------------------------------------- |
| Next.js      | 15     | Estrutura de rotas (App Router)              |
| React        | 19     | Interface reativa                            |
| TypeScript   | 5.7    | Tipagem forte e segurança matemática         |
| Tailwind CSS | 4      | Estilização responsiva                       |
| shadcn/ui    | -      | Componentes modernos com suporte a Dark Mode |
| pnpm         | -      | Gerenciador de dependências                  |

---

## 📦 Pré-requisitos

Antes de começar, verifique se possui instalado:

- Node.js 18+
- pnpm
- Git

---

## 🚀 Instalação e Execução

### 1. Clonar o repositório

```
git clone https://github.com/jonasferreira-silva1/Project-Eleva
cd Project-Eleva
```

### 2. Instalar dependências

```
pnpm install
```

### 3. Iniciar o projeto

```
pnpm dev
```

A aplicação estará disponível em:

```
http://localhost:3000
```

---

## 📊 Estrutura do Projeto

```
src/
├── app/                    # Rotas (Next.js App Router)
├── components/             # Componentes da interface
├── engine/
│   └── elevator-engine.ts  # Núcleo da simulação
├── hooks/                  # Hooks customizados
├── types/                  # Tipagens globais
└── utils/                  # Funções auxiliares
```

---

## 📈 Métricas Avaliadas

O sistema compara:

- Tempo médio de espera por passageiro
- Quantidade total de andares percorridos
- Distribuição de chamadas entre elevadores
- Eficiência por algoritmo

Essas métricas tornam visível o impacto direto da escolha algorítmica.

---

## 🧪 Casos de Uso

- Demonstração prática de algoritmos de escalonamento
- Estudos de estruturas de dados e otimização
- Visualização de impacto de decisões algorítmicas
- Laboratório educacional para ensino de SCAN vs FIFO

---

## 🏁 Conclusão

O Project Eleva demonstra que:

> A diferença entre um sistema funcional e um sistema excelente está na otimização.

Ao aplicar conceitos clássicos de escalonamento ao mundo físico dos elevadores, o projeto evidencia como decisões algorítmicas influenciam diretamente:

- Performance
- Consumo de recursos
- Experiência do usuário
- Eficiência sistêmica

Cada decisão inteligente economiza centenas — ou milhares — de “andares percorridos”.

---

## 👤 Autor

**Jonas Ferreira da Silva**

Projeto desenvolvido como laboratório de estudo e demonstração prática de algoritmos de escalonamento aplicados a sistemas do mundo real.
