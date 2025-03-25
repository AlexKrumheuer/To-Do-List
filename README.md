# To-Do List Project

Este é um projeto simples desenvolvido utilizando **JavaScript, HTML e CSS**. Foi meu primeiro projeto dessa escala (embora não seja grande, levou um tempo para ser concluído) e foca exclusivamente no **front-end**.

Durante o desenvolvimento, experimentei algumas ideias, como o uso de **classes para criar janelas** (com `DisplayCreate` e `WindowCreate`) para simplificar o processo de codificação.

O projeto foi **inspirado, ainda que de forma distante, no aplicativo Microsoft To-Do List**.

No fim, este foi um projeto de teste. No futuro, conforme eu aprender novas ferramentas e técnicas, pretendo aprimorá-lo e transformá-lo em um site de **To-Do List realmente útil**.

---

## Notas sobre o site

O site foi projetado com **múltiplas seções** acessíveis via a barra lateral esquerda. No entanto, nesta primeira versão, decidi manter apenas a página de **Tarefas**.

Para os ícones, utilizei principalmente **Font Awesome**.

---

## Explicação sobre cada arquivo JS

### `dom.js`
Este arquivo contém **todas as declarações do DOM** usadas de forma geral nos outros arquivos. Talvez haja uma ou outra declaração de variável perdida em algum documento.

### `ui.js`
Guarda **todas as listas e maps** do projeto. Como é um projeto somente front-end, as tarefas são armazenadas em um **array normal**. Também utilizei um **map para os ícones** (`classImages.get(imageName)`) que retorna as duas classes do ícone (`c1` e `c2`).

Além disso, esse arquivo contém:
- Listas de tarefas
- Períodos disponíveis para programar uma tarefa
- Formas de aviso de tarefas
- Modos de repetição de tarefas

### `index.js`
Este é o **arquivo inicial** do site. Ele:
- Adiciona um **event listener** ao campo de input do nome da tarefa.
- Monitora quando algo é digitado e exibe as **opções de customização**.
- Garante que apenas a **lista** é obrigatória para cada tarefa, enquanto data, aviso e repetição são opcionais.

Também adiciona **event listeners** de clique aos elementos para gerenciar a interface e usa uma variável `static` dentro da classe `DisplayCreate` para evitar abertura de múltiplas janelas ao mesmo tempo.

Além disso, existe um **event listener global no body** para detectar cliques fora das janelas abertas e fechá-las automaticamente.

### `addTaskToMain.js`
Responsável por **controlar o aparecimento das opções de customização** das tarefas. Aqui:
- O display é criado usando `DisplayCreate`.
- Os elementos são gerados dinamicamente com `WindowCreate`.
- Cada opção é configurada, incluindo datas personalizadas com **Flatpickr**.

Possui lógica específica para elementos como **"Pick a Date"** e **"Pick a Date & Time"**, além de um sistema de **customização de repetição** de tarefas.

### `addTask.js`
Gerencia a adição de uma nova tarefa. Inclui:
- **Verificações** para evitar tarefas duplicadas ou sem nome.
- **Criação do objeto** da tarefa.
- **Event listener** para marcar a tarefa como concluída.
- **Atualização da interface** com os elementos criados.
- Sistema de **tarefas finalizadas**, que só exibe essa seção se houver pelo menos uma tarefa concluída.

### `sidebar.js`
Controla a **sidebar de edição das tarefas**, que aparece ao clicar com o **botão direito** em uma tarefa criada.

Principais funcionalidades:
- **Abrir e fechar a sidebar** corretamente.
- **Preencher os campos** com informações da tarefa selecionada.
- **Permitir edição de nome, datas, notas e repetição**.
- **Excluir uma tarefa**, com uma verificação antes da remoção.
- **Marcar a tarefa como concluída** e atualizar a interface.
- **Botões de salvar/cancelar** que atualizam os dados corretamente.

---

## Classes utilizadas

### `DisplayCreate.js`
Facilita a criação de elementos de interface de maneira dinâmica.
- Possui um **atributo static (`createdElement`)** para evitar múltiplas janelas abertas simultaneamente.
- Define elementos com **position absolute**.
- Métodos principais:
  - `positionNearButton()` - Posiciona o elemento perto do parent.
  - `getDomElement()` - Retorna o elemento HTML.
  - `closeWindow()` - Remove o elemento do DOM e ajusta a variável `createdElement`.
  - `addClass()` - Adiciona classes dinamicamente.

### `WindowCreate.js`
Cria elementos filhos dentro dos `DisplayCreate`, tornando o código mais modular.

### `Tasks.js`
Responsável por **criar objetos de tarefas** com as configurações selecionadas pelo usuário.

---

## Considerações finais
Este projeto é apenas um **protótipo inicial** e será aprimorado no futuro conforme eu aprender mais sobre **front-end, armazenamento de dados e back-end**.

Sugestões e feedbacks são sempre bem-vindos!

