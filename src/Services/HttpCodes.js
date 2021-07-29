export const HttpCodes = [
  {
    // Respostas informativas
    code: 100,
    title: 'Continue',
    description:
      'Essa resposta provisória indica que tudo ocorreu bem até agora e que o cliente deve continuar com a requisição ou ignorar se já concluiu o que gostaria.',
  },
  {
    code: 101,
    title: 'Switching Protocol',
    description:
      'Esse código é enviado em resposta a um cabeçalho de solicitação Upgrade pelo cliente, e indica o protocolo a que o servidor está alternando.',
  },
  {
    code: 102,
    title: 'Processing (WebDAV)',
    description:
      'Este código indica que o servidor recebeu e está processando a requisição, mas nenhuma resposta está disponível ainda.',
  },
  {
    code: 103,
    title: 'Early Hints',
    description:
      'Este código tem principalmente o objetivo de ser utilizado com o cabeçalho Link, indicando que o agente deve iniciar a pré-carregar recursos enquanto o servidor prepara uma resposta.',
  },
  // Respostas de sucesso
  // GET: O recurso foi buscado e transmitido no corpo da mensagem.
  // HEAD: Os cabeçalhos da entidade estão no corpo da mensagem.
  // PUT ou POST: O recurso descrevendo o resultado da ação é transmitido no corpo da mensagem.
  // TRACE: O corpo da mensagem contém a mensagem de requisição recebida pelo servidor.
  {
    code: 200,
    title: 'OK',
    description:
      'Estas requisição foi bem sucedida. O significado do sucesso varia de acordo com o método HTTP:',
  },
  {
    code: 201,
    title: 'Created',
    description:
      'A requisição foi bem sucedida e um novo recurso foi criado como resultado. Esta é uma tipica resposta enviada após uma requisição POST.',
  },
  {
    code: 202,
    title: 'Accepted',
    description:
      'A requisição foi recebida mas nenhuma ação foi tomada sobre ela. Isto é uma requisição não-comprometedora, o que significa que não há nenhuma maneira no HTTP para enviar uma resposta assíncrona indicando o resultado do processamento da solicitação. Isto é indicado para casos onde outro processo ou servidor lida com a requisição, ou para processamento em lote.',
  },
  {
    code: 203,
    title: 'Non-Authoritative Information',
    description:
      'Esse código de resposta significa que o conjunto de meta-informações retornadas não é o conjunto exato disponível no servidor de origem, mas coletado de uma cópia local ou de terceiros. Exceto essa condição, a resposta de 200 OK deve ser preferida em vez dessa resposta.',
  },
  {
    code: 204,
    title: 'No Content',
    description:
      'Não há conteúdo para enviar para esta solicitação, mas os cabeçalhos podem ser úteis. O user-agent pode atualizar seus cabeçalhos em cache para este recurso com os novos.',
  },
  {
    code: 205,
    title: 'Reset Content',
    description:
      'Esta requisição é enviada após realizanda a solicitação para informar ao user agent redefinir a visualização do documento que enviou essa solicitação.',
  },
  {
    code: 206,
    title: 'Partial Content',
    description:
      'Esta resposta é usada por causa do cabeçalho de intervalo enviado pelo cliente para separar o download em vários fluxos.',
  },
  {
    code: 206,
    title: 'Partial Content',
    description:
      'Esta resposta é usada por causa do cabeçalho de intervalo enviado pelo cliente para separar o download em vários fluxos.',
  },
  {
    code: 207,
    title: 'Multi-Status (WebDAV)',
    description:
      'Uma resposta Multi-Status transmite informações sobre vários recursos em situações em que vários códigos de status podem ser apropriados.',
  },
  {
    code: 208,
    title: 'Multi-Status (WebDAV)',
    description:
      'Usado dentro de um elemento de resposta <dav:propstat> para evitar enumerar os membros internos de várias ligações à mesma coleção repetidamente.',
  },
  {
    code: 226,
    title: 'IM Used (HTTP Delta encoding)',
    description:
      'O servidor cumpriu uma solicitação GET para o recurso e a resposta é uma representação do resultado de uma ou mais manipulações de instância aplicadas à instância atual.',
  },
  // Mensagens de redirecionamento
  {
    code: 300,
    title: 'Multiple Choice',
    description:
      'A requisição tem mais de uma resposta possível. User-agent ou o user deve escolher uma delas. Não há maneira padrão para escolher uma das respostas.',
  },
  {
    code: 301,
    title: 'Moved Permanently',
    description:
      'Esse código de resposta significa que a URI do recurso requerido mudou. Provavelmente, a nova URI será especificada na resposta.',
  },
  {
    code: 302,
    title: 'Found',
    description:
      'Esse código de resposta significa que a URI do recurso requerido foi mudada temporariamente. Novas mudanças na URI poderão ser feitas no futuro. Portanto, a mesma URI deve ser usada pelo cliente em requisições futuras.',
  },
  {
    code: 303,
    title: 'See Other',
    description:
      'O servidor manda essa resposta para instruir ao cliente buscar o recurso requisitado em outra URI com uma requisição GET.',
  },
  {
    code: 304,
    title: 'Not Modified',
    description:
      'Essa resposta é usada para questões de cache. Diz ao cliente que a resposta não foi modificada. Portanto, o cliente pode usar a mesma versão em cache da resposta.',
  },
  {
    code: 305,
    title: 'Use Proxy',
    description:
      'Foi definida em uma versão anterior da especificação HTTP para indicar que uma resposta deve ser acessada por um proxy. Foi depreciada por questões de segurança em respeito a configuração em banda de um proxy.',
  },
  {
    code: 306,
    title: 'Unused',
    description:
      'Esse código de resposta não é mais utilizado, encontra-se reservado. Foi usado numa versão anterior da especificação HTTP 1.1.',
  },
  {
    code: 307,
    title: 'Temporary Redirect',
    description:
      'O servidor mandou essa resposta direcionando o cliente a buscar o recurso requisitado em outra URI com o mesmo método que foi utilizado na requisição original. Tem a mesma semântica do código 302 Found, com a exceção de que o user-agent não deve mudar o método HTTP utilizado: se um POST foi utilizado na primeira requisição, um POST deve ser utilizado na segunda.',
  },
  {
    code: 308,
    title: 'Permanent Redirect',
    description:
      'Esse código significa que o recurso agora está permanentemente localizado em outra URI, especificada pelo cabeçalho de resposta Location. Tem a mesma semântica do código de resposta HTTP 301 Moved Permanently  com a exceção de que o user-agent não deve mudar o método HTTP utilizado: se um POST foi utilizado na primeira requisição, um POST deve ser utilizado na segunda.',
  },
  // Respostas de erro do Cliente
  {
    code: 400,
    title: 'Bad Request',
    description:
      'Essa resposta significa que o servidor não entendeu a requisição pois está com uma sintaxe inválida.',
    userText:
      'Campo preenchido incorretamente, por favor preencha algo válido.'
  },
  {
    code: 401,
    title: 'Unauthorized',
    description:
      'Embora o padrão HTTP especifique "unauthorized", semanticamente, essa resposta significa "unauthenticated". Ou seja, o cliente deve se autenticar para obter a resposta solicitada.',
  },
  {
    code: 402,
    title: 'Payment Required',
    description:
      'Este código de resposta está reservado para uso futuro. O objetivo inicial da criação deste código era usá-lo para sistemas digitais de pagamento porém ele não está sendo usado atualmente.',
  },
  {
    code: 403,
    title: 'Forbidden',
    description:
      'O cliente não tem direitos de acesso ao conteúdo portanto o servidor está rejeitando dar a resposta. Diferente do código 401, aqui a identidade do cliente é conhecida.',
  },
  {
    code: 404,
    title: 'Not Found',
    description:
      'O servidor não pode encontrar o recurso solicitado. Este código de resposta talvez seja o mais famoso devido à frequência com que acontece na web.',
  },
  {
    code: 405,
    title: 'Method Not Allowed',
    description:
      'O método de solicitação é conhecido pelo servidor, mas foi desativado e não pode ser usado. Os dois métodos obrigatórios, GET e HEAD, nunca devem ser desabilitados e não devem retornar este código de erro.',
  },
  {
    code: 406,
    title: 'Not Acceptable',
    description:
      'Essa resposta é enviada quando o servidor da Web após realizar a negociação de conteúdo orientada pelo servidor, não encontra nenhum conteúdo seguindo os critérios fornecidos pelo agente do usuário.',
  },
  {
    code: 407,
    title: 'Proxy Authentication Required',
    description:
      'Semelhante ao 401 porem é necessário que a autenticação seja feita por um proxy.',
  },
  {
    code: 408,
    title: 'Request Timeout',
    description:
      'Esta resposta é enviada por alguns servidores em uma conexão ociosa, mesmo sem qualquer requisição prévia pelo cliente. Ela significa que o servidor gostaria de derrubar esta conexão em desuso. Esta resposta é muito usada já que alguns navegadores, como Chrome, Firefox 27+, ou IE9, usam mecanismos HTTP de pré-conexão para acelerar a navegação. Note também que alguns servidores meramente derrubam a conexão sem enviar esta mensagem.',
  },
  {
    code: 409,
    title: 'Conflict',
    description:
      'Esta resposta será enviada quando uma requisição conflitar com o estado atual do servidor.',
  },
  {
    code: 410,
    title: 'Gone',
    description:
      'Esta resposta será enviada quando o conteúdo requisitado foi permanentemente deletado do servidor, sem nenhum endereço de redirecionamento. É experado que clientes removam seus caches e links para o recurso. A especificação HTTP espera que este código de status seja usado para "serviços promocionais de tempo limitado". APIs não devem se sentir obrigadas a indicar que recursos foram removidos com este código de status.',
  },
  {
    code: 411,
    title: 'Length Required',
    description:
      'O servidor rejeitou a requisição porque o campo Content-Length do cabeçalho não está definido e o servidor o requer.',
  },
  {
    code: 412,
    title: 'Precondition Failed',
    description:
      'O cliente indicou nos seus cabeçalhos pré-condições que o servidor não atende.',
  },
  {
    code: 413,
    title: 'Payload Too Large',
    description:
      'A entidade requisição é maior do que os limites definidos pelo servidor; o servidor pode fechar a conexão ou retornar um campo de cabeçalho Retry-After.',
  },
  {
    code: 414,
    title: 'URI Too Long',
    description:
      'A URI requisitada pelo cliente é maior do que o servidor aceita para interpretar.',
  },
  {
    code: 415,
    title: 'Unsupported Media Type',
    description:
      'O formato de mídia dos dados requisitados não é suportado pelo servidor, então o servidor rejeita a requisição.',
  },
  {
    code: 416,
    title: 'Requested Range Not Satisfiable',
    description:
      'O trecho especificado pelo campo Range do cabeçalho na requisição não pode ser preenchido; é possível que o trecho esteja fora do tamanho dos dados da URI alvo.',
  },
  {
    code: 417,
    title: 'Expectation Failed',
    description:
      'Este código de resposta significa que a expectativa indicada pelo campo Expect do cabeçalho da requisição não pode ser satisfeita pelo servidor.',
  },
  {
    code: 418,
    title: "I'm a teapot",
    description: 'O servidor recusa a tentativa de coar café num bule de chá.',
  },
  {
    code: 421,
    title: 'Misdirected Request',
    description:
      'A requisição foi direcionada a um servidor inapto a produzir a resposta. Pode ser enviado por um servidor que não está configurado para produzir respostas para a combinação de esquema ("scheme") e autoridade inclusas na URI da requisição.',
  },
  {
    code: 422,
    title: 'Unprocessable Entity (WebDAV)',
    description:
      'A requisição está bem formada mas inabilitada para ser seguida devido a erros semânticos.',
  },
  {
    code: 423,
    title: 'Locked (WebDAV)',
    description: 'O recurso sendo acessado está travado.',
  },
  {
    code: 424,
    title: 'Failed Dependency (WebDAV)',
    description: 'A requisição falhou devido a falha em requisição prévia.',
  },
  {
    code: 425,
    title: 'Too Early',
    description:
      'Indica que o servidor não está disposto a arriscar processar uma requisição que pode ser refeita.',
  },
  {
    code: 426,
    title: 'Upgrade Required',
    description:
      'O servidor se recusa a executar a requisição usando o protocolo corrente mas estará pronto a fazê-lo após o cliente atualizar para um protocolo diferente. O servidor envia um cabeçalho Upgrade numa resposta 426 para indicar o(s) protocolo(s) requeridos.',
  },
  {
    code: 428,
    title: 'Precondition Required',
    description:
      "O servidor de origem requer que a resposta seja condicional. Feito para prevenir o problema da 'atualização perdida', onde um cliente pega o estado de um recurso (GET) , modifica-o, e o põe de volta no servidor (PUT), enquanto um terceiro modificou o estado no servidor, levando a um conflito.",
  },
  {
    code: 429,
    title: 'Too Many Requests',
    description:
      'O usuário enviou muitas requisições num dado tempo ("limitação de frequência").',
  },
  {
    code: 431,
    title: 'Request Header Fields Too Large',
    description:
      'O servidor não quer processar a requisição porque os campos de cabeçalho são muito grandes. A requisição PODE ser submetida novemente depois de reduzir o tamanho dos campos de cabeçalho.',
  },
  {
    code: 451,
    title: 'Unavailable For Legal Reasons',
    description:
      'O usuário requisitou um recurso ilegal, tal como uma página censurada por um governo.',
  },
  // Respostas de erro do Servidor
  {
    code: 500,
    title: 'Internal Server Error',
    description: 'O servidor encontrou uma situação com a qual não sabe lidar.',
  },
  {
    code: 501,
    title: 'Not Implemented',
    description:
      'O método da requisição não é suportado pelo servidor e não pode ser manipulado. Os únicos métodos exigidos que servidores suportem (e portanto não devem retornar este código) são GET e HEAD.',
  },
  {
    code: 502,
    title: 'Bad Gateway',
    description:
      'Esta resposta de erro significa que o servidor, ao trabalhar como um gateway a fim de obter uma resposta necessária para manipular a requisição, obteve uma resposta inválida.',
  },
  {
    code: 503,
    title: 'Service Unavailable',
    description:
      'O servidor não está pronto para manipular a requisição. Causas comuns são um servidor em manutenção ou sobrecarregado. Note que junto a esta resposta, uma página amigável explicando o problema deveria ser enviada. Estas respostas devem ser usadas para condições temporárias e o cabeçalho HTTP Retry-After: deverá, se posível, conter o tempo estimado para recuperação do serviço. O webmaster deve também tomar cuidado com os cabaçalhos relacionados com o cache que são enviados com esta resposta, já que estas respostas de condições temporárias normalmente não deveriam ser postas em cache.',
  },
  {
    code: 504,
    title: 'Gateway Timeout',
    description:
      'Esta resposta de erro é dada quando o servidor está atuando como um gateway e não obtém uma resposta a tempo.',
  },
  {
    code: 505,
    title: 'HTTP Version Not Supported',
    description:
      'A versão HTTP usada na requisição não é suportada pelo servidor.',
  },
  {
    code: 506,
    title: 'Variant Also Negotiates',
    description:
      'O servidor tem um erro de configuração interno: a negociação transparente de conteúdo para a requisição resulta em uma referência circular.',
  },
  {
    code: 507,
    title: 'Insufficient Storage',
    description:
      'O servidor tem um erro interno de configuração: o recurso variante escolhido está configurado para entrar em negociação transparente de conteúdo com ele mesmo, e portanto não é uma ponta válida no processo de negociação.',
  },
  {
    code: 508,
    title: 'Loop Detected (WebDAV)',
    description:
      'O servidor detectou um looping infinito ao processar a requisição.',
  },
  {
    code: 510,
    title: 'Not Extended',
    description:
      'Exigem-se extenções posteriores à requisição para o servidor atendê-la.',
  },
  {
    code: 511,
    title: 'Network Authentication Required',
    description:
      'O código de status 511 indica que o cliente precisa se autenticar para ganhar acesso à rede.',
  },
];
