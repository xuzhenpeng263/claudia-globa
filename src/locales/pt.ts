import type { Translations } from "@/lib/i18n";

export const pt: Translations = {
  common: {
    save: "Salvar",
    cancel: "Cancelar",
    delete: "Excluir",
    edit: "Editar",
    add: "Adicionar",
    remove: "Remover",
    back: "Voltar",
    next: "Próximo",
    previous: "Anterior",
    loading: "Carregando",
    error: "Erro",
    success: "Sucesso",
    warning: "Aviso",
    info: "Informação",
    confirm: "Confirmar",
    yes: "Sim",
    no: "Não",
    ok: "OK",
    close: "Fechar",
    open: "Abrir",
    settings: "Configurações",
    search: "Pesquisar",
    filter: "Filtrar",
    sort: "Ordenar",
    refresh: "Atualizar",
    copy: "Copiar",
    select: "Selecionar",
    clear: "Limpar",
    reset: "Redefinir",
    apply: "Aplicar",
    submit: "Enviar",
    create: "Criar",
    update: "Atualizar",
    upload: "Carregar",
    download: "Baixar",
    import: "Importar",
    export: "Exportar",
    help: "Ajuda",
    about: "Sobre",
    version: "Versão",
    language: "Idioma",
    email: "Email",
    password: "Senha",
    username: "Nome de usuário",
    name: "Nome",
    date: "Data",
    time: "Hora",
    dateTime: "Data e hora",
    today: "Hoje",
  },

  app: {
    title: "Claudia",
    welcomeTitle: "Bem-vindo ao Claudia",
    welcomeSubtitle: "Seu assistente de desenvolvimento com IA",
    ccAgents: "Agentes CC",
    ccProjects: "Projetos CC",
    backToHome: "Voltar para o início",
    newSession: "Nova sessão",
    usageDashboard: "Painel de uso",
    mcp: "MCP",
    claudeMd: "CLAUDE.md",
  },

  // Editor CLAUDE.md
  claudemd: {
    title: "CLAUDE.md",
    subtitle: "Edite seu prompt de sistema do Claude Code",
    editSystemPrompt: "Edite seu prompt de sistema do Claude Code",
    editProjectPrompt: "Edite o prompt de sistema específico do projeto do Claude Code",
    failedToLoad: "Falha ao carregar o arquivo CLAUDE.md",
    failedToSave: "Falha ao salvar o arquivo CLAUDE.md",
    savedSuccessfully: "CLAUDE.md salvo com sucesso",
    unsavedChanges: "Você tem alterações não salvas. Tem certeza que deseja sair?",
    memories: "Memórias CLAUDE.md",
    noFilesFound: "Nenhum arquivo CLAUDE.md encontrado neste projeto",
    loadingFiles: "Carregando arquivos...",
    failedToLoadFiles: "Falha ao carregar arquivos CLAUDE.md",
  },

  projects: {
    title: "Projetos CC",
    subtitle: "Navegue por suas sessões do Claude Code",
    noProjects: "Nenhum projeto encontrado em ~/.claude/projects",
    projectName: "Nome do projeto",
    projectPath: "Caminho do projeto",
    createdAt: "Criado em",
    sessions: "Sessões",
    newClaudeCodeSession: "Nova sessão do Claude Code",
    runningClaudeSessions: "Sessões Claude em execução",
    hooks: "Hooks",
    projectSettings: "Configurações do projeto",
  },

  sessions: {
    title: "Sessões",
    noSessions: "Nenhuma sessão encontrada",
    sessionName: "Nome da sessão",
    lastModified: "Última modificação",
    messages: "Mensagens",
    tokens: "Tokens",
    cost: "Custo",
    status: "Status",
    active: "Ativa",
    completed: "Concluída",
    failed: "Falhou",
    cancelled: "Cancelada",
    claudeCodeSession: "Sessão Claude Code",
    commands: "Comandos",
    copyOutput: "Copiar Saída",
    slashCommands: "Comandos Slash",
    manageProjectSpecificSlashCommands: "Gerenciar comandos slash específicos do projeto para",
    checkpointSettings: "Configurações de Checkpoint",
    close: "Fechar",
    experimentalFeature: "Recurso Experimental",
    checkpointingWarning:
      "Checkpoints podem afetar a estrutura do diretório ou causar perda de dados. Use com cautela.",
    automaticCheckpoints: "Checkpoints Automáticos",
    automaticCheckpointsDesc:
      "Criar automaticamente checkpoints baseados na estratégia selecionada",
    checkpointStrategy: "Estratégia de Checkpoint",
    smartRecommended: "Inteligente (Recomendado)",
    smartStrategyDesc: "Checkpoints serão criados após operações destrutivas",
    saveSettings: "Salvar Configurações",
    storageManagement: "Gerenciamento de Armazenamento",
    totalCheckpoints: "Total de checkpoints",
    keepRecentCheckpoints: "Manter Checkpoints Recentes",
    cleanUp: "Limpar",
    removeOldCheckpoints: "Remover checkpoints antigos, mantendo apenas os mais recentes",
    sessionTimeline: "Linha do Tempo da Sessão",
    timeline: "Linha do Tempo",
    noCheckpointsYet: "Ainda não há checkpoints",
    loadingTimeline: "Carregando linha do tempo...",
    copyAsMarkdown: "Copiar como Markdown",
    copyAsJsonl: "Copiar como JSONL",
    checkpointSettingsTooltip: "Configurações de Checkpoint",
    timelineNavigatorTooltip: "Navegador da Linha do Tempo",
  },

  settings: {
    title: "Configurações",
    subtitle: "Configure as preferências do Claude Code",
    saveSettings: "Salvar configurações",
    saving: "Salvando...",
    settingsSaved: "Configurações salvas com sucesso!",
    failedToSave: "Falha ao salvar configurações",

    general: "Geral",
    permissions: "Permissões",
    environment: "Ambiente",
    advanced: "Avançado",
    hooks: "Hooks",
    commands: "Comandos",
    storage: "Armazenamento",

    generalSettings: "Configurações gerais",
    includeCoAuthoredBy: 'Incluir "Co-authored by Claude"',
    includeCoAuthoredByDesc: "Adicionar atribuição do Claude a commits git e pull requests",
    verboseOutput: "Saída detalhada",
    verboseOutputDesc: "Mostrar saídas completas de bash e comandos",
    chatRetention: "Retenção de transcrições de chat (dias)",
    chatRetentionDesc: "Por quanto tempo manter transcrições de chat localmente (padrão: 30 dias)",
    claudeInstallation: "Instalação do Claude Code",
    claudeInstallationDesc:
      "Selecione qual instalação do Claude Code usar. A versão empacotada é recomendada para melhor compatibilidade.",
    choosePreferredInstallation:
      "Escolha sua instalação preferida do Claude Code. A versão empacotada é recomendada para melhor compatibilidade.",
    availableInstallations: "Instalações Disponíveis",
    selectedInstallation: "Instalação Selecionada",
    bundled: "Empacotada",
    system: "Sistema",
    custom: "Personalizada",
    path: "Caminho",
    source: "Origem",
    version: "Versão",
    claudeCodeBundled: "Claude Code (Empacotada)",
    loadingInstallations: "Carregando instalações disponíveis...",
    selectClaudeInstallation: "Selecionar instalação Claude",
    pleaseSelectInstallation: "Por favor selecione uma instalação Claude",
    multipleInstallationsFound:
      "Múltiplas instalações do Claude Code foram encontradas no seu sistema. Por favor selecione qual você gostaria de usar.",
    claudeNotFoundInLocations:
      "Claude Code não foi encontrado em nenhum dos locais de instalação comuns. Por favor instale o Claude Code para continuar.",
    searchingForInstallations: "Procurando instalações Claude...",
    installationGuide: "Guia de Instalação",
    saveSelection: "Salvar Seleção",
    noInstallationsFound: "Nenhuma Instalação Encontrada",
    validating: "Validando...",
    binaryPathChanged:
      "⚠️ O caminho binário do Claude foi alterado. Lembre-se de salvar suas configurações.",

    permissionRules: "Regras de permissão",
    permissionRulesDesc: "Controle quais ferramentas o Claude Code pode usar sem aprovação manual",
    allowRules: "Regras de permissão",
    denyRules: "Regras de negação",
    addRule: "Adicionar regra",
    noAllowRules:
      "Nenhuma regra de permissão configurada. Claude pedirá aprovação para todas as ferramentas.",
    noDenyRules: "Nenhuma regra de negação configurada.",
    permissionExamples: "Exemplos:",

    environmentVariables: "Variáveis de ambiente",
    environmentVariablesDesc: "Variáveis de ambiente aplicadas a cada sessão do Claude Code",
    addVariable: "Adicionar variável",
    noEnvironmentVariables: "Nenhuma variável de ambiente configurada.",
    commonVariables: "Variáveis comuns:",

    advancedSettings: "Configurações avançadas",
    advancedSettingsDesc: "Opções de configuração adicionais para usuários avançados",
    apiKeyHelper: "Script auxiliar de chave API",
    apiKeyHelperDesc:
      "Script personalizado para gerar valores de autenticação para solicitações de API",
    rawSettings: "Configurações brutas (JSON)",
    rawSettingsDesc: "Isso mostra o JSON bruto que será salvo em ~/.claude/settings.json",

    // Configurações de notificações de áudio
    audioNotifications: "Notificações de Áudio",
    audioNotificationsDesc: "Configurar alertas de áudio para conclusão de tarefas",
    audioNotificationMode: "Modo de Notificação",
    audioNotificationModeDesc: "Escolha quando reproduzir notificações de áudio",
    audioModeOff: "Desligado",
    audioModeOnMessage: "Ao Completar Mensagem",
    audioModeOnQueue: "Ao Completar Fila",
    audioModeOffDesc: "Sem notificações de áudio",
    audioModeOnMessageDesc: "Reproduzir som quando cada tarefa de mensagem for concluída",
    audioModeOnQueueDesc: "Reproduzir som quando todas as tarefas na fila forem concluídas",
    testAudio: "Testar Áudio",
    testAudioDesc: "Testar reprodução de notificação de áudio",
    playTestSound: "Reproduzir Som de Teste",

    userHooks: "Hooks do usuário",
    userHooksDesc:
      "Configure hooks que se aplicam a todas as sessões do Claude Code para sua conta de usuário. Estes são armazenados em ~/.claude/settings.json",

    // Exemplos de permissões
    allowAllBashCommands: "Permitir todos os comandos bash",
    allowExactCommand: "Permitir comando exato",
    allowCommandsWithPrefix: "Permitir comandos com prefixo",
    allowReadingSpecificFile: "Permitir leitura de arquivo específico",
    allowEditingFilesInDocsDirectory: "Permitir edição de arquivos no diretório docs",

    // Exemplos de variáveis de ambiente
    enableDisableTelemetry: "Ativar/desativar telemetria (0 ou 1)",
    customModelName: "Nome de modelo personalizado",
    disableCostWarnings: "Desativar avisos de custo (1)",

    // Configurações de escala de fonte
    fontScale: "Tamanho da fonte",
    fontScaleDesc: "Ajustar o tamanho da fonte da interface para telas de alta resolução ou melhorar a legibilidade",
    fontScaleSmall: "Pequena",
    fontScaleNormal: "Normal",
    fontScaleLarge: "Grande",
    fontScaleExtraLarge: "Extra grande",
    fontScaleCustom: "Personalizada",
    fontScaleSmallDesc: "Fontes menores para telas de alta densidade",
    fontScaleNormalDesc: "Tamanho de fonte padrão",
    fontScaleLargeDesc: "Fontes maiores para melhorar a legibilidade",
    fontScaleExtraLargeDesc: "Tamanho máximo de fonte para telas de alta resolução",
    fontScaleCustomDesc: "Multiplicador de escala personalizado",
    customMultiplier: "Multiplicador personalizado",
    customMultiplierDesc: "Digite um multiplicador de escala de fonte personalizado (0.5x - 3.0x)",
    customMultiplierPlaceholder: "ex. 1.5",
    customMultiplierRange: "Faixa: 0.5x a 3.0x",

    // Outras chaves ausentes
    examples: "Exemplos:",
    failedToLoadSettings:
      "Falha ao carregar configurações. Certifique-se de que o diretório ~/.claude existe.",
    settingsSavedSuccessfully: "Configurações salvas com sucesso!",
    failedToSaveSettings: "Falha ao salvar configurações",
    refresh: "Atualizar",
  },

  claude: {
    claudeNotFound: "Claude Code não encontrado",
    claudeNotFoundDesc: "A instalação do Claude Code não foi encontrada no seu sistema",
    selectClaudeInstallation: "Selecionar instalação do Claude",
    installClaude: "Instalar Claude Code",
    checking: "Verificando...",
    claudeCode: "Claude Code",
    claudeVersion: "Claude Code v{version}",
    claudeStreaming: "Claude está transmitindo",
    claudeStreamingWarning:
      "Claude ainda está respondendo. Se você navegar para longe, Claude continuará executando em segundo plano.\n\nVocê pode retornar a esta sessão a partir da visualização de Projetos.\n\nDeseja continuar?",
    continueNavigation: "Continuar navegação",
  },

  messages: {
    failedToLoadProjects:
      "Falha ao carregar projetos. Certifique-se de que o diretório ~/.claude existe.",
    failedToLoadSessions: "Falha ao carregar sessões para este projeto.",
    ensureClaudeDirectory: "Certifique-se de que o diretório ~/.claude existe.",
    projectLoadError: "Falha ao carregar projeto",
    sessionLoadError: "Falha ao carregar sessão",
    saveSuccess: "Salvo com sucesso",
    saveError: "Falha ao salvar",
    deleteSuccess: "Excluído com sucesso",
    deleteError: "Falha ao excluir",
    copySuccess: "Copiado para a área de transferência",
    copyError: "Falha ao copiar",
    uploadSuccess: "Carregado com sucesso",
    uploadError: "Falha ao carregar",
    downloadSuccess: "Baixado com sucesso",
    downloadError: "Falha ao baixar",
    networkError: "Erro de rede",
    serverError: "Erro do servidor",
    validationError: "Erro de validação",
    permissionError: "Permissão negada",
    notFoundError: "Não encontrado",
    timeoutError: "Tempo limite da solicitação",
    unknownError: "Erro desconhecido",
  },

  validation: {
    required: "Este campo é obrigatório",
  },

  time: {
    justNow: "Agora mesmo",
    minutesAgo: "há {count} minutos",
    hoursAgo: "há {count} horas",
    daysAgo: "há {count} dias",
  },

  mcp: {
    title: "Gerenciador MCP",
    subtitle: "Gerenciar servidores do Protocolo de Contexto de Modelo",
    servers: "Servidores",
    addServer: "Adicionar servidor",
    serverName: "Nome do servidor",
    serverCommand: "Comando",
    serverArgs: "Argumentos",
    serverEnv: "Ambiente",
    enabled: "Ativado",
    disabled: "Desativado",
    autoApprove: "Aprovação automática",
    importExport: "Importar/Exportar",
    importConfig: "Importar configuração",
    exportConfig: "Exportar configuração",
    noServers: "Nenhum servidor MCP configurado",
    serverStatus: "Status do servidor",
    connected: "Conectado",
    disconnected: "Desconectado",
    connecting: "Conectando",
    error: "Erro",
    // Traduções adicionais do MCP
    mcpServers: "Servidores MCP",
    manageServers: "Gerenciar servidores",
    serverConfiguration: "Configuração do servidor",
    addNewServer: "Adicionar novo servidor",
    editServer: "Editar servidor",
    removeServer: "Remover servidor",
    serverDetails: "Detalhes do servidor",
    connectionStatus: "Status da conexão",
    serverLogs: "Logs do servidor",
    testConnection: "Testar conexão",
    reconnect: "Reconectar",
    disconnect: "Desconectar",
    serverPort: "Porta do servidor",
    serverHost: "Host do servidor",
    authToken: "Token de autenticação",
    timeout: "Tempo limite",
    retryAttempts: "Tentativas de reconexão",
    enableLogging: "Ativar registro",
    logLevel: "Nível de registro",
    serverType: "Tipo de servidor",
    protocol: "Protocolo",
    version: "Versão",
    capabilities: "Capacidades",
    tools: "Ferramentas",
    resources: "Recursos",
    prompts: "Prompts",
    sampling: "Amostragem",
    roots: "Raízes",
    experimental: "Experimental",
    serverInfo: "Informações do servidor",
    lastSeen: "Visto pela última vez",
    uptime: "Tempo de atividade",
    requestCount: "Contagem de solicitações",
    errorCount: "Contagem de erros",
    averageResponseTime: "Tempo médio de resposta",
    // Adicionar chaves de tradução MCP ausentes
    serverNameRequired: "Nome do servidor é obrigatório",
    commandRequired: "Comando é obrigatório",
    urlRequired: "URL é obrigatória",
    uniqueServerName: "Nome único para identificar este servidor",
    command: "Comando",
    commandToExecute: "Comando para executar o servidor",
    commandArguments: "Argumentos do comando (Opcional)",
    spaceSeparatedArgs: "Argumentos do comando separados por espaço",
    scope: "Escopo",
    localProjectOnly: "Local (Apenas este projeto)",
    projectSharedMcp: "Projeto (Compartilhado via .mcp.json)",
    userAllProjects: "Usuário (Todos os projetos)",
    environmentVariables: "Variáveis de ambiente",
    addVariable: "Adicionar variável",
    addStdioServer: "Adicionar servidor Stdio",
    addSseServer: "Adicionar servidor SSE",
    addingServer: "Adicionando servidor...",
    stdio: "Stdio",
    sse: "SSE",
    url: "URL",
    sseEndpointUrl: "URL do endpoint SSE",
    exampleCommands: "Comandos de exemplo",
    addMcpServer: "Adicionar servidor MCP",
    configureMcpServer: "Configurar um novo servidor de Protocolo de Contexto de Modelo",
    // Relacionado ao MCPServerList
    configuredServers: "Servidores configurados",
    serversConfigured: "{count} servidores configurados",
    refresh: "Atualizar",
    noMcpServersConfigured: "Nenhum servidor MCP configurado",
    addServerToGetStarted:
      "Adicione um servidor para começar com o Protocolo de Contexto de Modelo",
    running: "Em execução",
    showFull: "Mostrar completo",
    hide: "Ocultar",
    environmentVariablesCount: "Variáveis de ambiente: {count}",
    arguments: "Argumentos",
    copy: "Copiar",
    copied: "Copiado!",
    localProjectSpecific: "Local (Específico do projeto)",
    projectSharedViaMcp: "Projeto (Compartilhado via .mcp.json)",
    userAllProjectsScope: "Usuário (Todos os projetos)",
    // Relacionado ao MCPImportExport
    importExportTitle: "Importar e exportar",
    importExportSubtitle: "Importar servidores MCP de outras fontes ou exportar sua configuração",
    importScope: "Escopo de importação",
    chooseImportScope: "Escolha onde salvar servidores importados de arquivos JSON",
    importFromClaudeDesktop: "Importar do Claude Desktop",
    importFromClaudeDesktopDesc:
      "Importar automaticamente todos os servidores MCP do Claude Desktop. Instala no escopo do usuário (disponível em todos os projetos).",
    importing: "Importando...",
    importFromJson: "Importar do JSON",
    importFromJsonDesc: "Importar configurações de servidor de arquivos JSON",
    chooseJsonFile: "Escolher arquivo JSON",
    exportConfiguration: "Exportar configuração",
    exportConfigurationDesc: "Exportar sua configuração de servidor MCP",
    exportComingSoon: "Exportar (Em breve)",
    useClaudeCodeAsMcp: "Usar Claude Code como servidor MCP",
    useClaudeCodeAsMcpDesc:
      "Iniciar Claude Code como um servidor MCP ao qual outros aplicativos podem se conectar",
    startMcpServer: "Iniciar servidor MCP",
    jsonFormatExamples: "Exemplos de formato JSON",
    singleServer: "Servidor único:",
    multipleServers: "Múltiplos servidores (formato .mcp.json):",
    invalidJsonFile: "Arquivo JSON inválido. Verifique o formato.",
    enterServerName: "Digite um nome para este servidor:",
    unrecognizedJsonFormat: "Formato JSON não reconhecido. Esperava configuração de servidor MCP.",
    failedToImportJson: "Falha ao importar arquivo JSON",
    exportFunctionalityComingSoon: "Funcionalidade de exportação em breve!",
    claudeCodeMcpServerStarted:
      "Servidor MCP Claude Code iniciado. Agora você pode se conectar a ele de outros aplicativos.",
    failedToStartMcpServer: "Falha ao iniciar Claude Code como servidor MCP",
    successfullyImported: "Importado com sucesso: {servers}",
    failedToImportSomeServers: "Falha ao importar alguns servidores:\n{details}",
    failedToImportFromClaudeDesktop: "Falha ao importar do Claude Desktop",
    // Relacionado ao MCPManager
    failedToLoadServers:
      "Falha ao carregar servidores MCP. Certifique-se de que o Claude Code está instalado.",
    serverAddedSuccessfully: "Servidor MCP adicionado com sucesso!",
    serverRemovedSuccessfully: 'Servidor "{name}" removido com sucesso!',
    importedServersSuccess: "{count} servidores importados com sucesso!",
    importedServersPartial: "Importados {imported} servidores, {failed} falharam",
    mcpManagerTitle: "Servidores MCP",
    mcpManagerSubtitle: "Gerenciar servidores do Protocolo de Contexto de Modelo",
  },

  usage: {
    title: "Painel de uso",
    subtitle: "Monitore seu uso e custos do Claude Code",
    totalTokens: "Total de tokens",
    totalCost: "Custo total",
    sessionsCount: "Sessões",
    averageCost: "Custo médio",
    dailyUsage: "Uso diário",
    weeklyUsage: "Uso semanal",
    monthlyUsage: "Uso mensal",
    yearlyUsage: "Uso anual",
    topProjects: "Principais projetos",
    recentActivity: "Atividade recente",
    costBreakdown: "Detalhamento de custos",
    tokenBreakdown: "Detalhamento de tokens",
    noData: "Nenhum dado de uso disponível",
    refreshData: "Atualizar dados",
    // Novas chaves de tradução do painel de uso
    loadingStats: "Carregando estatísticas de uso...",
    tryAgain: "Tentar novamente",
    allTime: "Todo o período",
    last7Days: "Últimos 7 dias",
    last30Days: "Últimos 30 dias",
    overview: "Visão geral",
    byModel: "Por modelo",
    byProject: "Por projeto",
    bySessions: "Por sessões",
    timeline: "Linha do tempo",
    inputTokens: "Tokens de entrada",
    outputTokens: "Tokens de saída",
    cacheWrite: "Escrita em cache",
    cacheRead: "Leitura de cache",
    mostUsedModels: "Modelos mais usados",
    usageByModel: "Uso por modelo",
    usageByProject: "Uso por projeto",
    usageBySession: "Uso por sessão",
    dailyUsageOverTime: "Uso diário ao longo do tempo",
    noUsageData: "Nenhum dado de uso disponível",
    sessions: "sessões",
    tokens: "tokens",
    input: "Entrada",
    output: "Saída",
    avgCostPerSession: "Custo médio por sessão",
    modelsUsed: "Modelos usados",
    // Novas chaves de tradução ausentes
    trackUsageAndCosts: "Acompanhe seu uso e custos do Claude Code",
    totalSessions: "Total de sessões",
    tokenBreakdownTitle: "Detalhamento de tokens",
    failedToLoadUsageStats: "Falha ao carregar estatísticas de uso. Tente novamente.",
    noUsageDataForPeriod: "Nenhum dado de uso disponível para o período selecionado",
    cacheWriteShort: "Cache E",
    cacheReadShort: "Cache L",
    model: "modelo",
    models: "modelos",
  },

  agents: {
    title: "Agentes CC",
    subtitle: "Gerencie seus agentes Claude Code",
    agentManagement: "Gerenciamento de agentes",
    createNewAgentsOrManage: "Criar novos agentes ou gerenciar execuções de agentes em andamento",
    availableAgents: "Agentes disponíveis",
    runningAgents: "Agentes em execução",
    noAgentsAvailable: "Nenhum agente disponível",
    createFirstAgentToGetStarted: "Crie seu primeiro agente para começar",
    createAgent: "Criar agente",
    agentName: "Nome do agente",
    agentDescription: "Descrição",
    agentPrompt: "Prompt",
    agentIcon: "Ícone",
    agentSettings: "Configurações",
    runAgent: "Executar agente",
    editAgent: "Editar agente",
    deleteAgent: "Excluir agente",
    duplicateAgent: "Duplicar agente",
    shareAgent: "Compartilhar agente",
    importAgent: "Importar agente",
    exportAgent: "Exportar agente",
    noAgents: "Nenhum agente encontrado",
    agentExecution: "Execução do agente",
    executionHistory: "Histórico de execução",
    executionStatus: "Status",
    executionOutput: "Saída",
    executionError: "Erro",
    executionSuccess: "Sucesso",
    executionCancelled: "Cancelado",
    executionRunning: "Em execução",
    executionPending: "Pendente",
    // Traduções da interface de criação de agente
    editCCAgent: "Editar agente CC",
    createCCAgent: "Criar agente CC",
    updateAgent: "Atualizar seu agente Claude Code",
    createNewAgent: "Criar um novo agente Claude Code",
    basicInformation: "Informações básicas",
    model: "Modelo",
    claude4Sonnet: "Claude 4 Sonnet",
    claude4Opus: "Claude 4 Opus",
    claude35Haiku: "Claude 3.5 Haiku",
    claude35Sonnet: "Claude 3.5 Sonnet",
    claude37Sonnet: "Claude 3.7 Sonnet",
    fasterEfficient: "Mais rápido, eficiente para a maioria das tarefas",
    moreCapable: "Mais capaz, melhor para tarefas complexas",
    fastAffordable: "Rápido e acessível, ótimo para tarefas simples",
    balancedPerformance: "Desempenho equilibrado para uso diário",
    advancedReasoning: "Raciocínio avançado para análise complexa",
    // Traduções relacionadas a preços
    pricing: "Preços",
    pricingInfo: "Informações de preços",
    inputTokens: "Tokens de entrada",
    outputTokens: "Tokens de saída",
    cacheWrite: "Escrita de cache",
    cacheRead: "Leitura de cache",
    perMillionTokens: "por milhão de tokens",
    costEfficiency: "Eficiência de custos",
    highEfficiency: "Alta eficiência",
    mediumEfficiency: "Eficiência média",
    lowEfficiency: "Alto desempenho",
    recommendedUseCases: "Casos de uso recomendados",
    costEstimate: "Estimativa de custos",
    pricingDetails: "Detalhes de preços",
    basedOnOfficialPricing: "Baseado nos preços oficiais da Anthropic",
    defaultTask: "Tarefa padrão (Opcional)",
    defaultTaskPlaceholder: "ex., Revisar este código para problemas de segurança",
    defaultTaskDesc: "Isso será usado como espaço reservado de tarefa padrão ao executar o agente",
    systemPrompt: "Prompt do sistema",
    systemPromptDesc: "Defina o comportamento e as capacidades do seu agente CC",
    agentNamePlaceholder: "ex., Assistente de código",
    unsavedChanges: "Você tem alterações não salvas. Tem certeza que deseja sair?",
    agentNameRequired: "Nome do agente é obrigatório",
    systemPromptRequired: "Prompt do sistema é obrigatório",
    failedToCreateAgent: "Falha ao criar agente",
    failedToUpdateAgent: "Falha ao atualizar agente",
    saving: "Salvando...",
    // Novas chaves de tradução da interface de agentes CC
    noAgentsYet: "Ainda não há agentes",
    createFirstAgent: "Crie seu primeiro agente",
    execute: "Executar",
    edit: "Editar",
    export: "Exportar",
    created: "Criado",
    recentExecutions: "Execuções recentes",
    importFromFile: "Importar do arquivo",
    importFromGitHub: "Importar do GitHub",
    agentExportedSuccessfully: "Agente exportado com sucesso",
    agentImportedSuccessfully: "Agente importado com sucesso",
    agentImportedFromGitHub: "Agente importado do GitHub com sucesso",
    deleteAgentTitle: "Excluir agente",
    deleteAgentConfirm: "Tem certeza que deseja excluir este agente?",
    deleteAgentDesc: "Esta ação não pode ser desfeita. O agente será excluído permanentemente.",
    deletingAgent: "Excluindo agente...",
    deleteAgentButton: "Excluir agente",
    cancel: "Cancelar",
    // Chaves de tradução adicionais de agentes CC
    manageAgents: "Gerencie seus agentes Claude Code",
    createCCAgentButton: "Criar agente CC",
    agentDeletedSuccessfully: "Agente excluído com sucesso",
    failedToDeleteAgent: "Falha ao excluir agente",
    failedToLoadAgents: "Falha ao carregar agentes",
    failedToExportAgent: "Falha ao exportar agente",
    failedToImportAgent: "Falha ao importar agente",
    agentCreatedSuccessfully: "Agente criado com sucesso",
    agentUpdatedSuccessfully: "Agente atualizado com sucesso",
    executeAgent: "Executar agente",
    exportAgentToFile: "Exportar agente para .claudia.json",
    fromFile: "Do arquivo",
    fromGitHub: "Do GitHub",
    createFirstAgentDesc: "Crie seu primeiro agente CC para começar",
    ccAgentsTitle: "Agentes CC",
    page: "Página",
    of: "de",
    deleteAgentConfirmation:
      'Tem certeza que deseja excluir o agente "{name}"? Esta ação não pode ser desfeita e removerá permanentemente o agente e todos os seus dados associados.',
    deleting: "Excluindo...",
  },

  // Traduções dos modos de pensamento
  thinkingModes: {
    auto: "Auto",
    autoDescription: "Deixar Claude decidir",
    think: "Pensar",
    thinkDescription: "Raciocínio básico",
    thinkHard: "Pensar Intensamente",
    thinkHardDescription: "Análise mais profunda",
    thinkHarder: "Pensar Mais Intensamente",
    thinkHarderDescription: "Raciocínio extensivo",
    ultrathink: "Ultrapensar",
    ultrathinkDescription: "Computação máxima",
  },

  // Traduções do editor de hooks
  hooks: {
    title: "Configuração de hooks",
    subtitle:
      "Configure comandos shell para executar em vários pontos do ciclo de vida do Claude Code",
    scope: "Escopo",
    projectScope: "Escopo do projeto",
    localScope: "Escopo local",
    userScope: "Escopo do usuário",
    localScopeDesc: "Estas configurações não são confirmadas no controle de versão",
    unsavedChanges: "Você tem alterações não salvas. Clique em Salvar para persistir.",
    validationErrors: "Erros de validação:",
    securityWarnings: "Avisos de segurança:",
    templates: "Modelos",
    preToolUse: "Pré-uso de ferramenta",
    postToolUse: "Pós-uso de ferramenta",
    notification: "Notificação",
    stop: "Parar",
    subagentStop: "Parada de subagente",
    preToolUseDesc: "Executa antes das chamadas de ferramentas, pode bloquear e fornecer feedback",
    postToolUseDesc: "Executa após a conclusão bem-sucedida da ferramenta",
    notificationDesc: "Personaliza notificações quando Claude precisa de atenção",
    stopDesc: "Executa quando Claude termina de responder",
    subagentStopDesc: "Executa quando um subagente Claude (Tarefa) termina",
    pattern: "Padrão",
    patternPlaceholder: "ex., Bash, Edit|Write, mcp__.*",
    patternTooltip:
      "Padrão de nome de ferramenta (regex suportado). Deixe vazio para corresponder a todas as ferramentas.",
    commonPatterns: "Padrões comuns",
    custom: "Personalizado",
    commands: "Comandos",
    addCommand: "Adicionar comando",
    noCommandsAdded: "Nenhum comando adicionado ainda",
    commandPlaceholder: "Digite o comando shell...",
    seconds: "segundos",
    noHooksConfigured: "Nenhum hook configurado para este evento",
    addHook: "Adicionar hook",
    addMatcher: "Adicionar correspondente",
    removeMatcher: "Remover correspondente",
    removeCommand: "Remover comando",
    loadingHooks: "Carregando configuração de hooks...",
    savingHooks: "Salvando...",
    hooksConfiguration: "Configuração de hooks",
    chooseTemplate: "Escolha um modelo de hook pré-configurado para começar rapidamente",
  },

  // Traduções do gerenciador de comandos slash
  commands: {
    title: "Comandos slash",
    subtitle: "Crie comandos personalizados para otimizar seu fluxo de trabalho",
    projectCommands: "Comandos slash do projeto",
    projectCommandsDesc: "Crie comandos personalizados para este projeto",
    newCommand: "Novo comando",
    searchCommands: "Pesquisar comandos...",
    allCommands: "Todos os comandos",
    project: "Projeto",
    user: "Usuário",
    noCommandsFound: "Nenhum comando encontrado",
    noProjectCommands: "Nenhum comando de projeto criado ainda",
    noCommandsCreated: "Nenhum comando criado ainda",
    createFirstProjectCommand: "Crie seu primeiro comando de projeto",
    createFirstCommand: "Crie seu primeiro comando",
    editCommand: "Editar comando",
    createNewCommand: "Criar novo comando",
    commandName: "Nome do comando",
    commandNamePlaceholder: "ex., review, fix-issue",
    namespace: "Namespace (Opcional)",
    namespacePlaceholder: "ex., frontend, backend",
    description: "Descrição (Opcional)",
    descriptionPlaceholder: "Breve descrição do que este comando faz",
    commandContent: "Conteúdo do comando",
    contentPlaceholder: "Digite o conteúdo do prompt. Use $ARGUMENTS para valores dinâmicos.",
    contentDesc:
      "Use $ARGUMENTS para entrada do usuário, @filename para arquivos e !`command` para comandos bash",
    allowedTools: "Ferramentas permitidas",
    allowedToolsDesc: "Selecione quais ferramentas Claude pode usar com este comando",
    examples: "Exemplos",
    preview: "Visualização",
    arguments: "Argumentos",
    deleteCommand: "Excluir comando",
    deleteCommandConfirm: "Tem certeza que deseja excluir este comando?",
    deleteCommandDesc:
      "Esta ação não pode ser desfeita. O arquivo de comando será excluído permanentemente.",
    deleting: "Excluindo...",
    scope: "Escopo",
    userGlobal: "Usuário (Global)",
    availableAcrossProjects: "Disponível em todos os projetos",
    onlyAvailableInProject: "Disponível apenas neste projeto",
    userCommands: "Comandos do usuário",
    tools: "ferramentas",
    bash: "Bash",
    files: "Arquivos",
    showContent: "Mostrar conteúdo",
    hideContent: "Ocultar conteúdo",
  },

  // Traduções da interface NFO
  nfo: {
    title: "CLAUDIA.NFO",
    credits: "CRÉDITOS",
    poweredBy: "DESENVOLVIDO POR",
    runtime: "RUNTIME",
    uiFramework: "FRAMEWORK UI",
    styling: "ESTILIZAÇÃO",
    animations: "ANIMAÇÕES",
    buildTool: "FERRAMENTA DE BUILD",
    packageManager: "GERENCIADOR DE PACOTES",
    specialThanks: "AGRADECIMENTOS ESPECIAIS",
    openSourceCommunity: "À comunidade de código aberto",
    betaTesters: "A todos os testadores beta",
    believers: "A todos que acreditaram neste projeto",
    sharing: "Lembre-se: Compartilhar é cuidar!",
    support: "Apoie os desenvolvedores!",
    fileABug: "Reportar um bug",
    strategicProject: "Um projeto estratégico da Asterisk",
    dependencies: "DEPENDÊNCIAS",
  },

  // Traduções da interface de armazenamento
  storage: {
    title: "Gerenciamento de armazenamento",
    subtitle: "Gerenciar dados e cache do Claude Code",
    totalSize: "Tamanho total",
    projects: "Projetos",
    sessions: "Sessões",
    cache: "Cache",
    logs: "Logs",
    settings: "Configurações",
    cleanup: "Limpeza",
    cleanupDesc: "Excluir dados de sessão antigos e arquivos de cache",
    cleanupOlderThan: "Limpar mais antigos que",
    days: "dias",
    cleanupNow: "Limpar agora",
    cleanupSuccess: "Limpeza bem-sucedida",
    cleanupError: "Falha na limpeza",
    calculating: "Calculando...",
    noData: "Sem dados",
    storageLocation: "Local de armazenamento",
    openInFinder: "Abrir no gerenciador de arquivos",
    exportData: "Exportar dados",
    importData: "Importar dados",
    backupData: "Fazer backup dos dados",
    restoreData: "Restaurar dados",
    dataIntegrity: "Integridade dos dados",
    checkIntegrity: "Verificar integridade",
    repairData: "Reparar dados",
    integrityCheck: "Verificação de integridade",
    integrityOk: "A integridade dos dados está boa",
    integrityIssues: "Problemas de integridade de dados encontrados",
    autoCleanup: "Limpeza automática",
    autoCleanupDesc: "Excluir automaticamente dados antigos com mais de dias especificados",
    enableAutoCleanup: "Ativar limpeza automática",
    cleanupInterval: "Intervalo de limpeza",

    // Traduções específicas de armazenamento de banco de dados
    databaseStorage: "Armazenamento de banco de dados",
    sqlQuery: "Consulta SQL",
    resetDB: "Redefinir BD",
    selectTable: "Selecionar uma tabela",
    searchInTable: "Pesquisar na tabela...",
    newRow: "Nova linha",
    rows: "linhas",
    actions: "Ações",
    editRow: "Editar linha",
    updateRowDesc: "Atualizar os valores para esta linha na tabela {table}.",
    primaryKey: "Chave primária",
    type: "Tipo",
    notNull: "NOT NULL",
    default: "Padrão",
    cancel: "Cancelar",
    update: "Atualizar",
    newRowTitle: "Nova linha",
    addNewRowDesc: "Adicionar uma nova linha à tabela {table}.",
    required: "Obrigatório",
    insert: "Inserir",
    deleteRow: "Excluir linha",
    deleteRowConfirm: "Tem certeza que deseja excluir esta linha? Esta ação não pode ser desfeita.",
    delete: "Excluir",
    resetDatabase: "Redefinir banco de dados",
    resetDatabaseDesc:
      "Isso excluirá todos os dados e recriará o banco de dados com sua estrutura padrão (tabelas vazias para agents, agent_runs e app_settings). O banco de dados será restaurado para o mesmo estado de quando você instalou o aplicativo pela primeira vez. Esta ação não pode ser desfeita.",
    resetWarning:
      "Todos os seus agentes, execuções e configurações serão excluídos permanentemente!",
    sqlQueryEditor: "Editor de consulta SQL",
    sqlQueryEditorDesc: "Execute consultas SQL brutas no banco de dados. Use com cautela.",
    sqlQueryPlaceholder: "SELECT * FROM agents LIMIT 10;",
    queryExecutedSuccess: "Consulta executada com sucesso. {count} linhas afetadas.",
    lastInsertId: "Último ID inserido: {id}",
    showingRows: "Mostrando {start} a {end} de {total} linhas",
    page: "Página {current} de {total}",
    previous: "Anterior",
    next: "Próximo",
    failedToLoadTables: "Falha ao carregar tabelas",
    failedToLoadTableData: "Falha ao carregar dados da tabela",
    failedToUpdateRow: "Falha ao atualizar linha",
    failedToDeleteRow: "Falha ao excluir linha",
    failedToInsertRow: "Falha ao inserir linha",
    failedToExecuteSQL: "Falha ao executar SQL",
    failedToResetDatabase: "Falha ao redefinir banco de dados",
    databaseResetComplete:
      "Redefinição de banco de dados concluída: O banco de dados foi restaurado para seu estado padrão com tabelas vazias (agents, agent_runs, app_settings).",
    resetFailed: "Falha na redefinição: Falha ao redefinir o banco de dados. Tente novamente.",
    nullValue: "NULL",
    trueValue: "verdadeiro",
    falseValue: "falso",
  },
};
