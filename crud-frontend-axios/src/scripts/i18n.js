export const translations = {
  pt: {
    'nav.product': 'Produto', 'nav.methods': 'Métodos',
    'actions.freeTrial': 'Testar grátis', 'actions.startLab': 'Começar laboratório', 'actions.howItWorks': 'Ver como funciona', 'actions.openLab': 'Abrir laboratório', 'actions.explore': 'Explorar →',
    'hero.title1': 'Use uma aplicação real.', 'hero.title2': 'Entenda o HTTP acontecendo.', 'hero.description': 'Escolha um CRUD, crie registros e acompanhe o método, endpoint, corpo e resposta de cada requisição.',
    'trusted.label': 'Uma experiência prática com',
    'visual.frontend': 'Frontend', 'visual.backend': 'Backend', 'visual.persistence': 'Persistência', 'visual.fetch': 'consulta', 'visual.created': 'criado',
    'product.eyebrow': 'Escolha o seu cenário', 'product.title': 'Um laboratório, cinco aplicações.', 'product.description': 'Produtos, usuários, tarefas, chamados ou clientes. A interface muda, mas a arquitetura HTTP continua clara e consistente.',
    'methods.eyebrow': 'Aprendizado contextual', 'methods.title': 'Você aprende sem interromper o uso.', 'methods.description': 'O painel técnico aparece ao lado da aplicação e explica apenas o necessário.', 'methods.get': 'consulta dados', 'methods.post': 'cria um registro', 'methods.update': 'atualiza dados', 'methods.delete': 'remove um registro',
    'cta.eyebrow': 'Pronto para testar?', 'cta.title': 'Escolha um CRUD e veja a API em ação.',
    'modal.eyebrow': 'Escolha uma experiência', 'modal.title': 'Qual CRUD você quer testar?',
    'lab.back': '← Voltar', 'lab.active': 'Laboratório ativo', 'lab.change': 'Trocar CRUD', 'lab.newRecord': 'Novo registro', 'lab.cancelEdit': 'Cancelar edição', 'lab.createRecord': 'Criar registro', 'lab.currentData': 'Dados atuais', 'lab.refresh': 'Atualizar', 'lab.whatHappened': 'O que aconteceu', 'lab.status': 'Status', 'lab.waiting': 'Aguardando', 'lab.explanationDefault': 'Execute uma ação para acompanhar a comunicação entre frontend e API.', 'lab.request': 'Request', 'lab.response': 'Response',
    'resources.products.label': 'Produtos', 'resources.products.card': 'Nome, preço e estoque.',
    'resources.users.label': 'Usuários', 'resources.users.card': 'Nome, e-mail e função.',
    'resources.tasks.label': 'Tarefas', 'resources.tasks.card': 'Título, status e prioridade.',
    'resources.tickets.label': 'Chamados', 'resources.tickets.card': 'Assunto, categoria e status.',
    'resources.clients.label': 'Clientes', 'resources.clients.card': 'Nome, empresa e e-mail.'
  },
  en: {
    'nav.product': 'Product', 'nav.methods': 'Methods',
    'actions.freeTrial': 'Try for free', 'actions.startLab': 'Start laboratory', 'actions.howItWorks': 'See how it works', 'actions.openLab': 'Open laboratory', 'actions.explore': 'Explore →',
    'hero.title1': 'Use a real application.', 'hero.title2': 'See HTTP in action.', 'hero.description': 'Choose a CRUD, create records and follow the method, endpoint, body and response of every request.',
    'trusted.label': 'A practical experience with',
    'visual.frontend': 'Frontend', 'visual.backend': 'Backend', 'visual.persistence': 'Persistence', 'visual.fetch': 'request', 'visual.created': 'created',
    'product.eyebrow': 'Choose your scenario', 'product.title': 'One laboratory, five applications.', 'product.description': 'Products, users, tasks, tickets or clients. The interface changes, but the HTTP architecture remains clear and consistent.',
    'methods.eyebrow': 'Contextual learning', 'methods.title': 'Learn without interrupting the experience.', 'methods.description': 'The technical panel appears beside the application and explains only what matters.', 'methods.get': 'retrieves data', 'methods.post': 'creates a record', 'methods.update': 'updates data', 'methods.delete': 'removes a record',
    'cta.eyebrow': 'Ready to try?', 'cta.title': 'Choose a CRUD and see the API in action.',
    'modal.eyebrow': 'Choose an experience', 'modal.title': 'Which CRUD do you want to try?',
    'lab.back': '← Back', 'lab.active': 'Active laboratory', 'lab.change': 'Change CRUD', 'lab.newRecord': 'New record', 'lab.cancelEdit': 'Cancel editing', 'lab.createRecord': 'Create record', 'lab.currentData': 'Current data', 'lab.refresh': 'Refresh', 'lab.whatHappened': 'What happened', 'lab.status': 'Status', 'lab.waiting': 'Waiting', 'lab.explanationDefault': 'Perform an action to follow the communication between frontend and API.', 'lab.request': 'Request', 'lab.response': 'Response',
    'resources.products.label': 'Products', 'resources.products.card': 'Name, price and stock.',
    'resources.users.label': 'Users', 'resources.users.card': 'Name, email and role.',
    'resources.tasks.label': 'Tasks', 'resources.tasks.card': 'Title, status and priority.',
    'resources.tickets.label': 'Tickets', 'resources.tickets.card': 'Subject, category and status.',
    'resources.clients.label': 'Clients', 'resources.clients.card': 'Name, company and email.'
  }
};

export function applyTranslations(language) {
  const dictionary = translations[language] || translations.pt;
  document.documentElement.lang = language === 'en' ? 'en' : 'pt-BR';
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const value = dictionary[element.dataset.i18n];
    if (value !== undefined) element.textContent = value;
  });
}
