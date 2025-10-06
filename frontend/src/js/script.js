function navigate(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');

    // Se a tela for o dashboard, carregue as notas do backend
    if (screenId === 'dashboard-screen') {
        loadNotes();
    }

    // Limpa o formulário quando a tela de nota é aberta para criar uma nova
    if (screenId === 'note-screen' && !currentNoteId) {
        document.getElementById('note-title').value = '';
        document.getElementById('note-content').value = '';
        document.getElementById('note-status').value = 'Pendente';
        document.getElementById('note-category').value = '';
    }
}

// criar e exibir um card de nota
function createNoteCard(note) {

    const card = document.createElement('div');
    card.className = "bg-white p-4 rounded-xl shadow-sm border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors";
    card.setAttribute('draggable', 'true');
    card.setAttribute('data-note-id', note.id);

    // Adiciona o evento de arrastar
    card.ondragstart = (event) => {
        event.dataTransfer.setData("text/plain", note.id);
    };

    // Adiciona o evento de clique para abrir a edição
    card.onclick = () => editNote(note);

    let colorClass;
    if (note.status === 'Pendente') colorClass = 'bg-red-100 text-red-800';
    if (note.status === 'Em Andamento') colorClass = 'bg-yellow-100 text-yellow-800';
    if (note.status === 'Concluído') colorClass = 'bg-green-100 text-green-800';

    const categoriesHtml = (note.categorias || []).map(cat => {
        return `<span class="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">${cat}</span>`;
    }).join('');

    card.innerHTML = `
        <h4 class="font-semibold text-gray-900 mb-1">${note.titulo}</h4>
        <p class="text-sm text-gray-600 truncate">${note.conteudo}</p>
        <div class="flex flex-wrap gap-1 mt-2">
            <span class="inline-block ${colorClass} text-xs font-medium px-2.5 py-0.5 rounded-full">${note.status}</span>
            ${categoriesHtml}
        </div>
    `;

    return card;
}

let allNotes = [];

function loadNotes() {
    fetch('http://localhost:3001/api/notes')
        .then(response => response.json())
        .then(notes => {
            allNotes = notes;
            renderNotes();
        })
        .catch(error => {
            console.error('Erro ao carregar notas:', error);
            showMessage('Erro ao carregar notas. Verifique se o backend está rodando.', null, 'error');
        });
}

function renderNotes() {
    const searchText = document.getElementById('search-input')?.value?.toLowerCase() || '';
    const filterCategory = document.getElementById('filter-category')?.value || '';
    const filterStatus = document.getElementById('filter-status')?.value || '';

    const pendingList = document.getElementById('pending-list');
    const inProgressList = document.getElementById('in-progress-list');
    const doneList = document.getElementById('done-list');
    pendingList.innerHTML = '';
    inProgressList.innerHTML = '';
    doneList.innerHTML = '';

    allNotes
        .filter(note => {
            // Filtro por texto (título ou conteúdo)
            const matchesText = note.titulo.toLowerCase().includes(searchText) ||
                                note.conteudo.toLowerCase().includes(searchText);
            // Filtro por categoria
            const matchesCategory = !filterCategory || (note.categorias && note.categorias.includes(filterCategory));
            // Filtro por status
            const matchesStatus = !filterStatus || note.status === filterStatus;
            return matchesText && matchesCategory && matchesStatus;
        })
        .forEach(note => {
            const noteCard = createNoteCard(note);
            if (note.status === 'Pendente') {
                pendingList.appendChild(noteCard);
            } else if (note.status === 'Em Andamento') {
                inProgressList.appendChild(noteCard);
            } else if (note.status === 'Concluído') {
                doneList.appendChild(noteCard);
            }
        });
}

// Adicione listeners para os filtros
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const filterCategory = document.getElementById('filter-category');
    const filterStatus = document.getElementById('filter-status');
    if (searchInput) searchInput.addEventListener('input', renderNotes);
    if (filterCategory) filterCategory.addEventListener('change', renderNotes);
    if (filterStatus) filterStatus.addEventListener('change', renderNotes);
});

function saveNote() {
    const titulo = document.querySelector('#note-screen input[type="text"]').value;
    const conteudo = document.querySelector('#note-screen textarea').value;
    const status = document.querySelector('#note-screen select:nth-of-type(1)').value;
    const categorias = [document.querySelector('#note-screen select:nth-of-type(2)').value];

    const usuario_id = 1;

    const noteData = { titulo, conteudo, status, usuario_id, categorias };

    fetch('http://localhost:3001/api/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
    })
    .then(response => response.json())
    .then(data => {
        showMessage('Nota salva com sucesso!', 'dashboard-screen');
    })
    .catch(error => {
        console.error('Erro ao salvar nota:', error);
        showMessage('Erro ao salvar nota.', null, 'error');
    });
}

function handleLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        showMessage('Por favor, preencha todos os campos.', null, 'error');
        return;
    }

    const loginData = { email, password };

    fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    })
    .then(response => {
        // Verifica se a resposta foi bem-sucedida (status 200 OK)
        if (response.ok) {
            return response.json();
        } else {
            // Se a resposta não for bem-sucedida, lança um erro com a mensagem do backend
            return response.json().then(errorData => {
                throw new Error(errorData.error);
            });
        }
    })
    .then(data => {
        // Login bem-sucedido
        showMessage('Login bem-sucedido! Redirecionando...', 'dashboard-screen');
    })
    .catch(error => {
        // Captura o erro da requisição ou o erro lançado acima
        console.error('Erro de login:', error.message);
        showMessage(error.message, null, 'error');
    });
}

function showMessage(message, nextScreenId = null, type = 'success') {
    const messageBox = document.getElementById('message-box');
    messageBox.textContent = message;
    
    if (type === 'error') {
        messageBox.style.backgroundColor = '#EF4444';
    } else {
        messageBox.style.backgroundColor = '#4CAF50';
    }

    messageBox.classList.add('show');
    
    setTimeout(() => {
        messageBox.classList.remove('show');
        if (nextScreenId) {
            navigate(nextScreenId);
        }
    }, 2000);
}

async function handleSaveNote() {
    const titulo = document.getElementById('note-title').value;
    const conteudo = document.getElementById('note-content').value;
    const status = document.getElementById('note-status').value;
    const categoria = document.getElementById('note-category').value;

    if (!titulo || !conteudo) {
        showMessage('Título e conteúdo são obrigatórios.', null, 'error');
        return;
    }

    const noteData = {
        titulo,
        conteudo,
        status,
        usuario_id: 1, 
        categorias: categoria ? [categoria] : []
    };

    try {
        const method = currentNoteId ? 'PUT' : 'POST';
        const url = currentNoteId ? `http://localhost:3001/api/notes/${currentNoteId}` : 'http://localhost:3001/api/notes';

        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(noteData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Erro ao salvar a nota.');
        }

        const result = await response.json();
        currentNoteId = null;
        showMessage(result.message, 'dashboard-screen');
    } catch (error) {
        console.error('Erro ao salvar nota:', error);
        showMessage('Erro ao salvar nota. Tente novamente.', null, 'error');
    }
}

function allowDrop(event) {
    event.preventDefault();
}

async function drop(event, newStatus) {
    event.preventDefault();
    const noteId = event.dataTransfer.getData("text/plain");

    const draggedElement = document.querySelector(`[data-note-id='${noteId}']`);
    
    if (draggedElement) {
        const targetList = event.currentTarget.querySelector('.flex.flex-col.gap-3');
        if (targetList) {
            // Mova o card para o novo painel
            targetList.appendChild(draggedElement);

            // Atualiza descrição do status no card
            const statusSpan = draggedElement.querySelector('span:first-child');
            if (statusSpan) {
                statusSpan.textContent = newStatus;
                
                // Atualiza classe de cor com base no novo status
                let newColorClass;
                if (newStatus === 'Pendente') newColorClass = 'bg-red-100 text-red-800';
                if (newStatus === 'Em Andamento') newColorClass = 'bg-yellow-100 text-yellow-800';
                if (newStatus === 'Concluído') newColorClass = 'bg-green-100 text-green-800';

                statusSpan.className = statusSpan.className.replace(/\b(bg-(red|yellow|green)-\d{3,4}|text-(red|yellow|green)-\d{3,4})\b/g, '');
                statusSpan.className += ` ${newColorClass}`;
            }
        }
    }

    await updateNoteStatus(noteId, newStatus);
}

async function updateNoteStatus(noteId, newStatus) {
    try {
        const response = await fetch(`http://localhost:3001/api/notes/${noteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Erro ao atualizar a nota.');
        }

        const result = await response.json();
        showMessage(result.message, null);
    } catch (error) {
        console.error('Erro ao atualizar status:', error);
        showMessage('Erro ao atualizar status. Tente novamente.', null, 'error');
    }
}

let currentNoteId = null;

async function handleDeleteNote() {
    if (!currentNoteId) {
        showMessage('Nenhuma nota selecionada para exclusão.', null, 'error');
        return;
    }
    
    if (!confirm('Tem certeza que deseja excluir esta nota?')) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:3001/api/notes/${currentNoteId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Erro ao excluir a nota.');
        }

        const result = await response.json();
        currentNoteId = null;
        showMessage(result.message, 'dashboard-screen');
    } catch (error) {
        console.error('Erro ao excluir nota:', error);
        showMessage('Erro ao excluir nota. Tente novamente.', null, 'error');
    }
}

function editNote(note) {
    currentNoteId = note.id;

    // Preenche os campos do formulário com os dados da nota
    document.getElementById('note-title').value = note.titulo;
    document.getElementById('note-content').value = note.conteudo;
    document.getElementById('note-status').value = note.status;
    document.getElementById('note-category').value = note.categorias[0] || '';

    // Navega para a tela de edição
    navigate('note-screen');
}