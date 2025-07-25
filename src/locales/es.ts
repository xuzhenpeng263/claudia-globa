import type { Translations } from "@/lib/i18n";

export const es: Translations = {
  common: {
    save: "Guardar",
    cancel: "Cancelar",
    delete: "Eliminar",
    edit: "Editar",
    add: "Añadir",
    remove: "Quitar",
    back: "Atrás",
    next: "Siguiente",
    previous: "Anterior",
    loading: "Cargando",
    error: "Error",
    success: "Éxito",
    warning: "Advertencia",
    info: "Información",
    confirm: "Confirmar",
    yes: "Sí",
    no: "No",
    ok: "OK",
    close: "Cerrar",
    open: "Abrir",
    settings: "Configuración",
    search: "Buscar",
    filter: "Filtrar",
    sort: "Ordenar",
    refresh: "Actualizar",
    copy: "Copiar",
    select: "Seleccionar",
    clear: "Limpiar",
    reset: "Restablecer",
    apply: "Aplicar",
    submit: "Enviar",
    create: "Crear",
    update: "Actualizar",
    upload: "Subir",
    download: "Descargar",
    import: "Importar",
    export: "Exportar",
    help: "Ayuda",
    about: "Acerca de",
    version: "Versión",
    language: "Idioma",
    email: "Correo electrónico",
    password: "Contraseña",
    username: "Nombre de usuario",
    name: "Nombre",
    date: "Fecha",
    time: "Hora",
    dateTime: "Fecha y hora",
    today: "Hoy",
  },

  app: {
    title: "Claudia",
    welcomeTitle: "Bienvenido a Claudia",
    welcomeSubtitle: "Tu asistente de desarrollo impulsado por IA",
    ccAgents: "Agentes CC",
    ccProjects: "Proyectos CC",
    backToHome: "Volver al inicio",
    newSession: "Nueva sesión",
    usageDashboard: "Panel de uso",
    mcp: "MCP",
    claudeMd: "CLAUDE.md",
  },

  // CLAUDE.md Editor
  claudemd: {
    title: "CLAUDE.md",
    subtitle: "Edita tu prompt del sistema de Claude Code",
    editSystemPrompt: "Edita tu prompt del sistema de Claude Code",
    editProjectPrompt: "Edita el prompt del sistema específico del proyecto de Claude Code",
    failedToLoad: "Error al cargar el archivo CLAUDE.md",
    failedToSave: "Error al guardar el archivo CLAUDE.md",
    savedSuccessfully: "CLAUDE.md guardado exitosamente",
    unsavedChanges: "Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?",
    memories: "Memorias CLAUDE.md",
    noFilesFound: "No se encontraron archivos CLAUDE.md en este proyecto",
    loadingFiles: "Cargando archivos...",
    failedToLoadFiles: "Error al cargar archivos CLAUDE.md",
  },

  projects: {
    title: "Proyectos CC",
    subtitle: "Explora tus sesiones de Claude Code",
    noProjects: "No se encontraron proyectos en ~/.claude/projects",
    projectName: "Nombre del proyecto",
    projectPath: "Ruta del proyecto",
    createdAt: "Creado el",
    sessions: "Sesiones",
    newClaudeCodeSession: "Nueva sesión de Claude Code",
    runningClaudeSessions: "Sesiones de Claude en ejecución",
    hooks: "Hooks",
    projectSettings: "Configuración del proyecto",
  },

  sessions: {
    title: "Sesiones",
    noSessions: "No se encontraron sesiones",
    sessionName: "Nombre de la sesión",
    lastModified: "Última modificación",
    messages: "Mensajes",
    tokens: "Tokens",
    cost: "Costo",
    status: "Estado",
    active: "Activo",
    completed: "Completado",
    failed: "Fallido",
    cancelled: "Cancelado",
    claudeCodeSession: "Sesión de Claude Code",
    commands: "Comandos",
    copyOutput: "Copiar Salida",
    slashCommands: "Comandos Slash",
    manageProjectSpecificSlashCommands: "Gestionar comandos slash específicos del proyecto para",
    checkpointSettings: "Configuración de Puntos de Control",
    close: "Cerrar",
    experimentalFeature: "Función Experimental",
    checkpointingWarning:
      "Los puntos de control pueden afectar la estructura del directorio o causar pérdida de datos. Usar con precaución.",
    automaticCheckpoints: "Puntos de Control Automáticos",
    automaticCheckpointsDesc:
      "Crear automáticamente puntos de control basados en la estrategia seleccionada",
    checkpointStrategy: "Estrategia de Puntos de Control",
    smartRecommended: "Inteligente (Recomendado)",
    smartStrategyDesc: "Se crearán puntos de control después de operaciones destructivas",
    saveSettings: "Guardar Configuración",
    storageManagement: "Gestión de Almacenamiento",
    totalCheckpoints: "Total de puntos de control",
    keepRecentCheckpoints: "Mantener Puntos de Control Recientes",
    cleanUp: "Limpiar",
    removeOldCheckpoints: "Eliminar puntos de control antiguos, manteniendo solo los más recientes",
    sessionTimeline: "Línea de Tiempo de la Sesión",
    timeline: "Línea de Tiempo",
    noCheckpointsYet: "Aún no hay puntos de control",
    loadingTimeline: "Cargando línea de tiempo...",
    copyAsMarkdown: "Copiar como Markdown",
    copyAsJsonl: "Copiar como JSONL",
    checkpointSettingsTooltip: "Configuración de Puntos de Control",
    timelineNavigatorTooltip: "Navegador de Línea de Tiempo",
  },

  settings: {
    title: "Configuración",
    subtitle: "Configura las preferencias de Claude Code",
    saveSettings: "Guardar configuración",
    saving: "Guardando...",
    settingsSaved: "¡Configuración guardada exitosamente!",
    failedToSave: "Error al guardar la configuración",

    general: "General",
    permissions: "Permisos",
    environment: "Entorno",
    advanced: "Avanzado",
    hooks: "Hooks",
    commands: "Comandos",
    storage: "Almacenamiento",

    generalSettings: "Configuración general",
    includeCoAuthoredBy: 'Incluir "Co-autoría de Claude"',
    includeCoAuthoredByDesc: "Añadir atribución de Claude a commits de git y pull requests",
    verboseOutput: "Salida detallada",
    verboseOutputDesc: "Mostrar salidas completas de bash y comandos",
    chatRetention: "Retención de transcripciones de chat (días)",
    chatRetentionDesc:
      "Tiempo para retener transcripciones de chat localmente (por defecto: 30 días)",
    claudeInstallation: "Instalación de Claude Code",
    claudeInstallationDesc:
      "Selecciona qué instalación de Claude Code usar. Se recomienda la versión incluida para mejor compatibilidad.",
    choosePreferredInstallation:
      "Elige tu instalación preferida de Claude Code. Se recomienda la versión empaquetada para mejor compatibilidad.",
    availableInstallations: "Instalaciones Disponibles",
    selectedInstallation: "Instalación Seleccionada",
    bundled: "Empaquetada",
    system: "Sistema",
    custom: "Personalizada",
    path: "Ruta",
    source: "Fuente",
    version: "Versión",
    claudeCodeBundled: "Claude Code (Empaquetada)",
    loadingInstallations: "Cargando instalaciones disponibles...",
    selectClaudeInstallation: "Seleccionar instalación de Claude",
    pleaseSelectInstallation: "Por favor selecciona una instalación de Claude",
    multipleInstallationsFound:
      "Se encontraron múltiples instalaciones de Claude Code en tu sistema. Por favor selecciona cuál te gustaría usar.",
    claudeNotFoundInLocations:
      "Claude Code no se encontró en ninguna de las ubicaciones de instalación comunes. Por favor instala Claude Code para continuar.",
    searchingForInstallations: "Buscando instalaciones de Claude...",
    installationGuide: "Guía de Instalación",
    saveSelection: "Guardar Selección",
    noInstallationsFound: "No se Encontraron Instalaciones",
    validating: "Validando...",
    binaryPathChanged:
      "⚠️ La ruta del binario de Claude ha cambiado. Recuerda guardar tu configuración.",

    permissionRules: "Reglas de permisos",
    permissionRulesDesc: "Controla qué herramientas puede usar Claude Code sin aprobación manual",
    allowRules: "Reglas de permitir",
    denyRules: "Reglas de denegar",
    addRule: "Añadir regla",
    noAllowRules:
      "No hay reglas de permitir configuradas. Claude pedirá aprobación para todas las herramientas.",
    noDenyRules: "No hay reglas de denegar configuradas.",
    permissionExamples: "Ejemplos:",

    environmentVariables: "Variables de entorno",
    environmentVariablesDesc: "Variables de entorno aplicadas a cada sesión de Claude Code",
    addVariable: "Añadir variable",
    noEnvironmentVariables: "No hay variables de entorno configuradas.",
    commonVariables: "Variables comunes:",

    advancedSettings: "Configuración avanzada",
    advancedSettingsDesc: "Opciones de configuración adicionales para usuarios avanzados",
    apiKeyHelper: "Script auxiliar de clave API",
    apiKeyHelperDesc:
      "Script personalizado para generar valores de autenticación para solicitudes API",
    rawSettings: "Configuración sin procesar (JSON)",
    rawSettingsDesc: "Esto muestra el JSON sin procesar que se guardará en ~/.claude/settings.json",

    // Configuración de notificaciones de audio
    audioNotifications: "Notificaciones de Audio",
    audioNotificationsDesc: "Configurar alertas de audio para la finalización de tareas",
    audioNotificationMode: "Modo de Notificación",
    audioNotificationModeDesc: "Elige cuándo reproducir notificaciones de audio",
    audioModeOff: "Desactivado",
    audioModeOnMessage: "Al Completar Mensaje",
    audioModeOnQueue: "Al Completar Cola",
    audioModeOffDesc: "Sin notificaciones de audio",
    audioModeOnMessageDesc: "Reproducir sonido cuando se complete cada tarea de mensaje",
    audioModeOnQueueDesc: "Reproducir sonido cuando se completen todas las tareas en cola",
    testAudio: "Probar Audio",
    testAudioDesc: "Probar reproducción de notificación de audio",
    playTestSound: "Reproducir Sonido de Prueba",

    userHooks: "Hooks de usuario",
    userHooksDesc:
      "Configura hooks que se aplican a todas las sesiones de Claude Code para tu cuenta de usuario. Estos se almacenan en ~/.claude/settings.json",

    // Ejemplos de permisos
    allowAllBashCommands: "Permitir todos los comandos bash",
    allowExactCommand: "Permitir comando exacto",
    allowCommandsWithPrefix: "Permitir comandos con prefijo",
    allowReadingSpecificFile: "Permitir lectura de archivo específico",
    allowEditingFilesInDocsDirectory: "Permitir edición de archivos en directorio docs",

    // Ejemplos de variables de entorno
    enableDisableTelemetry: "Habilitar/deshabilitar telemetría (0 o 1)",
    customModelName: "Nombre de modelo personalizado",
    disableCostWarnings: "Deshabilitar advertencias de costo (1)",

    // Configuración de escala de fuente
    fontScale: "Tamaño de fuente",
    fontScaleDesc: "Ajustar el tamaño de fuente de la interfaz para pantallas de alta resolución o mejorar la legibilidad",
    fontScaleSmall: "Pequeña",
    fontScaleNormal: "Normal",
    fontScaleLarge: "Grande",
    fontScaleExtraLarge: "Extra grande",
    fontScaleCustom: "Personalizada",
    fontScaleSmallDesc: "Fuentes más pequeñas para pantallas de alta densidad",
    fontScaleNormalDesc: "Tamaño de fuente estándar",
    fontScaleLargeDesc: "Fuentes más grandes para mejorar la legibilidad",
    fontScaleExtraLargeDesc: "Tamaño de fuente máximo para pantallas de alta resolución",
    fontScaleCustomDesc: "Multiplicador de escala personalizado",
    customMultiplier: "Multiplicador personalizado",
    customMultiplierDesc: "Ingrese un multiplicador de escala de fuente personalizado (0.5x - 3.0x)",
    customMultiplierPlaceholder: "ej. 1.5",
    customMultiplierRange: "Rango: 0.5x a 3.0x",

    // Otras claves faltantes
    examples: "Ejemplos:",
    failedToLoadSettings:
      "Error al cargar configuración. Por favor asegúrate de que el directorio ~/.claude existe.",
    settingsSavedSuccessfully: "¡Configuración guardada exitosamente!",
    failedToSaveSettings: "Error al guardar configuración",
    refresh: "Actualizar",
  },

  claude: {
    claudeNotFound: "Claude Code no encontrado",
    claudeNotFoundDesc: "No se encontró la instalación de Claude Code en tu sistema",
    selectClaudeInstallation: "Seleccionar instalación de Claude",
    installClaude: "Instalar Claude Code",
    checking: "Verificando...",
    claudeCode: "Claude Code",
    claudeVersion: "Claude Code v{version}",
    claudeStreaming: "Claude está transmitiendo",
    claudeStreamingWarning:
      "Claude aún está respondiendo. Si navegas fuera, Claude continuará ejecutándose en segundo plano.\n\nPuedes volver a esta sesión desde la vista de Proyectos.\n\n¿Quieres continuar?",
    continueNavigation: "Continuar navegación",
  },

  messages: {
    failedToLoadProjects:
      "Error al cargar proyectos. Por favor asegúrate de que el directorio ~/.claude existe.",
    failedToLoadSessions: "Error al cargar sesiones para este proyecto.",
    ensureClaudeDirectory: "Por favor asegúrate de que el directorio ~/.claude existe.",
    projectLoadError: "Error al cargar el proyecto",
    sessionLoadError: "Error al cargar la sesión",
    saveSuccess: "Guardado exitosamente",
    saveError: "Error al guardar",
    deleteSuccess: "Eliminado exitosamente",
    deleteError: "Error al eliminar",
    copySuccess: "Copiado al portapapeles",
    copyError: "Error al copiar",
    uploadSuccess: "Subido exitosamente",
    uploadError: "Error al subir",
    downloadSuccess: "Descargado exitosamente",
    downloadError: "Error al descargar",
    networkError: "Error de red",
    serverError: "Error del servidor",
    validationError: "Error de validación",
    permissionError: "Permiso denegado",
    notFoundError: "No encontrado",
    timeoutError: "Tiempo de espera agotado",
    unknownError: "Error desconocido",
  },

  validation: {
    required: "Este campo es obligatorio",
  },

  time: {
    justNow: "Ahora mismo",
    minutesAgo: "hace {count} minutos",
    hoursAgo: "hace {count} horas",
    daysAgo: "hace {count} días",
  },

  mcp: {
    title: "Gestor MCP",
    subtitle: "Gestionar servidores del Protocolo de Contexto de Modelo",
    servers: "Servidores",
    addServer: "Añadir servidor",
    serverName: "Nombre del servidor",
    serverCommand: "Comando",
    serverArgs: "Argumentos",
    serverEnv: "Entorno",
    enabled: "Habilitado",
    disabled: "Deshabilitado",
    autoApprove: "Aprobación automática",
    importExport: "Importar/Exportar",
    importConfig: "Importar configuración",
    exportConfig: "Exportar configuración",
    noServers: "No hay servidores MCP configurados",
    serverStatus: "Estado del servidor",
    connected: "Conectado",
    disconnected: "Desconectado",
    connecting: "Conectando",
    error: "Error",
    // Additional MCP translations
    mcpServers: "Servidores MCP",
    manageServers: "Gestionar Servidores",
    serverConfiguration: "Configuración del Servidor",
    addNewServer: "Añadir Nuevo Servidor",
    editServer: "Editar Servidor",
    removeServer: "Quitar Servidor",
    serverDetails: "Detalles del Servidor",
    connectionStatus: "Estado de Conexión",
    serverLogs: "Registros del Servidor",
    testConnection: "Probar Conexión",
    reconnect: "Reconectar",
    disconnect: "Desconectar",
    serverPort: "Puerto del Servidor",
    serverHost: "Host del Servidor",
    authToken: "Token de Autenticación",
    timeout: "Tiempo de Espera",
    retryAttempts: "Intentos de Reintento",
    enableLogging: "Habilitar Registro",
    logLevel: "Nivel de Registro",
    serverType: "Tipo de Servidor",
    protocol: "Protocolo",
    version: "Versión",
    capabilities: "Capacidades",
    tools: "Herramientas",
    resources: "Recursos",
    prompts: "Prompts",
    sampling: "Muestreo",
    roots: "Raíces",
    experimental: "Experimental",
    serverInfo: "Información del Servidor",
    lastSeen: "Última Vez Visto",
    uptime: "Tiempo de Actividad",
    requestCount: "Conteo de Solicitudes",
    errorCount: "Conteo de Errores",
    averageResponseTime: "Tiempo de Respuesta Promedio",
    // 添加缺失的MCP翻译键
    serverNameRequired: "El nombre del servidor es obligatorio",
    commandRequired: "El comando es obligatorio",
    urlRequired: "La URL es obligatoria",
    uniqueServerName: "Nombre único para identificar este servidor",
    command: "Comando",
    commandToExecute: "Comando para ejecutar el servidor",
    commandArguments: "Argumentos del comando (opcional)",
    spaceSeparatedArgs: "Argumentos del comando separados por espacios",
    scope: "Ámbito",
    localProjectOnly: "Local (solo este proyecto)",
    projectSharedMcp: "Proyecto (compartido vía .mcp.json)",
    userAllProjects: "Usuario (todos los proyectos)",
    environmentVariables: "Variables de entorno",
    addVariable: "Agregar variable",
    addStdioServer: "Agregar servidor Stdio",
    addSseServer: "Agregar servidor SSE",
    addingServer: "Agregando servidor...",
    stdio: "Stdio",
    sse: "SSE",
    url: "URL",
    sseEndpointUrl: "URL del endpoint SSE",
    exampleCommands: "Comandos de ejemplo",
    addMcpServer: "Agregar servidor MCP",
    configureMcpServer: "Configurar un nuevo servidor de Protocolo de Contexto de Modelo",
    // MCPServerList相关
    configuredServers: "Servidores configurados",
    serversConfigured: "{count} servidores configurados",
    refresh: "Actualizar",
    noMcpServersConfigured: "No hay servidores MCP configurados",
    addServerToGetStarted:
      "Agregar un servidor para comenzar con el Protocolo de Contexto de Modelo",
    running: "Ejecutándose",
    showFull: "Mostrar completo",
    hide: "Ocultar",
    environmentVariablesCount: "Variables de entorno: {count}",
    arguments: "Argumentos",
    copy: "Copiar",
    copied: "¡Copiado!",
    localProjectSpecific: "Local (específico del proyecto)",
    projectSharedViaMcp: "Proyecto (compartido vía .mcp.json)",
    userAllProjectsScope: "Usuario (todos los proyectos)",
    // MCPImportExport相关
    importExportTitle: "Importar y exportar",
    importExportSubtitle: "Importar servidores MCP de otras fuentes o exportar tu configuración",
    importScope: "Ámbito de importación",
    chooseImportScope: "Elegir dónde guardar los servidores importados desde archivos JSON",
    importFromClaudeDesktop: "Importar desde Claude Desktop",
    importFromClaudeDesktopDesc:
      "Importar automáticamente todos los servidores MCP desde Claude Desktop. Se instala en el ámbito de usuario (disponible en todos los proyectos).",
    importing: "Importando...",
    importFromJson: "Importar desde JSON",
    importFromJsonDesc: "Importar configuraciones de servidor desde archivos JSON",
    chooseJsonFile: "Elegir archivo JSON",
    exportConfiguration: "Exportar configuración",
    exportConfigurationDesc: "Exportar tu configuración de servidor MCP",
    exportComingSoon: "Exportar (próximamente)",
    useClaudeCodeAsMcp: "Usar Claude Code como servidor MCP",
    useClaudeCodeAsMcpDesc:
      "Iniciar Claude Code como un servidor MCP al que otras aplicaciones pueden conectarse",
    startMcpServer: "Iniciar servidor MCP",
    jsonFormatExamples: "Ejemplos de formato JSON",
    singleServer: "Servidor único:",
    multipleServers: "Múltiples servidores (formato .mcp.json):",
    invalidJsonFile: "Archivo JSON inválido. Por favor verifica el formato.",
    enterServerName: "Ingresa un nombre para este servidor:",
    unrecognizedJsonFormat:
      "Formato JSON no reconocido. Se esperaba configuración de servidor MCP.",
    failedToImportJson: "Error al importar archivo JSON",
    exportFunctionalityComingSoon: "¡Funcionalidad de exportación próximamente!",
    claudeCodeMcpServerStarted:
      "Servidor MCP de Claude Code iniciado. Ahora puedes conectarte desde otras aplicaciones.",
    failedToStartMcpServer: "Error al iniciar Claude Code como servidor MCP",
    successfullyImported: "Importado exitosamente: {servers}",
    failedToImportSomeServers: "Error al importar algunos servidores:\n{details}",
    failedToImportFromClaudeDesktop: "Error al importar desde Claude Desktop",
    // MCPManager相关
    failedToLoadServers:
      "Error al cargar servidores MCP. Por favor asegúrate de que Claude Code esté instalado.",
    serverAddedSuccessfully: "¡Servidor MCP agregado exitosamente!",
    serverRemovedSuccessfully: '¡Servidor "{name}" eliminado exitosamente!',
    importedServersSuccess: "¡{count} servidores importados exitosamente!",
    importedServersPartial: "{imported} servidores importados, {failed} fallaron",
    mcpManagerTitle: "Servidores MCP",
    mcpManagerSubtitle: "Gestionar servidores de Protocolo de Contexto de Modelo",
  },

  usage: {
    title: "Panel de uso",
    subtitle: "Monitorea tu uso y costos de Claude Code",
    totalTokens: "Tokens totales",
    totalCost: "Costo total",
    sessionsCount: "Sesiones",
    averageCost: "Costo promedio",
    dailyUsage: "Uso diario",
    weeklyUsage: "Uso semanal",
    monthlyUsage: "Uso mensual",
    yearlyUsage: "Uso anual",
    topProjects: "Proyectos principales",
    recentActivity: "Actividad reciente",
    costBreakdown: "Desglose de costos",
    tokenBreakdown: "Desglose de tokens",
    noData: "No hay datos de uso disponibles",
    refreshData: "Actualizar datos",
    // 新增使用情况仪表板翻译键
    loadingStats: "Cargando estadísticas de uso...",
    tryAgain: "Intentar de nuevo",
    allTime: "Todo el tiempo",
    last7Days: "Últimos 7 días",
    last30Days: "Últimos 30 días",
    overview: "Resumen",
    byModel: "Por modelo",
    byProject: "Por proyecto",
    bySessions: "Por sesiones",
    timeline: "Línea de tiempo",
    inputTokens: "Tokens de entrada",
    outputTokens: "Tokens de salida",
    cacheWrite: "Escritura de caché",
    cacheRead: "Lectura de caché",
    mostUsedModels: "Modelos más utilizados",
    usageByModel: "Uso por modelo",
    usageByProject: "Uso por proyecto",
    usageBySession: "Uso por sesión",
    dailyUsageOverTime: "Uso diario a lo largo del tiempo",
    noUsageData: "No hay datos de uso disponibles",
    sessions: "sesiones",
    tokens: "tokens",
    input: "Entrada",
    output: "Salida",
    avgCostPerSession: "Costo promedio por sesión",
    modelsUsed: "Modelos utilizados",
    // 新增缺失的翻译键
    trackUsageAndCosts: "Rastrea el uso y costos de Claude Code",
    totalSessions: "Total de Sesiones",
    tokenBreakdownTitle: "Desglose de Tokens",
    failedToLoadUsageStats: "Error al cargar estadísticas de uso. Inténtalo de nuevo.",
    noUsageDataForPeriod: "No hay datos de uso disponibles para el período seleccionado",
    cacheWriteShort: "Cache E",
    cacheReadShort: "Cache L",
    model: "modelo",
    models: "modelos",
  },

  agents: {
    title: "Agentes CC",
    subtitle: "Gestiona tus agentes de Claude Code",
    agentManagement: "Gestión de agentes",
    createNewAgentsOrManage: "Crear nuevos agentes o gestionar ejecuciones de agentes en curso",
    availableAgents: "Agentes disponibles",
    runningAgents: "Agentes en ejecución",
    noAgentsAvailable: "No hay agentes disponibles",
    createFirstAgentToGetStarted: "Crea tu primer agente para comenzar",
    createAgent: "Crear agente",
    agentName: "Nombre del agente",
    agentDescription: "Descripción",
    agentPrompt: "Prompt",
    agentIcon: "Icono",
    agentSettings: "Configuración",
    runAgent: "Ejecutar agente",
    editAgent: "Editar agente",
    deleteAgent: "Eliminar agente",
    duplicateAgent: "Duplicar agente",
    shareAgent: "Compartir agente",
    importAgent: "Importar agente",
    exportAgent: "Exportar agente",
    noAgents: "No se encontraron agentes",
    agentExecution: "Ejecución del agente",
    executionHistory: "Historial de ejecución",
    executionStatus: "Estado",
    executionOutput: "Salida",
    executionError: "Error",
    executionSuccess: "Éxito",
    executionCancelled: "Cancelado",
    executionRunning: "Ejecutándose",
    executionPending: "Pendiente",
    // Create Agent interface translations
    editCCAgent: "Editar Agente CC",
    createCCAgent: "Crear Agente CC",
    updateAgent: "Actualiza tu agente de Claude Code",
    createNewAgent: "Crear un nuevo agente de Claude Code",
    basicInformation: "Información Básica",
    model: "Modelo",
    claude4Sonnet: "Claude 4 Sonnet",
    claude4Opus: "Claude 4 Opus",
    claude35Haiku: "Claude 3.5 Haiku",
    claude35Sonnet: "Claude 3.5 Sonnet",
    claude37Sonnet: "Claude 3.7 Sonnet",
    fasterEfficient: "Más rápido, eficiente para la mayoría de tareas",
    moreCapable: "Más capaz, mejor para tareas complejas",
    fastAffordable: "Rápido y asequible, ideal para tareas simples",
    balancedPerformance: "Rendimiento equilibrado para uso diario",
    advancedReasoning: "Razonamiento avanzado para análisis complejos",
    // Traducciones relacionadas con precios
    pricing: "Precios",
    pricingInfo: "Información de precios",
    inputTokens: "Tokens de entrada",
    outputTokens: "Tokens de salida",
    cacheWrite: "Escritura de caché",
    cacheRead: "Lectura de caché",
    perMillionTokens: "por millón de tokens",
    costEfficiency: "Eficiencia de costos",
    highEfficiency: "Alta eficiencia",
    mediumEfficiency: "Eficiencia media",
    lowEfficiency: "Alto rendimiento",
    recommendedUseCases: "Casos de uso recomendados",
    costEstimate: "Estimación de costos",
    pricingDetails: "Detalles de precios",
    basedOnOfficialPricing: "Basado en precios oficiales de Anthropic",
    defaultTask: "Tarea Predeterminada (Opcional)",
    defaultTaskPlaceholder: "ej., Revisar este código por problemas de seguridad",
    defaultTaskDesc:
      "Esto se usará como marcador de posición de tarea predeterminada al ejecutar el agente",
    systemPrompt: "Prompt del Sistema",
    systemPromptDesc: "Define el comportamiento y capacidades de tu Agente CC",
    agentNamePlaceholder: "ej., Asistente de Código",
    unsavedChanges: "Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?",
    agentNameRequired: "El nombre del agente es requerido",
    systemPromptRequired: "El prompt del sistema es requerido",
    failedToCreateAgent: "Error al crear agente",
    failedToUpdateAgent: "Error al actualizar agente",
    saving: "Guardando...",
    // 新增 CC 智能体界面翻译键
    noAgentsYet: "Aún no hay agentes",
    createFirstAgent: "Crea tu primer agente",
    execute: "Ejecutar",
    edit: "Editar",
    export: "Exportar",
    created: "Creado",
    recentExecutions: "Ejecuciones recientes",
    importFromFile: "Importar desde archivo",
    importFromGitHub: "Importar desde GitHub",
    agentExportedSuccessfully: "Agente exportado exitosamente",
    agentImportedSuccessfully: "Agente importado exitosamente",
    agentImportedFromGitHub: "Agente importado desde GitHub exitosamente",
    deleteAgentTitle: "Eliminar agente",
    deleteAgentConfirm: "¿Estás seguro de que quieres eliminar este agente?",
    deleteAgentDesc: "Esta acción no se puede deshacer. El agente será eliminado permanentemente.",
    deletingAgent: "Eliminando agente...",
    deleteAgentButton: "Eliminar agente",
    cancel: "Cancelar",
    // 额外的 CC 智能体翻译键
    manageAgents: "Gestiona tus agentes de Claude Code",
    createCCAgentButton: "Crear Agente CC",
    agentDeletedSuccessfully: "Agente eliminado exitosamente",
    failedToDeleteAgent: "Error al eliminar agente",
    failedToLoadAgents: "Error al cargar agentes",
    failedToExportAgent: "Error al exportar agente",
    failedToImportAgent: "Error al importar agente",
    agentCreatedSuccessfully: "Agente creado exitosamente",
    agentUpdatedSuccessfully: "Agente actualizado exitosamente",
    executeAgent: "Ejecutar agente",
    exportAgentToFile: "Exportar agente a .claudia.json",
    fromFile: "Desde archivo",
    fromGitHub: "Desde GitHub",
    createFirstAgentDesc: "Crea tu primer Agente CC para comenzar",
    ccAgentsTitle: "Agentes CC",
    page: "Página",
    of: "de",
    deleteAgentConfirmation:
      '¿Estás seguro de que quieres eliminar el agente "{name}"? Esta acción no se puede deshacer y eliminará permanentemente el agente y todos sus datos asociados.',
    deleting: "Eliminando...",
  },

  // Modos de pensamiento para la interacción con Claude AI
  thinkingModes: {
    auto: "Automático",
    autoDescription: "Deja que Claude decida",
    think: "Pensar",
    thinkDescription: "Razonamiento básico",
    thinkHard: "Pensar Intensamente",
    thinkHardDescription: "Análisis más profundo",
    thinkHarder: "Pensar Más Intensamente",
    thinkHarderDescription: "Razonamiento extensivo",
    ultrathink: "Ultra Pensamiento",
    ultrathinkDescription: "Máxima computación",
  },

  // Hooks Editor translations
  hooks: {
    title: "Configuración de Hooks",
    subtitle:
      "Configura comandos shell para ejecutar en varios puntos del ciclo de vida de Claude Code",
    scope: "Ámbito",
    projectScope: "Ámbito del Proyecto",
    localScope: "Ámbito Local",
    userScope: "Ámbito del Usuario",
    localScopeDesc: "Estas configuraciones no se comprometen al control de versiones",
    unsavedChanges: "Tienes cambios sin guardar. Haz clic en Guardar para persistirlos.",
    validationErrors: "Errores de Validación:",
    securityWarnings: "Advertencias de Seguridad:",
    templates: "Plantillas",
    preToolUse: "Pre Uso de Herramienta",
    postToolUse: "Post Uso de Herramienta",
    notification: "Notificación",
    stop: "Parar",
    subagentStop: "Parar Subagente",
    preToolUseDesc:
      "Se ejecuta antes de las llamadas de herramientas, puede bloquear y proporcionar retroalimentación",
    postToolUseDesc: "Se ejecuta después de la finalización exitosa de la herramienta",
    notificationDesc: "Personaliza las notificaciones cuando Claude necesita atención",
    stopDesc: "Se ejecuta cuando Claude termina de responder",
    subagentStopDesc: "Se ejecuta cuando un subagente de Claude (Tarea) termina",
    pattern: "Patrón",
    patternPlaceholder: "ej., Bash, Edit|Write, mcp__.*",
    patternTooltip:
      "Patrón de nombre de herramienta (regex soportado). Dejar vacío para coincidir con todas las herramientas.",
    commonPatterns: "Patrones comunes",
    custom: "Personalizado",
    commands: "Comandos",
    addCommand: "Añadir Comando",
    noCommandsAdded: "Aún no se han añadido comandos",
    commandPlaceholder: "Ingresa comando shell...",
    seconds: "segundos",
    noHooksConfigured: "No hay hooks configurados para este evento",
    addHook: "Añadir Hook",
    addMatcher: "Añadir Coincidencia",
    removeMatcher: "Quitar Coincidencia",
    removeCommand: "Quitar Comando",
    loadingHooks: "Cargando configuración de hooks...",
    savingHooks: "Guardando...",
    hooksConfiguration: "Configuración de Hooks",
    chooseTemplate: "Elige una plantilla de hook preconfigurada para comenzar rápidamente",
  },

  // Slash Commands Manager translations
  commands: {
    title: "Comandos Slash",
    subtitle: "Crea comandos personalizados para optimizar tu flujo de trabajo",
    projectCommands: "Comandos Slash del Proyecto",
    projectCommandsDesc: "Crear comandos personalizados para este proyecto",
    newCommand: "Nuevo Comando",
    searchCommands: "Buscar comandos...",
    allCommands: "Todos los Comandos",
    project: "Proyecto",
    user: "Usuario",
    noCommandsFound: "No se encontraron comandos",
    noProjectCommands: "Aún no se han creado comandos del proyecto",
    noCommandsCreated: "Aún no se han creado comandos",
    createFirstProjectCommand: "Crea tu primer comando del proyecto",
    createFirstCommand: "Crea tu primer comando",
    editCommand: "Editar Comando",
    createNewCommand: "Crear Nuevo Comando",
    commandName: "Nombre del Comando",
    commandNamePlaceholder: "ej., review, fix-issue",
    namespace: "Espacio de Nombres (Opcional)",
    namespacePlaceholder: "ej., frontend, backend",
    description: "Descripción (Opcional)",
    descriptionPlaceholder: "Breve descripción de lo que hace este comando",
    commandContent: "Contenido del Comando",
    contentPlaceholder: "Ingresa el contenido del prompt. Usa $ARGUMENTS para valores dinámicos.",
    contentDesc:
      "Usa $ARGUMENTS para entrada del usuario, @filename para archivos, y !`command` para comandos bash",
    allowedTools: "Herramientas Permitidas",
    allowedToolsDesc: "Selecciona qué herramientas puede usar Claude con este comando",
    examples: "Ejemplos",
    preview: "Vista Previa",
    arguments: "Argumentos",
    deleteCommand: "Eliminar Comando",
    deleteCommandConfirm: "¿Estás seguro de que quieres eliminar este comando?",
    deleteCommandDesc:
      "Esta acción no se puede deshacer. El archivo del comando será eliminado permanentemente.",
    deleting: "Eliminando...",
    scope: "Ámbito",
    userGlobal: "Usuario (Global)",
    availableAcrossProjects: "Disponible en todos los proyectos",
    onlyAvailableInProject: "Solo disponible en este proyecto",
    userCommands: "Comandos de Usuario",
    tools: "herramientas",
    bash: "Bash",
    files: "Archivos",
    showContent: "Mostrar contenido",
    hideContent: "Ocultar contenido",
  },

  // NFO interface translations
  nfo: {
    title: "CLAUDIA.NFO",
    credits: "CRÉDITOS",
    poweredBy: "IMPULSADO POR",
    runtime: "TIEMPO DE EJECUCIÓN",
    uiFramework: "FRAMEWORK DE UI",
    styling: "ESTILOS",
    animations: "ANIMACIONES",
    buildTool: "HERRAMIENTA DE CONSTRUCCIÓN",
    packageManager: "GESTOR DE PAQUETES",
    specialThanks: "AGRADECIMIENTOS ESPECIALES",
    openSourceCommunity: "A la comunidad de código abierto",
    betaTesters: "A todos los probadores beta",
    believers: "A todos los que creyeron en este proyecto",
    sharing: "¡Recuerda: Compartir es cuidar!",
    support: "¡Apoya a los desarrolladores!",
    fileABug: "Reportar un error",
    strategicProject: "Un proyecto estratégico de Asterisk",
    dependencies: "DEPENDENCIAS",
  },

  // Storage interface translations
  storage: {
    title: "Gestión de Almacenamiento",
    subtitle: "Gestionar datos y caché de Claude Code",
    totalSize: "Tamaño Total",
    projects: "Proyectos",
    sessions: "Sesiones",
    cache: "Caché",
    logs: "Registros",
    settings: "Configuración",
    cleanup: "Limpieza",
    cleanupDesc: "Eliminar datos de sesión antiguos y archivos de caché",
    cleanupOlderThan: "Limpiar más antiguos que",
    days: "días",
    cleanupNow: "Limpiar Ahora",
    cleanupSuccess: "Limpieza exitosa",
    cleanupError: "Error en la limpieza",
    calculating: "Calculando...",
    noData: "Sin datos",
    storageLocation: "Ubicación de Almacenamiento",
    openInFinder: "Abrir en Gestor de Archivos",
    exportData: "Exportar Datos",
    importData: "Importar Datos",
    backupData: "Respaldar Datos",
    restoreData: "Restaurar Datos",
    dataIntegrity: "Integridad de Datos",
    checkIntegrity: "Verificar Integridad",
    repairData: "Reparar Datos",
    integrityCheck: "Verificación de Integridad",
    integrityOk: "La integridad de los datos es buena",
    integrityIssues: "Se encontraron problemas de integridad de datos",
    autoCleanup: "Limpieza Automática",
    autoCleanupDesc:
      "Eliminar automáticamente datos antiguos más antiguos que los días especificados",
    enableAutoCleanup: "Habilitar Limpieza Automática",
    cleanupInterval: "Intervalo de Limpieza",

    // Traducciones específicas del almacenamiento de base de datos
    databaseStorage: "Almacenamiento de Base de Datos",
    sqlQuery: "Consulta SQL",
    resetDB: "Restablecer BD",
    selectTable: "Seleccionar una tabla",
    searchInTable: "Buscar en tabla...",
    newRow: "Nueva Fila",
    rows: "filas",
    actions: "Acciones",
    editRow: "Editar Fila",
    updateRowDesc: "Actualizar los valores de esta fila en la tabla {table}.",
    primaryKey: "Clave Primaria",
    type: "Tipo",
    notNull: "NO NULO",
    default: "Predeterminado",
    cancel: "Cancelar",
    update: "Actualizar",
    newRowTitle: "Nueva Fila",
    addNewRowDesc: "Agregar una nueva fila a la tabla {table}.",
    required: "Requerido",
    insert: "Insertar",
    deleteRow: "Eliminar Fila",
    deleteRowConfirm:
      "¿Está seguro de que desea eliminar esta fila? Esta acción no se puede deshacer.",
    delete: "Eliminar",
    resetDatabase: "Restablecer Base de Datos",
    resetDatabaseDesc:
      "Esto eliminará todos los datos y recreará la base de datos con su estructura predeterminada (tablas vacías para agents, agent_runs y app_settings). La base de datos se restaurará al mismo estado que cuando instaló la aplicación por primera vez. Esta acción no se puede deshacer.",
    resetWarning:
      "¡Todos sus agentes, ejecuciones y configuraciones se eliminarán permanentemente!",
    sqlQueryEditor: "Editor de Consultas SQL",
    sqlQueryEditorDesc:
      "Ejecutar consultas SQL sin procesar en la base de datos. Usar con precaución.",
    sqlQueryPlaceholder: "SELECT * FROM agents LIMIT 10;",
    queryExecutedSuccess: "Consulta ejecutada exitosamente. {count} filas afectadas.",
    lastInsertId: "Último ID de inserción: {id}",
    showingRows: "Mostrando {start} a {end} de {total} filas",
    page: "Página {current} de {total}",
    previous: "Anterior",
    next: "Siguiente",
    failedToLoadTables: "Error al cargar tablas",
    failedToLoadTableData: "Error al cargar datos de tabla",
    failedToUpdateRow: "Error al actualizar fila",
    failedToDeleteRow: "Error al eliminar fila",
    failedToInsertRow: "Error al insertar fila",
    failedToExecuteSQL: "Error al ejecutar SQL",
    failedToResetDatabase: "Error al restablecer base de datos",
    databaseResetComplete:
      "Restablecimiento de Base de Datos Completo: La base de datos ha sido restaurada a su estado predeterminado con tablas vacías (agents, agent_runs, app_settings).",
    resetFailed:
      "Restablecimiento Fallido: Error al restablecer la base de datos. Por favor, inténtelo de nuevo.",
    nullValue: "NULO",
    trueValue: "verdadero",
    falseValue: "falso",
  },
};
