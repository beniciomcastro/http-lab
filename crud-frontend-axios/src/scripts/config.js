export const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api').replace(/\/$/, '');
export const API_BASE_URL = API_URL.replace(/\/api$/, '');

const resourceContent = {
  pt: {
    products: { label: 'Produtos', singular: 'Produto', description: 'Gerencie catálogo, preço e estoque.', fields: [['name','Nome','text'],['price','Preço','number','0.01'],['stock','Estoque','number','1']] },
    users: { label: 'Usuários', singular: 'Usuário', description: 'Cadastre pessoas e suas funções.', fields: [['name','Nome','text'],['email','E-mail','email'],['role','Função','text']] },
    tasks: { label: 'Tarefas', singular: 'Tarefa', description: 'Organize atividades e prioridades.', fields: [['title','Título','text'],['status','Status','text'],['priority','Prioridade','text']] },
    tickets: { label: 'Chamados', singular: 'Chamado', description: 'Registre demandas e acompanhe status.', fields: [['subject','Assunto','text'],['category','Categoria','text'],['status','Status','text']] },
    clients: { label: 'Clientes', singular: 'Cliente', description: 'Organize contatos e empresas.', fields: [['name','Nome','text'],['company','Empresa','text'],['email','E-mail','email']] }
  },
  en: {
    products: { label: 'Products', singular: 'Product', description: 'Manage catalog, price and stock.', fields: [['name','Name','text'],['price','Price','number','0.01'],['stock','Stock','number','1']] },
    users: { label: 'Users', singular: 'User', description: 'Register people and their roles.', fields: [['name','Name','text'],['email','Email','email'],['role','Role','text']] },
    tasks: { label: 'Tasks', singular: 'Task', description: 'Organize activities and priorities.', fields: [['title','Title','text'],['status','Status','text'],['priority','Priority','text']] },
    tickets: { label: 'Tickets', singular: 'Ticket', description: 'Register requests and track status.', fields: [['subject','Subject','text'],['category','Category','text'],['status','Status','text']] },
    clients: { label: 'Clients', singular: 'Client', description: 'Organize contacts and companies.', fields: [['name','Name','text'],['company','Company','text'],['email','Email','email']] }
  }
};

export function getResources(language = 'pt') {
  const source = resourceContent[language] || resourceContent.pt;
  return Object.fromEntries(Object.entries(source).map(([key, resource]) => [key, {
    ...resource,
    fields: resource.fields.map(([name, label, type, step]) => ({ name, label, type, ...(step ? { step } : {}) }))
  }]));
}
