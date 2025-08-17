// Função para corrigir a navegação entre abas
function fixTabNavigation() {
    console.log("Iniciando correção de navegação entre abas");
    
    // Verificar se a função showTab existe
    if (typeof showTab !== 'function') {
        console.error("Função showTab não encontrada!");
        
        // Definir a função showTab
        window.showTab = function(tabId) {
            console.log("showTab chamado com tabId:", tabId);
            
            // Remover classe active de todas as abas e botões
            document.querySelectorAll(".tab-content > div").forEach(tab => {
                tab.classList.remove("active");
                console.log("Removida classe active de:", tab.id);
            });
            
            document.querySelectorAll(".tab-buttons button").forEach(button => {
                button.classList.remove("active");
            });
            
            // Adicionar classe active à aba selecionada
            const selectedTab = document.getElementById(tabId);
            if (selectedTab) {
                selectedTab.classList.add("active");
                console.log("Adicionada classe active a:", tabId);
            } else {
                console.error("Aba não encontrada:", tabId);
            }
            
            // Adicionar classe active ao botão correspondente
            let buttonIdMap = {
                "horarios": "btnHorarios", "toDoList": "btnToDoList", "notes": "btnNotas",
                "weather": "btnMeteorologia", "expenses": "btnDespesas", "horariosPdf": "btnHorariosPdf",
                "lembretes": "btnLembretes", "pontosDeInteresse": "btnPontosDeInteresse", "mapa": "btnMapa",
                "calculator": "btnCalculadora", "timer": "btnTemporizador", "converter": "btnConversor",
                "pdfReader": "btnPdfReader"
            };
            
            const buttonElement = document.getElementById(buttonIdMap[tabId]);
            if (buttonElement) {
                buttonElement.classList.add("active");
            } else {
                console.warn("Botão não encontrado para a aba:", tabId);
            }
        };
    }
    
    // Adicionar eventos de clique diretamente aos botões
    const tabButtons = document.querySelectorAll(".tab-buttons button");
    console.log("Encontrados", tabButtons.length, "botões de abas");
    
    tabButtons.forEach(button => {
        const tabId = button.getAttribute("onclick")?.match(/showTab\('(.+?)'\)/)?.[1];
        if (tabId) {
            console.log("Adicionando evento de clique para o botão:", button.id, "-> aba:", tabId);
            button.addEventListener("click", function(event) {
                event.preventDefault();
                console.log("Clique no botão:", button.id);
                showTab(tabId);
            });
        } else {
            console.warn("Não foi possível extrair o tabId do botão:", button.id);
        }
    });
    
    // Garantir que a primeira aba esteja ativa
    console.log("Ativando a primeira aba (horarios)");
    showTab("horarios");
}

// Executar a correção quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOMContentLoaded - Executando correção de navegação");
    fixTabNavigation();
});

// Executar a correção também imediatamente, caso o DOM já tenha sido carregado
if (document.readyState === "complete" || document.readyState === "interactive") {
    console.log("Documento já carregado - Executando correção de navegação imediatamente");
    setTimeout(fixTabNavigation, 100);
}
